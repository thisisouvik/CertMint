import { redirect } from "next/navigation";
import MintCertificateWizard from "@/components/minter/mint-certificate-wizard";
import { getUserApproval } from "@/lib/auth/approval";
import { createClient } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic';

export default async function MintPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth?next=/mint");
  }

  const approval = await getUserApproval(user.id);
  const isApproved = approval?.approval_status === "approved";

  if (!isApproved) {
    redirect("/dashboard?error=Complete+KYC+verification+before+minting.");
  }

  return <MintCertificateWizard />;
}
