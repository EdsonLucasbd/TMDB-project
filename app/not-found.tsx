import { HugeiconsIcon } from "@hugeicons/react"
import { Film01Icon, ArrowLeft01Icon } from "@hugeicons/core-free-icons"
import Link from "next/link"

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center space-y-6 p-6 text-center">
      {/* Film Icon with question mark look */}
      <div className="relative rounded-3xl border border-primary/20 bg-primary/10 p-4 text-primary">
        <HugeiconsIcon icon={Film01Icon} size={40} className="text-primary" />
        <span className="absolute -right-1.5 p-3 -bottom-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-primary text-[10px] font-extrabold text-primary-foreground">
          404
        </span>
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-extrabold tracking-tight text-white">
          Título Não Encontrado
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          A página ou o conteúdo solicitado não existe. Verifique se o ID ou a
          URL estão corretos.
        </p>
      </div>

      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-xl border border-border/20 bg-card/45 px-6 py-2.5 text-sm font-semibold text-muted-foreground transition-all duration-200 hover:bg-card/75 hover:text-foreground"
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
        Voltar para Início
      </Link>
    </main>
  )
}
