"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useLoading } from "@/app/layout";

const NavigationEvents = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const setLoading = useLoading()[1];

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    handleStart();
    handleComplete();

    return () => {
      handleComplete();
    };
  }, [pathname, searchParams, setLoading]);

  return null;
};

export default NavigationEvents;
