import axios from 'axios';

type SubmitPayload = {
  name: string;
  email: string;
};

type ApiResult = {
  ok: boolean;
  status: number;
  data?: any;
  error?: string;
};

/**
 * Submit form.
 * Behavior:
 * - If `NEXT_PUBLIC_BACKEND_URL` is set, call that URL directly from the browser (requires CORS).
 * - Otherwise, call the local Next.js proxy at `/api/submit`.
 */
export async function submitForm(payload: SubmitPayload): Promise<ApiResult> {
  try {
    const clientBackend = typeof window !== 'undefined' ? (process.env.NEXT_PUBLIC_BACKEND_URL || '') : '';

    if (clientBackend) {
      // Call backend directly from browser. Ensure backend allows CORS for your origin.
      const url = `${clientBackend.replace(/\/$/, '')}/api/submit`;
      const res = await axios.post(url, payload, { headers: { 'Content-Type': 'application/json' } });
      return { ok: true, status: res.status, data: res.data };
    }

    // Fallback to proxying through Next.js server route
    const res = await axios.post('/api/submit', payload, { headers: { 'Content-Type': 'application/json' } });
    return { ok: true, status: res.status, data: res.data };
  } catch (err: any) {
    if (err.response) {
      return { ok: false, status: err.response.status, error: JSON.stringify(err.response.data) };
    }
    return { ok: false, status: 500, error: String(err?.message ?? err) };
  }
}

export default { submitForm };
