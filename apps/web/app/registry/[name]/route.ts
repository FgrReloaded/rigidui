import { NextResponse } from "next/server"
import path from "path"
import { promises as fs } from "fs"
import { registryItemSchema } from "shadcn/registry"
import { PostHog } from "posthog-node";
// This route shows an example for serving a component using a route handler.
export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params

    const posthog = new PostHog(process.env.POSTHOG_API_KEY!, {
      host: process.env.POSTHOG_HOST,
      flushAt: 1,
      flushInterval: 0,
      privacyMode: true,
      disableGeoip: true,
      disabled: process.env.NODE_ENV !== "production",
    });

    // Cache the registry import
    const registryData = await import("@/registry.json")
    const registry = registryData.default

    // Find the component from the registry.
    const component = registry.items.find((c) => c.name === name)

    // If the component is not found, return a 404 error.
    if (!component) {
      return NextResponse.json(
        { error: "Component not found" },
        { status: 404 }
      )
    }

    // Validate before file operations.
    const registryItem = registryItemSchema.parse(component)

    // If the component has no files, return a 400 error.
    if (!registryItem.files?.length) {
      return NextResponse.json(
        { error: "Component has no files" },
        { status: 400 }
      )
    }

    // Read all files in parallel.
    const filesWithContent = await Promise.all(
      registryItem.files.map(async (file) => {
        const filePath = path.join(process.cwd(), file.path)
        const content = await fs.readFile(filePath, "utf8")
        return { ...file, content }
      })
    )

    const sessionId = crypto.randomUUID().replace(/-/g, "")

    posthog.capture({
      distinctId: sessionId,
      event: "component_downloaded",
      properties: {
        title: registryItem.title,
        node_version: process.version,
        platform: process.platform,
        $ip: null,
      },
    });

    // Return the component with the files.
    return NextResponse.json({ ...registryItem, files: filesWithContent })
  } catch (error) {
    console.error("Error processing component request:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
