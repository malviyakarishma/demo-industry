import "../styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Dev Vansh Engineers",
  description: "Innovative solutions for the modern tech industry.",
  
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
