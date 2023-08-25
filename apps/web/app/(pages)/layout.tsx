"use client";

import { axios } from "@/utils/axios";
import React, { useState, useEffect } from "react";
import SpyLoginPage from "./SpyLogin";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    async function localStorageEventHandler(e: Event) {
      const code = window.localStorage.getItem("dc.at");
      if (code) {
        const res = await axios.post("/auth/spies/code", { code });
        setGranted(res.data.granted);
        if (res.data.granted) {
          window.localStorage.removeItem("dc.at");
        }
      }
    }

    window.addEventListener("storage", localStorageEventHandler);

    return () => {
      window.removeEventListener("storage", localStorageEventHandler);
    };
  }, []);

  if (granted) return <SpyLoginPage />;

  return <div>{children}</div>;
}
