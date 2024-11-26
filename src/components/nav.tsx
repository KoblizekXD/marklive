import Link from "next/link";

interface NavItemProps {
  href?: string;
  children?: React.ReactNode;
  className?: string;
}

export function NavItem({ href, children, className }: NavItemProps) {
  return (
    <Link href={href || '/'} className={`${className} px-3 h-full py-3 text-xl`}>
      {children}
    </Link>
  )
}