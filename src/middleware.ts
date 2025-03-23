import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Get original client IP (IPv4 or IPv6)
  const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'Unknown'

  // Get Cloudflare IP (should match clientIP if no proxy)
  const cfIP = request.headers.get('CF-Connecting-IP') || 'Unknown'

  // Log IPs
  console.log('Client IP:', clientIP)
  console.log('Cloudflare IP:', cfIP)
  
  // Add headers for client-side access
  response.headers.set('x-client-ip', clientIP)
  response.headers.set('x-cf-ip', cfIP)
  
  return response
}

export const config = {
  matcher: '/:path*',
}
