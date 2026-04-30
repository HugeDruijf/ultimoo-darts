export const metadata = {
  title: "Ultimoo Darts",
  description: "Darts standings",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
