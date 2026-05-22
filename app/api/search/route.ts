import { NextRequest, NextResponse } from "next/server"
import { searchContent } from "@/services/movies"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query") || ""
  const page = Number(searchParams.get("page")) || 1

  try {
    const data = await searchContent(query, page)
    return NextResponse.json(data)
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Erro ao processar busca"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
