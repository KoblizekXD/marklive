'use client'

interface IDialogProps {
  children?: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
}

export function Dialog({ children, onSubmit, className }: IDialogProps) {
  return (
    <form className={`absolute shadow-xl flex flex-col p-4 rounded left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#11111B] ${className}`} onSubmit={onSubmit}>
      {children}
    </form>
  );
}