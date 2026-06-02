type AnalyticsEvent =
  | "timer_started"
  | "timer_completed"
  | "preset_created"
  | "template_used"
  | "upgrade_clicked"
  | "checkout_started"
  | "subscription_activated"
  | "signup"
  | "login";

interface EventProperties {
  [key: string]: string | number | boolean | undefined;
}

export function trackEvent(
  event: AnalyticsEvent,
  properties?: EventProperties
): void {
  const payload = {
    event,
    properties,
    timestamp: new Date().toISOString(),
  };

  if (process.env.NODE_ENV === "development") {
    console.log("[analytics]", JSON.stringify(payload));
  }

  // In production, send to analytics service here
  // e.g., fetch('/api/analytics', { method: 'POST', body: JSON.stringify(payload) })
}
