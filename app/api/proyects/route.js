import { NextResponse } from 'next/server'
import { fetchProyects } from '@/lib/queries'

export async function GET() {
  try {
    const proyects = await fetchProyects()
    return NextResponse.json(proyects)
  } catch (err) {
    console.error(err)
    return new NextResponse('Error fetching proyects', { status: 500 })
  }
}