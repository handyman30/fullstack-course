import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // User cancelled the PayPal flow, redirect to home with a message
  return NextResponse.redirect(new URL('/?subscription=cancelled', request.url))
} 