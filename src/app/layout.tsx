import "@/styles/globals.css";

export const metadata = {
  title: "z1blog - Home",
  description: "Shivam's blog",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
