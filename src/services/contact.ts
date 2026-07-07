export interface ContactPayload {
  name: string;
  email: string;
  company: string;
  budget?: string;
  service: string;
  message: string;
}

export interface ContactResponse {
  ok: boolean;
  reference?: string;
  error?: string;
}

/**
 * Placeholder submission service — swap for a real endpoint (FormSubmit,
 * Formspree, Resend, or your own API) in one place.
 */
export async function submitContact(
  _payload: ContactPayload
): Promise<ContactResponse> {
  await new Promise((res) => setTimeout(res, 1200));
  return {
    ok: true,
    reference: `ZOO-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
  };
}

/** Local dev helper — echoes payload to console. */
export function logContact(payload: ContactPayload) {
  if (import.meta.env.DEV) {
    console.info("[contact] would submit", payload);
  }
}
