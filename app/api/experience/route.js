import { NextResponse } from 'next/server'
import { fetchExperiences } from '@/lib/queries'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const locale = searchParams.get('locale') || 'es'

  try {
    const experiences = await fetchExperiences(locale)
    return NextResponse.json(experiences)
  } catch (err) {
    console.error(err)
    return new NextResponse('Error fetching experiences', { status: 500 })
  }
}
