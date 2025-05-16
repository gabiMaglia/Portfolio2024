import { NextResponse } from 'next/server'
import { fetchUserPhrases } from '@/lib/queries'

export async function GET() {
  try {
    const phrases = await fetchUserPhrases()
    return NextResponse.json(phrases)
  } catch (err) {
    console.error(err)
    return new NextResponse('Error fetching user phrases', { status: 500 })
  }
}