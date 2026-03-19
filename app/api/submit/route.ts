import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Determine backend URL from environment. Prefer explicit BACKEND_URL.
    // In development fall back to localhost; in production require BACKEND_URL to be set.
    const backendUrl = process.env.BACKEND_URL ?? (process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:8000');

    if (!backendUrl) {
      // In production we require BACKEND_URL to be configured by the host (Vercel, Docker, etc.)
      console.error('Missing BACKEND_URL environment variable');
      return new NextResponse('Server configuration error: BACKEND_URL not set', { status: 500 });
    }

    // Helpful debug in non-production environments
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.log('[api/submit] using BACKEND_URL =', backendUrl);
    }

    const resp = await fetch(`${backendUrl.replace(/\/$/, '')}/api/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const contentType = resp.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await resp.json();
      return NextResponse.json(data, { status: resp.status });
    }
    const text = await resp.text();
    return new NextResponse(text, { status: resp.status });
  } catch (err: any) {
    console.error('API proxy error:', err);
    return new NextResponse(String(err?.message ?? 'Unknown error'), { status: 500 });
  }
}
