import "./globals.css";

/**
 * Root layout : le seul endroit où on met <html> et <body>.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
