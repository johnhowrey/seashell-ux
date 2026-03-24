import type { Metadata } from "next";
import { Inter, Epilogue } from "next/font/google";
import StyledComponentsRegistry from "@/lib/registry";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-epilogue",
});

export const metadata: Metadata = {
  title: "Seashell UX",
  description: "Cloud control panel UX prototype",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.cdnfonts.com/css/open-dyslexic"
        />
      </head>
      <body
        className={`${inter.variable} ${epilogue.variable}`}
        style={{
          fontFamily: "var(--font-inter), sans-serif",
          margin: 0,
          padding: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
