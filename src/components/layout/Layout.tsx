import Navbar from "./Navbar";
import Footer from "./Footer";
import { Cormorant } from "next/font/google";

const cormorant = Cormorant({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={cormorant.className}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}