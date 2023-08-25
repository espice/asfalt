interface InputProps {
  value: string;
  placeholder: string;
  onChange: (val: string) => void;
  className?: string;
  type?: "password" | "text";
}

export default function Input({
  value,
  placeholder,
  onChange,
  className,
  type = "text",
}: InputProps) {
  return (
    <input
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={
        "w-full h-[60px] border-solid border-2 border-[#20C20E] bg-transparent p-4 text-[#20c20e] my-3"
      }
      type={type}
    />
  );
}
