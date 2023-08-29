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
      href: "/dadacon",
    },
    { title: "Agents", href: "/dadacon/agents" },
    { title: "Archives", href: "/dadacon/archives" },
    { title: "Devices", href: "/dadacon/devices" },
  ];

  const agentNav = [{ title: "All Missions", href: "/dadacon" }];

  return (
    <>
      <div className="w-full border-b-[1px] border-primary">
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
      <div className="w-full  pb-[90px]">
        {user!.missions.map((navItem) => {
          return (
            <Link
              href={`/dadacon/mission/${navItem.id}`}
              key={`/dadacon/mission/${navItem.id}`}
            >
              <div
                className={cn(
                  "h-[60px] cursor-pointer flex items-center p-6 my-4 mx-6 font-[500]",
                  pathname.includes(`/dadacon/mission/${navItem.id}`)
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
