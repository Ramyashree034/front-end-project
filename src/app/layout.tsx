import "./globals.css";
import Providers from "./providers";
import DarkModeSync from "@/components/DarkModeSync";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <DarkModeSync />
          {children}
        </Providers>
      </body>
    </html>
  );
}