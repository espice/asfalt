import { createClient } from "@/genql";

const client = createClient({
  url: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
  credentials: "include",
});

export { client as gqlClient };
