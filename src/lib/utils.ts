import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Returns a direct Gmail Web Compose URL that opens in a browser tab
 * without triggering Windows Mail / Outlook desktop apps.
 */
export function getGmailComposeUrl(
  to = "pavel.hasan.cse@ulab.edu.bd",
  subject = "",
  body = ""
): string {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: to,
  });
  if (subject) params.set("su", subject);
  if (body) params.set("body", body);
  return `https://mail.google.com/mail/?${params.toString()}`;
}
