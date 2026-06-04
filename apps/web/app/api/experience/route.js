import { NextResponse } from 'next/server'
import { fetchExperiences } from '@/lib/queries'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const lang = searchParams.get('lang') || 'en'
  try {
    const experiences = await fetchExperiences(lang)
    return NextResponse.json(experiences)
  } catch (err) {
    console.error(err)
    return new NextResponse('Error fetching experiences', { status: 500 })
  }
}
