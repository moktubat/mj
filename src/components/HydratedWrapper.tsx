"use client";

import { useState, useEffect } from "react";
import LoadingScreen from "./Loading/LoadingScreen";

export default function HydrationWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
