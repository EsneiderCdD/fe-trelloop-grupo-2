import type { Metadata } from "next";
import "../styles/globals.css";
import GridOverlay from "@/utils/dev/Grid"; // Agregado

export const metadata: Metadata = {
  title: "Mi Proyecto",
  description: "Aplicación web en desarrollo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        {process.env.NODE_ENV === "development" && <GridOverlay />} {/* Dev only */}
      </body>
    </html>
  );
}
