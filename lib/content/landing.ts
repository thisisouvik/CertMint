export interface HeroStat {
  label: string;
  value: string;
}

export interface CapabilityItem {
  title: string;
  description: string;
}

export interface WorkflowStep {
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface GalleryCertificate {
  id: string;
  icon: string;
  title: string;
  type: Exclude<CertificateFilter, "All">;
  issuer: string;
}

export const heroStats: HeroStat[] = [
  { value: "1,240", label: "Minted" },
  { value: "420", label: "Wallets" },
  { value: "4", label: "Types" },
];

export const certificateFilters = ["All", "Hackathon", "Course", "Event", "Achievement"] as const;

export type CertificateFilter = (typeof certificateFilters)[number];

export const featuredCertificates: GalleryCertificate[] = [
  { id: "cert-001", icon: "🏆", title: "Winner Badge", type: "Hackathon", issuer: "DevSprint 2026" },
  { id: "cert-002", icon: "🎓", title: "Python Mastery", type: "Course", issuer: "OpenLearn Hub" },
  { id: "cert-003", icon: "🎪", title: "Tech Expo Speaker", type: "Event", issuer: "Stellar Expo" },
  { id: "cert-004", icon: "⭐", title: "Community Impact", type: "Achievement", issuer: "BuildWeb3 DAO" },
];

export const capabilityItems: CapabilityItem[] = [
  {
    title: "On-chain proof matching",
    description:
      "Cross-check every certificate ID against Stellar transaction metadata and issuer signature in one pass.",
  },
  {
    title: "Instant revocation checks",
    description:
      "Detect revoked or superseded credentials before they reach hiring, admissions, or compliance decisions.",
  },
  {
    title: "Readable audit trace",
    description:
      "Surface token ID, issuer wallet, verification timestamp, and network transaction reference in a clean summary.",
  },
  {
    title: "Verifier-first UX",
    description:
      "Built for recruiters, institutions, and event teams that need trust fast without learning blockchain tools.",
  },
];

export const workflowSteps: WorkflowStep[] = [
  {
    title: "Enter certificate reference",
    description:
      "Paste a CertMint certificate ID, Stellar transaction hash, or recipient wallet from the credential.",
  },
  {
    title: "CertMint queries Stellar",
    description:
      "The verifier checks on-chain payload signatures and issuer records through the configured Stellar network.",
  },
  {
    title: "Receive trust verdict",
    description:
      "Get an easy-to-read status: verified, revoked, or not found, with blockchain evidence attached.",
  },
];

export const faqs: FaqItem[] = [
  {
    question: "Do users need a wallet to verify a certificate?",
    answer:
      "No. Verification in CertMint is public and read-only. Anyone can validate a certificate without connecting a wallet.",
  },
  {
    question: "What data is shown after verification?",
    answer:
      "You see certificate status, issuer identity, holder wallet, issue date, and the Stellar transaction reference used for proof.",
  },

  {
    question: "Can CertMint detect revoked certificates?",
    answer:
      "Yes. Revocation state is checked during verification, so revoked credentials are clearly marked as invalid.",
  },
  {
    question: "Is verification tied to Stellar testnet or mainnet?",
    answer:
      "CertMint supports Stellar environments through configuration. Your deployment decides whether verification targets testnet or mainnet.",
  },
];
