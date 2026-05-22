import { type FC } from "react"
import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import { UserIcon } from "@hugeicons/core-free-icons"
import { type CastMember } from "@/types/tmdb"
import { Card, CardContent } from "@/components/ui/card"

interface CastListProps {
  cast: CastMember[]
}

const CastList: FC<CastListProps> = ({ cast }) => {
  // Take top 12 cast members to keep the page clean and high-performance
  const mainCast = cast.slice(0, 12)

  if (mainCast.length === 0) {
    return (
      <div className="py-4 text-sm text-muted-foreground">
        Nenhum detalhe de elenco disponível para este título.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="flex items-center gap-2 text-lg font-bold text-foreground">
        Elenco Principal
      </h3>

      {/* Horizontal scrolling list */}
      <div className="-mx-4 flex scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:px-0">
        {mainCast.map((member) => {
          const profileUrl = member.profile_path
            ? `https://image.tmdb.org/t/p/w185${member.profile_path}`
            : null

          return (
            <Card
              key={member.id}
              className="w-[130px] flex-shrink-0 overflow-hidden border border-border/30 bg-card/35 backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:border-primary/40 hover:shadow-lg hover:shadow-black/20"
            >
              <div className="relative flex h-[160px] w-full items-center justify-center overflow-hidden bg-muted/50">
                {profileUrl ? (
                  <Image
                    src={profileUrl}
                    alt={member.name}
                    fill
                    sizes="130px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-muted-foreground/50">
                    <HugeiconsIcon
                      icon={UserIcon}
                      size={32}
                      className="opacity-40"
                    />
                  </div>
                )}
              </div>
              <CardContent className="flex flex-col gap-1 p-3">
                <p
                  className="truncate text-xs font-bold text-foreground"
                  title={member.name}
                >
                  {member.name}
                </p>
                <p
                  className="truncate text-[10px] text-muted-foreground"
                  title={member.character}
                >
                  {member.character}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export { CastList, type CastListProps }
