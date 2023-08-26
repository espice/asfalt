import React from "react";
import { gqlClient } from "@/utils/gql";
import { notFound } from "next/navigation";
import { AuthProvider } from "@/utils/context/AuthCtx";
import Nav from "@/modules/Nav";

import { Fira_Code } from "next/font/google";
import { cn } from "@/utils/tw";
const fira = Fira_Code({ subsets: ["latin"] });

async function getUser() {
  try {
    const user = await gqlClient().query({
      me: {
        id: true,
        isAdmin: true,
        username: true,
      },
    });

    return user;
  } catch (e) {
    return { me: null };
  }
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user.me) notFound();

  return (
    <AuthProvider user={user.me}>
      <section
        className={cn(
          "bg-black text-primary h-screen pt-[80px]",
          fira.className
        )}
      >
        <Nav />
        {children}
      </section>
    </AuthProvider>
  );
}
