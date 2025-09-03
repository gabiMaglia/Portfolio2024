import { NextResponse } from 'next/server'
import { fetchProyects } from '@/lib/queries'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const locale = searchParams.get('locale') || 'es'

  try {
    const proyects = await fetchProyects(locale)
    return NextResponse.json(proyects)
  } catch (err) {
    console.error(err)
    return new NextResponse('Error fetching proyects', { status: 500 })
  }
}
