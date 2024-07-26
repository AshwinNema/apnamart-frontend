"use client";
import NextUIProvider from "./providers";
import Header from "./header";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotificationModal from "./notifications";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Prevents warning - Extra attributes from the server: class,style at html at RootLayout (Server) at RedirectErrorBoundary. Reference - https://github.com/pacocoursey/next-themes?tab=readme-ov-file#avoid-hydration-mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <NextUIProvider>
      <main>
        <NextThemesProvider attribute="class">
          <Header />
          {children}
          <NotificationModal />
          <ToastContainer autoClose={2000} />
        </NextThemesProvider>
      </main>
    </NextUIProvider>
  );
}
