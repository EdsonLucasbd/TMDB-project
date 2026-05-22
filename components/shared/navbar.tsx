import { type FC } from "react"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { Film01Icon } from "@hugeicons/core-free-icons"

const Navbar: FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/65 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 focus:outline-none"
        >
          <div className="rounded-xl border border-primary/20 bg-primary/10 p-2 text-primary transition-all duration-300 group-hover:bg-primary/20">
            <HugeiconsIcon
              icon={Film01Icon}
              size={20}
              className="fill-current text-primary"
            />
          </div>
          <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-lg font-extrabold tracking-tight text-transparent">
            CineCatalog
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-semibold text-foreground transition-colors hover:text-primary focus:outline-none focus-visible:underline"
          >
            Início
          </Link>
          <Link
            href="/?genre=28" // Action Movies
            className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary focus:outline-none focus-visible:underline"
          >
            Ação
          </Link>
          <Link
            href="/?genre=35" // Comedy
            className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary focus:outline-none focus-visible:underline"
          >
            Comédia
          </Link>
        </nav>

        {/* Right Badge / Status */}
        <div className="hidden items-center gap-2 sm:flex">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          <span className="rounded border border-border/20 bg-muted/40 px-2 py-0.5 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
            Online
          </span>
        </div>
      </div>
    </header>
  )
}

export { Navbar }
