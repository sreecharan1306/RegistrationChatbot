import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, name, company, listId } = await request.json();

    if (!email || !listId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const brevoApiKey = process.env.NEXT_PUBLIC_BREVO_API_KEY || process.env.BREVO_API_KEY;
    const brevoApiUrl = process.env.NEXT_PUBLIC_BREVO_API_URL || 'https://api.brevo.com/v3/contacts';

    if (!brevoApiKey) {
      console.error('[v0] BREVO_API_KEY not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Add contact to Brevo using the contacts API
    // We use updateEnabled: true to update the contact if it already exists
    const response = await fetch(brevoApiUrl, {
      method: 'POST',
      headers: {
        'api-key': brevoApiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        attributes: {
          FIRSTNAME: name || '',
          NAME: name || '',
          COMPANY: company || '',
        },
        listIds: [Number(listId)],
        updateEnabled: true
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('[v0] Brevo API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to add contact' },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Contact added successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[v0] Error adding contact:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
