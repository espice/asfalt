"use client";

import Button from "@/components/Button";
import { axios } from "@/utils/axios";
import { useRouter } from "next/navigation";
import Navigation from "./navigation";

export default function Sidebar() {
  const router = useRouter();

  return (
    <div className="w-[18%] fixed left-0 border-r-[1px] bg-black border-primary h-[calc(100vw-70px)] ">
      <Navigation />
      <div className="flex items-center justify-center h-[90px] fixed bottom-0 border-t-[1px] w-[18%] border-primary">
        <Button
          onClick={async () => {
            await axios.post("/auth/spies/logout");
            router.replace("/");
          }}
          className={"w-[calc(100%-40px)]"}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
