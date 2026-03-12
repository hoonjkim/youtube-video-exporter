import "./globals.css";

export const metadata = {
  title: "YouTube Video Exporter",
  description: "Download all video titles and links from any YouTuber as CSV",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
