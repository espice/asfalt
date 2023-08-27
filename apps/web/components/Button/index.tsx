import { cn } from "@/utils/tw";

interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({ className, children, onClick }: ButtonProps) {
  return (
    <button
      className={cn(
        "h-[48px] bg-[#20C20Efa] my-3 px-12 text-black hover:bg-[#20c20eee] transition-all",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
