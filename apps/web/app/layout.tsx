import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";


const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "RigidUI - Complex UI Components Library",
  description: "A collection of complex, customizable UI components built with shadcn",
  openGraph: {
    title: "RigidUI",
    description:
      "A collection of complex, customizable UI components built with shadcn",
    url: "https://rigidui.com",
    siteName: "RigidUI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RigidUI - Complex UI Components Library",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  category: "Component Library",
  keywords: [
    "UI Components",
    "React Components",
    "shadcn",
    "UI Library",
    "Design System",
    "Web Development",
    "Frontend Development",
    "Complex UI",
    "Customizable Components",
    "Responsive Design",
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}