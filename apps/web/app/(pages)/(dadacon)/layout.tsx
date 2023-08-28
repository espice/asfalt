import React from "react";
import { gqlClientServer } from "@/utils/gql-server";
import { notFound } from "next/navigation";
import { AuthProvider, UserType } from "@/utils/context/AuthCtx";
import Nav from "@/modules/Nav";

import { Fira_Code } from "next/font/google";
import { cn } from "@/utils/tw";
import Sidebar from "@/modules/Sidebar";
const fira = Fira_Code({ subsets: ["latin"] });

async function getUser() {
  try {
    const user = await gqlClientServer().query({
      me: {
        id: true,
        isAdmin: true,
        username: true,
        missions: {
          id: true,
          title: true,
        },
      },
    });
    return user;
  } catch (e) {
    console.log(e);
    return { me: null };
  }
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user.me) return notFound();

  return (
    <AuthProvider user={user.me}>
      <section
        className={cn(
          "bg-black text-primary h-screen pt-[70px] pl-[18%]",
          fira.className
        )}
      >
        <Nav />
        <Sidebar />
        {children}
      </section>
    </AuthProvider>
  );
}
