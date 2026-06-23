export async function sendWelcomeEmail(to: string, name?: string | null) {
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
    console.log("[email] Resend not configured; skipped welcome email for", to);
    return;
  }

  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL,
    to,
    subject: "Welcome to SessionTimer",
    text: `Hi ${name ?? "there"},\n\nYour SessionTimer account is ready. Start by saving the timer routines you use most.\n\n- SessionTimer`,
  });
}
