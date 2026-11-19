export type ClaimSource = "owner-supplied" | "independently-verified";

export type ImplementationStatus =
  | "owner-reported-implemented"
  | "review-required";

export type EvidenceStatus =
  | "owner-supplied-unverified"
  | "independently-verified"
  | "none-provided";

export type GenerationMethod = "factory-droid-sdk" | "scripted" | "not-applicable";

export type Collection = "project" | "research";

export interface Claim {
  text: string;
  source: ClaimSource;
}

export interface Metric {
  id: string;
  label: string;
  value: string;
  context: string;
  source: ClaimSource;
}

export interface EvidenceRecord {
  id: string;
  title: string;
  generationMethod: GenerationMethod;
  scope: string;
  metrics: Metric[];
  source: ClaimSource;
  limitations: string[];
}

export interface EventContext {
  name: string;
  period: string | null;
  teamSize: number | null;
}

export interface Project {
  slug: string;
  name: string;
  collection: Collection;
  domains: string[];
  summary: string;
  technologies: string[];
  implementationStatus: ImplementationStatus;
  evidenceStatus: EvidenceStatus;
  claims: Claim[];
  evidence: EvidenceRecord[];
  limitations: string[];
  event: EventContext | null;
  individualContribution: string | null;
  featuredRank: number | null;
  repositoryUrl: string | null;
  liveUrl: string | null;
}

export type ExperienceStatus = "incoming-confirmed" | "pending-resume-details";

export interface ExperienceRecord {
  slug: string;
  organization: string | null;
  title: string | null;
  period: string | null;
  startDate: string | null;
  endDate: string | null;
  status: ExperienceStatus;
  completed: boolean;
  ownerMention: string | null;
  notes: string[];
}

export interface Identity {
  name: string;
  institution: string;
  degree: string;
  expectedGraduation: string;
  roleLine: string[];
  philosophyHeadline: string;
  philosophyShort: string;
  github: string;
  linkedin: string | null;
  email: string | null;
  resumePdf: string | null;
}
