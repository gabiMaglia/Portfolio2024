import { NextResponse } from 'next/server'
import { fetchUserPhrases } from '@/lib/queries'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const lang = searchParams.get('lang') || 'en'
  try {
    const phrases = await fetchUserPhrases(lang)
    return NextResponse.json(phrases)
  } catch (err) {
    console.error(err)
    return new NextResponse('Error fetching user phrases', { status: 500 })
  }
}