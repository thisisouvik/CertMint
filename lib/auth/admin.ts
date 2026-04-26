export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) {
    return false;
  }

  const adminEmail = (process.env.ADMIN_MAIL ?? process.env.ADMIN_EMAIL ?? "").trim();
  const normalizedEmail = email.trim().toLowerCase();

  if (!adminEmail) {
    return false;
  }

  return normalizedEmail === adminEmail.toLowerCase();
}
