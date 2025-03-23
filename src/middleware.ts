import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Get IP addresses
  const clientIP = request.headers.get('x-forwarded-for') || 'Unknown'
  const cfIP = request.headers.get('CF-Connecting-IP') || 'Unknown'

    // Log IP addresses
    console.log('Client IP:', clientIP)
    console.log('Cloudflare IP:', cfIP)
  // Set IP addresses in headers
  
  // Add custom headers
  response.headers.set('x-client-ip', clientIP)
  response.headers.set('x-cf-ip', cfIP)
  
  return response
}

export const config = {
  matcher: '/:path*',
}
