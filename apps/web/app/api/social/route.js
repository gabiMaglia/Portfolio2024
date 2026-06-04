import { NextResponse } from 'next/server'
import { fetchSocials } from '@/lib/queries'

export async function GET() {
  try {
    const socials = await fetchSocials()
    return NextResponse.json(socials)
  } catch (err) {
    console.error(err)
    return new NextResponse('Error fetching social media', { status: 500 })
  }
}