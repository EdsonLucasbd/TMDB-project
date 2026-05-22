"use client"

import { useEffect } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Alert01Icon, ArrowLeft01Icon } from "@hugeicons/core-free-icons"
import Link from "next/link"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Unhandled runtime error:", error)
  }, [error])

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center space-y-6 p-6 text-center">
      {/* Animated warning Icon */}
      <div className="animate-pulse rounded-3xl border border-red-500/20 bg-red-500/10 p-4 text-red-500">
        <HugeiconsIcon
          icon={Alert01Icon}
          size={40}
          className="fill-current text-red-500"
        />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-extrabold tracking-tight text-white">
          Ops! Algo deu errado
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Ocorreu um erro inesperado ao carregar esta página. Pode ser um
          problema temporário de conexão ou rede.
        </p>
      </div>

      {error.message && (
        <div className="w-full rounded-xl border border-border/20 bg-card/45 p-3 text-left">
          <p className="mb-1 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
            Detalhes do Erro
          </p>
          <p className="font-mono text-xs break-all text-red-400/90 select-all">
            {error.message}
          </p>
        </div>
      )}

      <div className="flex w-full flex-col justify-center gap-3 sm:flex-row">
        <button
          onClick={reset}
          className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/95"
        >
          Tentar Novamente
        </button>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/20 bg-card/40 px-4 py-2.5 text-sm font-semibold text-muted-foreground transition-all duration-200 hover:bg-card/75 hover:text-foreground"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
          Voltar ao Início
        </Link>
      </div>
    </main>
  )
}
