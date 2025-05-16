import { NextResponse } from 'next/server'
import { fetchExperiences } from '@/lib/queries'

export async function GET() {
  try {
    const experiences = await fetchExperiences()
    return NextResponse.json(experiences)
  } catch (err) {
    console.error(err)
    return new NextResponse('Error fetching experiences', { status: 500 })
  }
}
