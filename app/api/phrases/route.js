import { NextResponse } from 'next/server'
import { fetchUserPhrases } from '@/lib/queries'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const locale = searchParams.get('locale') || 'es'

  try {
    const phrases = await fetchUserPhrases(locale)
    return NextResponse.json(phrases)
  } catch (err) {
    console.error(err)
    return new NextResponse('Error fetching user phrases', { status: 500 })
  }
}
