import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div 
      className={cn("mx-auto w-full max-w-5xl px-6 md:px-8", className)} 
      {...props}
    >
      {children}
    </div>
  );
}
