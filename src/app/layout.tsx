import type { Metadata } from "next";
import { ReactNode } from "react";
import "../styles/globals.css";
import GridOverlay from "../utils/dev/Grid";

import { poppins, ppValveExtraLightItalic } from "../styles/typography";

export const metadata: Metadata = {
  title: "Mi Proyecto",
  description: "Aplicación web en desarrollo",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${ppValveExtraLightItalic.variable}`}
    >
      <body>
        {children}
        {process.env.NODE_ENV === "development" && <GridOverlay />}
      </body>
    </html>
  );
}
