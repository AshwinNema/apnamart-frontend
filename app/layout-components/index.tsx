"use client";
import NextUIProvider from "./providers";
import Header from "./header";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotificationModal from "./notifications";
import { usePromiseTracker } from "react-promise-tracker";
import { AppStartLoader, Spinner } from "../_custom-components";
import { useAppDispatch, useAppSelector } from "@/lib/main/hooks";
import { getUserProfile } from "../profile/api";
import { usePathname } from "next/navigation";
import {
  getSessionStorageKey,
  sessionStorageAttributes,
  setSessionStorageKey,
} from "../_services";
import { commonRoleRoutes, setNestedPath } from "../_utils";
import { UserRole } from "@/lib/main/slices/user/user.slice";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // For showing UI Loader
  const { promiseInProgress } = usePromiseTracker();
  // Prevents warning - Extra attributes from the server: class,style at html at RootLayout (Server) at RedirectErrorBoundary. Reference - https://github.com/pacocoursey/next-themes?tab=readme-ov-file#avoid-hydration-mismatch
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [config, setConfig] = useState({
    mounted: false,
    showStartLoader: true,
  });
  const setData = setNestedPath(setConfig);
  const path = usePathname();

  useEffect(() => {
    setData("mounted")(true);
    setTimeout(() => {
      setData("showStartLoader")(false);
    }, Number(process.env.NEXT_PUBLIC_START_LOADER_TIMER));
  }, []);

  useEffect(() => {
    const isUserFetched = getSessionStorageKey(
      sessionStorageAttributes.userFetch,
    );
    if (!isUserFetched && user && !path.includes(commonRoleRoutes.profile)) {
      setSessionStorageKey(sessionStorageAttributes.userFetch, true);
      getUserProfile(dispatch, user?.role === UserRole.merchant);
    }
  }, [dispatch, user, path]);

  if (!config.mounted) {
    return null;
  }

  return (
    <>
      {promiseInProgress && <Spinner />}
      <NextUIProvider>
        <main className={`mainContainer`}>
          <NextThemesProvider attribute="class">
            {config.showStartLoader ? (
              <AppStartLoader />
            ) : (
              <>
                <Header />
                {children}
                <NotificationModal />
              </>
            )}

            <ToastContainer autoClose={2000} />
          </NextThemesProvider>
        </main>
      </NextUIProvider>
    </>
  );
}
