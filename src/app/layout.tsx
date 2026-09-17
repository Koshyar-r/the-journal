import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/general/navbar/Navbar";
import Footer from "@/components/general/Footer";
import SearchModal from "@/components/modals/SearchModal";
import { Toaster } from "react-hot-toast"
import QueryProvider from "@/providers/QueryProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "The Journal",
  description: "A blog for curious minds to explore stories, ideas, and insights that spark creativity and innovation.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.className} h-full antialiased bg-background`}
      suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <Navbar />
          {children}
          <Footer />
          <SearchModal />
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
