export async function GET() {
  return new Response(
    JSON.stringify({
      msg: "Rigid UI",
      version: "1.0.0"
    })
  )
}