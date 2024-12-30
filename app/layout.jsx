import "./_styles/globals.css";
import Header from "./_components/Header";
import { ReservationProvider } from "./_components/context/ReservationContext";
import { Toaster } from "sonner";
import Footer from "./_components/Footer";
import { Noto_Sans_TC } from "next/font/google";

export const metadata = {
  title: "Boshemia-B&B",
  description: "Welcome",
};

export const Noto = Noto_Sans_TC({
  subsets: ["latin", "latin-ext", "vietnamese"],
  display: "swap",
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${Noto.className} antialiased bg-boshe-500 text-primary-100 flex flex-col min-h-screen `}
      >
        <Header />

        <main className="flex-grow max-w-full md:px-0 px-5 sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1120px] w-full mx-auto mt-16 sm:mt-24 lg:mt-28 ">
          <ReservationProvider>{children}</ReservationProvider>
          <Toaster position="top-center" />
        </main>

        <Footer />
      </body>
    </html>
  );
}
