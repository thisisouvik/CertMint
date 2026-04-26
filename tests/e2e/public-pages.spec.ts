import { expect, test } from "@playwright/test";

test.describe("Public page smoke tests", () => {
  test("landing page renders and links to auth", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Mint verifiable certificates on Stellar blockchain.", level: 1 })).toBeVisible();

    const signInCta = page.getByRole("link", { name: "Sign In to Mint Certificates" });
    await expect(signInCta).toBeVisible();
    await expect(signInCta).toHaveAttribute("href", "/auth?next=/dashboard");
  });

  test("auth page shows sign in form and verify link", async ({ page }) => {
    await page.goto("/auth");

    await expect(page.getByRole("heading", { name: "Authenticate to mint certificates", level: 1 })).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();

    const verifyLink = page.getByRole("link", { name: "Verify Certificate" });
    await expect(verifyLink).toBeVisible();
    await expect(verifyLink).toHaveAttribute("href", "/verify");
  });

  test("signup page shows registration form", async ({ page }) => {
    await page.goto("/auth/signup");

    await expect(page.getByRole("heading", { name: "Create your issuer account", level: 1 })).toBeVisible();
    await expect(page.getByLabel("Full Name")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
  });

  test("verify page shows lookup input", async ({ page }) => {
    await page.goto("/verify");

    await expect(page.getByRole("heading", { name: "Verify a Certificate", level: 1 })).toBeVisible();
    await expect(page.getByLabel("Certificate ID or Transaction ID")).toBeVisible();
    await expect(page.getByRole("button", { name: "Verify" })).toBeVisible();
  });
});
