import { NextResponse } from 'next/server'
import { fetchProyects } from '@/lib/queries'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const lang = searchParams.get('lang') || 'en'
  try {
    const proyects = await fetchProyects(lang)
    return NextResponse.json(proyects)
  } catch (err) {
    console.error(err)
    return new NextResponse('Error fetching proyects', { status: 500 })
  }
}