"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider, useIsFetching } from "react-query";
import Navbar from "@/components/Navbar";
import SearchHelper from "@/components/SearchHelper";
import LoadingSpinner from "@/components/LoadingSpinner";
import { createContext, useContext, useEffect, useState } from "react";
import NavigationEvents from "@/components/NavigationEvents";

const inter = Inter({ subsets: ["latin"] });

const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const isFetching = useIsFetching();

  useEffect(() => {
    setIsLoading(isFetching > 0);
  }, [isFetching]);

  return (
    <LoadingContext.Provider value={[isLoading, setIsLoading]}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);

export default function RootLayout({ children }) {
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 overflow-hidden`}>
        <QueryClientProvider client={queryClient}>
          <LoadingProvider>
            <div>
              <section className="flex gap-2 items-center">
                <div className="relative">
                  <SearchHelper />
                </div>
              </section>
            </div>
            <div className="flex h-screen">
              <Navbar />
              <main className="flex-1 overflow-y-auto p-4 relative">
                <NavigationEvents />
                {children}
              </main>
            </div>
            <LoadingSpinner />
          </LoadingProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
