import React from "react";
import { gqlClient } from "@/utils/gql";
import { notFound } from "next/navigation";
import { AuthProvider } from "@/utils/context/AuthCtx";

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

  return <AuthProvider user={user.me}>{children}</AuthProvider>;
}
