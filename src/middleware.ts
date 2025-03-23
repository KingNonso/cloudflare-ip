import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getIpDetails } from './lib/ipParser'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  const realIP = request.headers.get('x-real-ip')
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0].trim()
  const clientIP = realIP || forwardedFor || request.ip || 'Unknown'

  console.log('Client IP:', clientIP)
  console.log('Real IP:', realIP)
  console.log('Forwarded For:', forwardedFor)
  console.log('Request IP:', request.ip)
  console.log('Request Headers:', request.headers.get('user-agent'))
  console.log('Request URL:', request.url)
  
  // Clean IPv6 format
  const cleanIP = clientIP.replace(/^::ffff:/, '')
  
  if (cleanIP !== 'Unknown' && cleanIP !== '::1') {
    const details = await getIpDetails(cleanIP)
    response.headers.set('x-ip-details', JSON.stringify(details))
  }
  
  response.headers.set('x-client-ip', cleanIP)
  
  return response
}

export const config = {
  matcher: '/:path*',
}
