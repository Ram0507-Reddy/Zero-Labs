"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export function ReloadBoundary() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Determine navigation type ONLY on initial mount/hard load
    const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    const navType = navEntries[0]?.type;

    // We exclude the admin panel and login screen from this redirection pattern
    // to ensure the operator can refresh their secure terminal without data loss.
    const isAdminPath = pathname.startsWith('/admin');

    if (!isAdminPath && pathname !== "/") {
      if (navType === "reload" || navType === "back_forward") {
        router.replace("/");
      }
    }
  }, []); // Only run once on full page load/mount

  return null;
}
