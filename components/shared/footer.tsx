import { type FC } from "react"
import Link from "next/link"

const Footer: FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-16 w-full border-t border-border/20 bg-card/10 py-10 backdrop-blur-md">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-center md:flex-row md:text-left">
        {/* Brand / Copyright */}
        <div className="space-y-1">
          <p className="text-sm font-bold text-foreground">
            CineCatalog &copy; {currentYear}
          </p>
          <p className="text-xs text-muted-foreground">
            Desenvolvido como um catálogo imersivo de filmes e séries de alto
            desempenho.
          </p>
        </div>

        {/* TMDB Disclaimer (Required by ToS) */}
        <div className="max-w-md rounded-xl border border-border/10 bg-muted/30 p-3">
          <p className="text-[10px] leading-relaxed font-normal text-muted-foreground sm:text-xs">
            Este site consome os dados e serviços da API do{" "}
            <Link
              href="https://www.themoviedb.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:underline"
            >
              The Movie Database (TMDB)
            </Link>
            . Este produto utiliza a API do TMDB, mas não é endossado ou
            certificado pelo TMDB.
          </p>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
