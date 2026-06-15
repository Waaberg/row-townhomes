import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, unit, timeline, message } = body

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required.' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not set')
      return NextResponse.json(
        { error: 'Email service not configured.' },
        { status: 500 }
      )
    }

    // Send notification email to ROW team
    const notifyRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'ROW Townhomes <noreply@row2534.com>',
        to: ['hello@row2534.com'],
        subject: `New Interest List Inquiry — ${name}`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #f5f0e8; padding: 40px 32px; border-radius: 4px;">
            <div style="border-bottom: 2px solid #2C3B2D; padding-bottom: 20px; margin-bottom: 28px;">
              <h1 style="font-family: Georgia, serif; color: #2C3B2D; font-size: 26px; font-weight: 400; margin: 0;">ROW Townhomes</h1>
              <p style="color: #B8A87A; font-size: 13px; letter-spacing: 0.1em; margin: 4px 0 0; text-transform: uppercase; font-family: Arial, sans-serif;">New Interest List Inquiry</p>
            </div>

            <table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px;">
              <tr>
                <td style="padding: 10px 0; color: #666; width: 140px; vertical-align: top;">Name</td>
                <td style="padding: 10px 0; color: #1E2A1F; font-weight: 600;">${name}</td>
              </tr>
              <tr style="border-top: 1px solid #D9D0BF;">
                <td style="padding: 10px 0; color: #666; vertical-align: top;">Email</td>
                <td style="padding: 10px 0; color: #1E2A1F;"><a href="mailto:${email}" style="color: #2C3B2D;">${email}</a></td>
              </tr>
              <tr style="border-top: 1px solid #D9D0BF;">
                <td style="padding: 10px 0; color: #666; vertical-align: top;">Phone</td>
                <td style="padding: 10px 0; color: #1E2A1F;">${phone || '—'}</td>
              </tr>
              <tr style="border-top: 1px solid #D9D0BF;">
                <td style="padding: 10px 0; color: #666; vertical-align: top;">Interested In</td>
                <td style="padding: 10px 0; color: #1E2A1F;">${unit || '—'}</td>
              </tr>
              <tr style="border-top: 1px solid #D9D0BF;">
                <td style="padding: 10px 0; color: #666; vertical-align: top;">Move-in Timeline</td>
                <td style="padding: 10px 0; color: #1E2A1F;">${timeline || '—'}</td>
              </tr>
              ${message ? `
              <tr style="border-top: 1px solid #D9D0BF;">
                <td style="padding: 10px 0; color: #666; vertical-align: top;">Message</td>
                <td style="padding: 10px 0; color: #1E2A1F;">${message}</td>
              </tr>
              ` : ''}
            </table>

            <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #D9D0BF; font-family: Arial, sans-serif; font-size: 12px; color: #999;">
              Submitted via row2534.com on ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
        `,
      }),
    })

    if (!notifyRes.ok) {
      const err = await notifyRes.text()
      console.error('Resend error:', err)
      return NextResponse.json(
        { error: 'Failed to send email. Please try again.' },
        { status: 500 }
      )
    }

    // Send confirmation email to the prospect
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'ROW Townhomes <hello@row2534.com>',
        to: [email],
        subject: "You're on the ROW interest list",
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #2C3B2D; padding: 48px 40px; border-radius: 4px;">
            <h1 style="color: #F5F0E8; font-size: 28px; font-weight: 400; margin: 0 0 8px;">ROW Townhomes</h1>
            <p style="color: #B8A87A; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; font-family: Arial, sans-serif; margin: 0 0 32px;">Loveland, Colorado</p>

            <p style="color: #F5F0E8; font-size: 17px; line-height: 1.7; margin: 0 0 20px;">
              Hi ${name},
            </p>
            <p style="color: #EDE7D9; font-size: 15px; line-height: 1.8; font-family: Arial, sans-serif; margin: 0 0 20px;">
              Thank you for your interest in ROW Townhomes. We've received your inquiry and will be in touch shortly with availability, pricing, and next steps.
            </p>
            <p style="color: #EDE7D9; font-size: 15px; line-height: 1.8; font-family: Arial, sans-serif; margin: 0 0 32px;">
              In the meantime, feel free to reply to this email with any questions.
            </p>

            <div style="border-top: 1px solid #3A4D3B; padding-top: 28px;">
              <p style="color: #B8A87A; font-size: 13px; font-family: Arial, sans-serif; margin: 0;">ROW Townhomes</p>
              <p style="color: #8a9e8b; font-size: 12px; font-family: Arial, sans-serif; margin: 4px 0 0;">2534 Exposition Drive, Loveland, CO 80538</p>
              <p style="color: #8a9e8b; font-size: 12px; font-family: Arial, sans-serif; margin: 4px 0 0;">
                <a href="mailto:hello@row2534.com" style="color: #B8A87A; text-decoration: none;">hello@row2534.com</a>
              </p>
            </div>
          </div>
        `,
      }),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
