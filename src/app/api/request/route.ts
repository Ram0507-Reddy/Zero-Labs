import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, description, budget, timeline } = body;

    // Basic Validation
    if (!name || !email || !description) {
      return NextResponse.json(
        { error: 'Missing required parameters.' },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format.' },
        { status: 400 }
      );
    }

    // TODO: Implement Resend or Formspree integration here
    // Example Resend usage:
    // await resend.emails.send({
    //   from: 'build@zerolabs.live',
    //   to: 'intake@zerolabs.live',
    //   subject: `New Build Request: ${name}`,
    //   text: `Email: ${email}\nDesc: ${description}\nBudget: ${budget}\nTimeline: ${timeline}`
    // });

    // Simulate network delay for realistic UX
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // For now, securely log to the console (server-side only)
    console.log('[NEW BUILD REQUEST RECEIVED]', body);

    return NextResponse.json(
      { message: 'Request received. If it aligns, we will reach out.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[BUILD REQUEST ERROR]', error);
    return NextResponse.json(
      { error: 'Something went wrong. Try again.' },
      { status: 500 }
    );
  }
}
