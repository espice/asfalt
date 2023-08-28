import { cn } from "@/utils/tw";

interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export default function SecondaryButton({ className, children, onClick }: ButtonProps) {
  return (
    <button
      className={cn(
        "h-[40px] bg-primary/[0.2] px-6 text-primary hover:bg-primary/[0.3] border-2 border-primary transition-all",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
