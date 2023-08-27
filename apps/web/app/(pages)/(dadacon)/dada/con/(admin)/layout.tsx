"use client";

import useUser from "@/utils/hooks/useUser";
import { notFound } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useUser();

  if (!user?.isAdmin) return notFound();

  return <div>{children}</div>;
}
