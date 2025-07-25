import { Cormorant } from "next/font/google";

import Footer from "./Footer";
import Navbar from "./Navbar";

const cormorant = Cormorant({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
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
