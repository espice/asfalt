"use client";

import useUser from "@/utils/hooks/useUser";
import { cn } from "@/utils/tw";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navigation() {
  const user = useUser();
  const pathname = usePathname();

  const adminNav = [
    {
      title: "All Missions",
      href: "/dada/con",
    },
    { title: "Agents", href: "/dada/con/agents" },
    { title: "Archives", href: "/dada/con/archives" },
    { title: "Devices", href: "/dada/con/devices" },
  ];

  const agentNav = [{ title: "All Missions", href: "/dada/con" }];

  return (
    <>
      <div className="w-full border-b-[1px] border-primary ">
        {(user?.isAdmin ? adminNav : agentNav).map((navItem) => {
          return (
            <Link href={navItem.href} key={navItem.href}>
              <div
                className={cn(
                  "h-[60px] flex cursor-pointer items-center p-6 my-4 mx-6 font-[500]",
                  navItem.href === pathname
                    ? "border-[3px] border-primary font-[600]"
                    : ""
                )}
              >
                {navItem.title}
              </div>
            </Link>
          );
        })}
      </div>
      <div className="w-full">
        {user!.missions.map((navItem) => {
          return (
            <Link
              href={`/dada/con/mission/${navItem.id}`}
              key={`/dada/con/mission/${navItem.id}`}
            >
              <div
                className={cn(
                  "h-[60px] cursor-pointer flex items-center p-6 my-4 mx-6 font-[500]",
                  `/dada/con/mission/${navItem.id}` === pathname
                    ? "border-[3px] border-primary font-[600]"
                    : ""
                )}
              >
                {navItem.title}
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
