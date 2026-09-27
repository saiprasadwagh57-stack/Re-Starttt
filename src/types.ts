export type RecoveryStatus = 'not_started' | 'in_progress' | 'completed' | 'blocked';
export type UrgencyLevel = 'immediate' | 'high_dependency' | 'can_wait';
export type EffortLevel = 'low' | 'medium' | 'high';

export interface RecoveryChecklistItem {
  id: string;
  text: string;
  done: boolean;
}

export interface RecoveryNode {
  id: string;
  title: string;
  category: 'telecom' | 'identity' | 'banking' | 'payments' | 'cards' | 'legal' | 'general';
  status: RecoveryStatus;
  urgency: UrgencyLevel;
  whyItMatters: string;
  nextAction: string;
  estimatedEffort: EffortLevel;
  estimatedTime: string;
  dependencies: string[]; // Node IDs that MUST finish first
  unlocks: string[]; // Node IDs that this node unlocks
  unlocksCount: number;
  isSequential: boolean;
  canParallelWith: string[]; // Node IDs that can run concurrently
  requirements: string[];
  portalOrAuthority: string;
  stepChecklist: RecoveryChecklistItem[];
  draftTemplateType?: string;
  x?: number; // Graph positioning coordinates
  y?: number;
}

export interface ParallelGroup {
  id: string;
  title: string;
  tasks: string[];
  reason: string;
}

export interface AffectedService {
  id: string;
  name: string;
  iconName: string;
  urgency: UrgencyLevel;
  description: string;
}

export interface RecoveryPlan {
  id: string;
  title: string;
  situation: string;
  userPersona?: {
    name: string;
    age?: number;
    summary: string;
  };
  language: 'en' | 'mr' | 'hi';
  createdAt: string;
  overallProgress: number; // 0 to 100
  affectedServices: AffectedService[];
  missingDocuments: string[];
  nodes: RecoveryNode[];
  prioritySequence: string[]; // ordered node IDs
  parallelGroups: ParallelGroup[];
  reasoningSummary: string;
  immediateAction: {
    nodeId: string;
    title: string;
    reasoning: string;
    unlocksCount: number;
  };
  auditLog: {
    id: string;
    timestamp: string;
    message: string;
    type: 'info' | 'success' | 'alert';
  }[];
}

export interface SyntheticDocument {
  id: string;
  name: string;
  category: string;
  issuingAuthority: string;
  status: 'verified' | 'ready' | 'pending_verification';
  uploadDate: string;
  fileSize: string;
  documentType: string;
  detectedInfo: {
    documentCategory: string;
    issuingAuthority: string;
    expiryInfo: string;
    supportingInfo: string;
  };
  potentialUses: string[];
  rawSummary: string;
}

export interface AssistantMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  referencedNodes?: string[];
  suggestedActions?: string[];
}

export interface ApplicationDraft {
  id: string;
  title: string;
  authority: string;
  recipient: string;
  subject: string;
  body: string;
  attachmentsList: string[];
  instructions: string[];
}
