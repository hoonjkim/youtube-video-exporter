import "./globals.css";

export const metadata = {
  title: "YouTube Video Link Exporter",
  description: "Export video links, titles, and metadata from any YouTube channel as CSV",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
