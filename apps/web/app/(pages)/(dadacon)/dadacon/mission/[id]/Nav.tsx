"use client";
import useUser from "@/utils/hooks/useUser";
import { cn } from "@/utils/tw";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav({ mission }: { mission: any }) {
  const user = useUser();
  const pathname = usePathname();

  const navItems = [
    {
      title: "Logs",
      href: `/dadacon/mission/${mission.id}`,
    },
    {
      title: `Devices`,
      href: `/dadacon/mission/${mission.id}/devices`,
    },
  ];

  if (user?.isAdmin) {
    navItems.push({
      title: `Agents`,
      href: `/dadacon/mission/${mission.id}/agents`,
    });
  }

  return (
    <div className="absolute top-0 left-0 w-full h-[60px] border-b-[1px] border-primary flex items-center">
      {navItems.map((item) => {
        return (
          <Link key={item.href} href={item.href} className={"h-full w-[180px]"}>
            <div
              className={cn(
                "cursor-pointer h-full border-r-[1px] w-[100%] border-primary text-center align-center flex jutsify-center text-[14px] font-[500]",
                pathname === item.href ? "bg-primary text-black" : ""
              )}
            >
              <span style={{margin: 'auto', display: 'block'}}>{item.title}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
