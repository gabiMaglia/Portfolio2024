import { NextResponse } from 'next/server'
import { fetchSkills } from '@/lib/queries'

export async function GET() {
  try {
    const skills = await fetchSkills()
    return NextResponse.json(skills)
  } catch (err) {
    console.error(err)
    return new NextResponse('Error fetching skills', { status: 500 })
  }
}