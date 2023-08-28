import { createClient } from "@/genql";
import { cookies } from "next/headers";

const client = () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("dc.token");

  if (accessToken) {
    return createClient({
      url: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
      headers: {
        Cookie: `dc.token=${accessToken.value}`,
      },
    });
  } else {
    return createClient({
      url: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
      credentials: "include",
    });
  }
};
export { client as gqlClientServer };
