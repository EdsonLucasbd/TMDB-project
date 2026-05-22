"use client"

import { type FC, useEffect, useState } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import { Search01Icon, Cancel01Icon } from "@hugeicons/core-free-icons"
import { useDebounce } from "@/hooks/use-debounce"
import { Input } from "@/components/ui/input"

interface SearchBarProps {
  placeholder?: string
}

const SearchBar: FC<SearchBarProps> = ({
  placeholder = "Buscar filmes ou séries...",
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get initial value from URL
  const initialValue = searchParams.get("search") || ""
  const [inputValue, setInputValue] = useState(initialValue)
  const debouncedValue = useDebounce(inputValue, 300)

  // Sync state if URL changes externally (e.g. back navigation or clear filters)
  const currentSearchParam = searchParams.get("search") || ""
  const [prevSearchParam, setPrevSearchParam] = useState(currentSearchParam)
  if (prevSearchParam !== currentSearchParam) {
    setInputValue(currentSearchParam)
    setPrevSearchParam(currentSearchParam)
  }

  // Update URL search parameter when debounced value changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())

    if (debouncedValue.trim()) {
      params.set("search", debouncedValue.trim())
    } else {
      params.delete("search")
    }

    // Reset pagination to page 1 on new search
    params.delete("page")

    // Only transition if the query is actually different to avoid redundant pushes
    const currentSearch = searchParams.get("search") || ""
    if (currentSearch !== debouncedValue.trim()) {
      router.push(`${pathname}?${params.toString()}`)
    }
  }, [debouncedValue, pathname, router, searchParams])

  const handleClear = () => {
    setInputValue("")
  }

  return (
    <div className="relative w-full max-w-md">
      <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-muted-foreground/75">
        <HugeiconsIcon icon={Search01Icon} size={18} />
      </div>

      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border-border/40 bg-card/45 py-5 pr-10 pl-10 text-sm transition-all duration-200 placeholder:text-muted-foreground/60 focus-visible:border-primary/50 focus-visible:ring-primary"
      />

      {inputValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute inset-y-0 right-3 flex items-center rounded-full p-1 text-muted-foreground/70 transition-colors hover:bg-muted/40 hover:text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
          aria-label="Limpar pesquisa"
        >
          <HugeiconsIcon icon={Cancel01Icon} size={14} />
        </button>
      )}
    </div>
  )
}

export { SearchBar, type SearchBarProps }
