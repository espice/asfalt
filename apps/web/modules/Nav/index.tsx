"use client";

import useUser from "@/utils/hooks/useUser";

export default function Nav() {
  const user = useUser();

  return (
    <div className="w-full h-[70px] bg-black z-[10] border-b-[1px] border-primary fixed top-0 flex items-center justify-between">
      <span className="ml-8 text-[22px] font-[600]">DADA-CON</span>
      <span className="mr-8 text-[18px] font-[500]">Agent {user?.id}</span>
    </div>
  );
}
