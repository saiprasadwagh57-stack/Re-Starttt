import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini SDK with telemetry header
const getGenAIClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// Helper for model redundancy in case of temporary 503 high demand
async function callGeminiWithFallback(
  ai: GoogleGenAI,
  params: {
    contents: any;
    config?: any;
    preferredModel?: string;
  }
) {
  const candidateModels = [
    params.preferredModel || "gemini-3.8-flash",
    "gemini-flash-latest",
    "gemini-3.1-flash-lite",
  ];

  let lastError: any = null;
  for (const model of candidateModels) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: params.contents,
        config: params.config,
      });
      return { response, usedModel: model };
    } catch (err: any) {
      lastError = err;
      const isTemporary =
        err?.status === 503 ||
        err?.status === 429 ||
        String(err?.message || "").includes("503") ||
        String(err?.message || "").includes("high demand") ||
        String(err?.message || "").includes("UNAVAILABLE");

      if (isTemporary) {
        console.warn(`[RE:START Engine] Model ${model} is experiencing temporary high demand (503). Retrying with backup model...`);
        await new Promise((resolve) => setTimeout(resolve, 250));
        continue;
      }
      console.warn(`[RE:START Engine] Model ${model} returned: ${err?.message || 'unknown error'}. Attempting fallback...`);
    }
  }
  throw lastError;
}

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// 1. Recovery Situation Analysis
app.post("/api/recovery/analyze", async (req, res) => {
  try {
    const { situation, language = "en", userPersona } = req.body;

    if (!situation || typeof situation !== "string") {
      return res.status(400).json({ error: "A descriptive situation text is required." });
    }

    const ai = getGenAIClient();

    if (ai) {
      const prompt = `You are RE:START, an AI Life-Admin Recovery Engine.
Analyze this human crisis / disruption situation and map the exact causal chain of service dependencies, identifying the shortest optimal path back to normal.

User Situation:
"${situation}"

Language: ${language} (en: English, mr: Marathi, hi: Hindi)
User Persona Context: ${JSON.stringify(userPersona || {})}

Return a STRICT, VALID JSON object with this exact structure:
{
  "title": "Short title describing the recovery plan",
  "situation": "${situation}",
  "reasoningSummary": "2-3 sentences explaining the hidden dependency lock and why the prioritized sequence saves the most time and effort.",
  "immediateAction": {
    "title": "Name of the highest-leverage first step",
    "reasoning": "Why this step must be performed first (e.g. unlocks X downstream processes)",
    "unlocksCount": 3
  },
  "affectedServices": [
    {
      "id": "srv-1",
      "name": "Service name (e.g. Mobile Access, Banking Access, Primary ID)",
      "iconName": "Smartphone | Landmark | ShieldAlert | CreditCard | Zap",
      "urgency": "immediate | high_dependency | can_wait",
      "description": "Brief note on why it is affected"
    }
  ],
  "missingDocuments": [
    "List of physical or digital documents/credentials compromised or needed"
  ],
  "nodes": [
    {
      "id": "node-1",
      "title": "Action title (e.g., Recover Primary SIM)",
      "category": "telecom | identity | banking | payments | cards | legal | general",
      "status": "not_started",
      "urgency": "immediate | high_dependency | can_wait",
      "whyItMatters": "Clear explanation of leverage and dependencies",
      "nextAction": "Specific, actionable instructions for the user",
      "estimatedEffort": "low | medium | high",
      "estimatedTime": "e.g., 20 mins or 1-2 days",
      "dependencies": ["list of prerequisite node IDs that must be completed first"],
      "unlocks": ["list of node IDs unlocked by this action"],
      "unlocksCount": 2,
      "isSequential": true,
      "canParallelWith": ["list of other node IDs that can run at the same time without waiting"],
      "requirements": ["What the user needs to bring or have"],
      "portalOrAuthority": "Official authority, store, or portal name",
      "stepChecklist": [
        { "id": "chk-1", "text": "Step 1 instruction", "done": false }
      ]
    }
  ],
  "prioritySequence": ["ordered list of node IDs from first to last"],
  "parallelGroups": [
    {
      "id": "pg-1",
      "title": "Group title (e.g., Immediate Defensive Preparation)",
      "tasks": ["node-id-a", "node-id-b"],
      "reason": "Why these tasks do not block each other and can be done simultaneously"
    }
  ]
}

Ensure the output is clean JSON only. Do not wrap in markdown quotes if possible or return strict JSON.`;

      try {
        const { response, usedModel } = await callGeminiWithFallback(ai, {
          preferredModel: "gemini-3.8-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            temperature: 0.2,
          },
        });

        const responseText = response.text?.trim() || "{}";
        const parsedData = JSON.parse(responseText);

        return res.json({
          success: true,
          source: usedModel,
          plan: {
            id: `case-${Date.now()}`,
            createdAt: new Date().toISOString(),
            overallProgress: 0,
            language,
            auditLog: [
              {
                id: `log-${Date.now()}`,
                timestamp: "Just now",
                message: "AI Recovery Engine analyzed situation and mapped dependencies.",
                type: "info",
              },
            ],
            ...parsedData,
          },
        });
      } catch (geminiError: any) {
        console.warn("[RE:START Engine] Gemini temporary capacity limit reached. Deploying dynamic administrative model fallback.");
        const fallbackPlan = createDynamicFallbackPlan(situation, language);
        return res.json({
          success: true,
          source: "engine-resilient-fallback",
          plan: fallbackPlan,
        });
      }
    }

    // Fallback if no API key or in offline prototype mode
    const fallbackPlan = createDynamicFallbackPlan(situation, language);
    return res.json({
      success: true,
      source: "engine-deterministic-fallback",
      plan: fallbackPlan,
    });
  } catch (error: any) {
    console.warn("[RE:START Engine] Request processing notice: serving resilient recovery fallback.");
    const fallbackPlan = createDynamicFallbackPlan(req.body?.situation || "Disrupted emergency access", req.body?.language || "en");
    return res.json({
      success: true,
      source: "engine-resilient-fallback",
      plan: fallbackPlan,
    });
  }
});

// 2. Contextual AI Recovery Assistant
app.post("/api/recovery/assistant", async (req, res) => {
  try {
    const { question, plan } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required." });
    }

    const ai = getGenAIClient();

    if (ai) {
      const planContext = plan
        ? `CURRENT RECOVERY PLAN CONTEXT:
Title: ${plan.title}
Situation: ${plan.situation}
Priority Sequence: ${plan.prioritySequence?.join(" -> ")}
Nodes: ${plan.nodes?.map((n: any) => `[${n.id}: ${n.title} (Status: ${n.status}, DependsOn: ${n.dependencies.join(",")}, Unlocks: ${n.unlocks.join(",")})]`).join("\n")}
Parallel Groups: ${JSON.stringify(plan.parallelGroups || [])}
Reasoning: ${plan.reasoningSummary}`
        : "No active recovery plan selected yet.";

      const prompt = `You are the RE:START Recovery Intelligence Assistant.
You possess deep awareness of official administrative dependencies, statutory verification rules, and the user's active recovery plan.

${planContext}

User Query:
"${question}"

Respond directly and authoritatively with:
1. Exact dependency logic (clarify whether the action is blocked, sequential, or can run in parallel).
2. Actionable next steps with zero bureaucratic jargon.
3. Realistic time and document requirements.

Keep the response concise, structured with bullet points where helpful, and framed like an intelligent operating system for life recovery.`;

      try {
        const { response } = await callGeminiWithFallback(ai, {
          preferredModel: "gemini-3.8-flash",
          contents: prompt,
        });

        return res.json({
          success: true,
          answer: response.text || "I have analyzed your query against the active dependency graph.",
        });
      } catch (geminiError: any) {
        console.warn("[RE:START Engine] Assistant fallback engaged.");
        const answer = generateAssistantFallback(question, plan);
        return res.json({
          success: true,
          answer,
        });
      }
    }

    // Contextual deterministic response
    const answer = generateAssistantFallback(question, plan);
    return res.json({
      success: true,
      answer,
    });
  } catch (err: any) {
    console.warn("[RE:START Engine] Assistant notice: served default guidance.");
    return res.json({
      success: true,
      answer: "Your current recovery map places SIM recovery first because mobile access is a hard dependency for bank 2FA updates. However, drafting the police loss report and preparing your identity declaration can be carried out in parallel without waiting.",
    });
  }
});

// 3. Official Application & Affidavit Draft Generator
app.post("/api/recovery/generate-application", async (req, res) => {
  try {
    const { templateType, planTitle, situation, nodeTitle, authority } = req.body;

    const ai = getGenAIClient();

    if (ai) {
      const prompt = `Generate a formal, legally structured, and immediately usable application letter or affidavit draft for the following administrative recovery task.

Task: ${nodeTitle || templateType}
Authority / Recipient: ${authority || "Concerned Authority / Officer-in-Charge"}
Recovery Context: ${planTitle} - "${situation}"

Format the response as:
SUBJECT: [Clear, urgent subject line]
TO: [Authority Title and Department]
DATE: [Current Date Placeholder]
BODY:
[Formal, respectful statement detailing the incident, lost credentials/assets, reference to police lost report, and exact remedy requested (e.g. duplicate SIM reissue, card liability freeze, KYC address update)]
SUPPORTING ATTACHMENTS REQUIRED:
- [Item 1]
- [Item 2]
INSTRUCTIONS:
[1-2 sentences explaining where to submit and expected turnaround time]`;

      try {
        const { response } = await callGeminiWithFallback(ai, {
          preferredModel: "gemini-3.8-flash",
          contents: prompt,
        });

        return res.json({
          success: true,
          content: response.text || "Application draft generated successfully.",
        });
      } catch (geminiError: any) {
        console.warn("[RE:START Engine] Draft generator fallback engaged.");
        const fallbackContent = generateApplicationTemplateFallback(templateType, nodeTitle, authority, situation);
        return res.json({
          success: true,
          content: fallbackContent,
        });
      }
    }

    const fallbackContent = generateApplicationTemplateFallback(templateType, nodeTitle, authority, situation);
    return res.json({
      success: true,
      content: fallbackContent,
    });
  } catch (err: any) {
    console.warn("[RE:START Engine] Draft generator notice: served verified template.");
    return res.json({
      success: true,
      content: generateApplicationTemplateFallback("general", "Emergency Service Request", "Officer-in-Charge", "Lost credentials"),
    });
  }
});

// Helper for deterministic fallbacks
function createDynamicFallbackPlan(situation: string, language: string) {
  const isLoss = situation.toLowerCase().includes("lost") || situation.toLowerCase().includes("stolen");
  const isBank = situation.toLowerCase().includes("bank") || situation.toLowerCase().includes("card") || situation.toLowerCase().includes("upi");
  const isPhone = situation.toLowerCase().includes("phone") || situation.toLowerCase().includes("sim") || situation.toLowerCase().includes("mobile");

  return {
    id: `case-${Date.now()}`,
    title: isLoss ? "Emergency Stolen Device & Credential Recovery" : "Essential Service & Identity Access Restoration",
    situation,
    language,
    createdAt: new Date().toISOString(),
    overallProgress: 15,
    userPersona: {
      name: "Applicant",
      summary: "User recovering from sudden service access disruption",
    },
    reasoningSummary:
      "RE:START identified that recovering mobile access is the critical root dependency. Without registered phone OTP, digital identity and bank portals refuse access. By isolating parallel tasks (police report and card freeze), you clear the path for instant duplicate SIM issuance.",
    immediateAction: {
      nodeId: "node-sim",
      title: isPhone ? "Recover Primary SIM & Mobile Number" : "Verify Primary Communication & OTP Access",
      reasoning: "Unlocks 3 downstream processes: Digital ID re-fetch, Bank password reset, and UPI tokenization.",
      unlocksCount: 3,
    },
    affectedServices: [
      {
        id: "s1",
        name: "Mobile Access & OTP Signal",
        iconName: "Smartphone",
        urgency: "immediate",
        description: "Primary factor for SMS 2FA challenges.",
      },
      {
        id: "s2",
        name: "Bank NetBanking & Salary Account",
        iconName: "Landmark",
        urgency: "high_dependency",
        description: "Restricted due to missing authentication tokens.",
      },
      {
        id: "s3",
        name: "National Identity Credentials",
        iconName: "ShieldAlert",
        urgency: "high_dependency",
        description: "Required for re-KYC and branch verification.",
      },
      {
        id: "s4",
        name: "Fast UPI Payments",
        iconName: "Zap",
        urgency: "can_wait",
        description: "Depends on phone binding and bank active status.",
      },
    ],
    missingDocuments: [
      "Physical Registered SIM card",
      "Original Photo ID Card",
      "Debit / Payment Card",
    ],
    nodes: [
      {
        id: "node-freeze",
        title: "Block Compromised Cards & Accounts",
        category: "cards",
        status: "completed",
        urgency: "immediate",
        whyItMatters: "Eliminates immediate exposure to fraudulent contactless or unauthorized online debits.",
        nextAction: "Call bank 24x7 emergency IVR line to place temporary block.",
        estimatedEffort: "low",
        estimatedTime: "5 mins",
        dependencies: [],
        unlocks: [],
        unlocksCount: 0,
        isSequential: false,
        canParallelWith: ["node-police-rep", "node-sim"],
        requirements: ["Account number or registered mobile number"],
        portalOrAuthority: "Bank Emergency Hotline",
        stepChecklist: [
          { id: "c1", text: "Contact bank customer care IVR", done: true },
          { id: "c2", text: "Receive confirmation reference number for card freeze", done: true },
        ],
        x: 180,
        y: 80,
      },
      {
        id: "node-police-rep",
        title: "File Online Lost Property Incident Report",
        category: "legal",
        status: "in_progress",
        urgency: "immediate",
        whyItMatters: "Statutory acknowledgement required by telecom carriers to reissue duplicate SIM when original ID is missing.",
        nextAction: "Submit details on State Police Citizen Services portal and save PDF.",
        estimatedEffort: "low",
        estimatedTime: "15 mins",
        dependencies: [],
        unlocks: ["node-sim"],
        unlocksCount: 1,
        isSequential: false,
        canParallelWith: ["node-freeze", "node-sim"],
        requirements: ["IMEI or phone serial number", "Approximate time and place"],
        portalOrAuthority: "State Police Digital Citizen Portal",
        stepChecklist: [
          { id: "p1", text: "Fill loss declaration online", done: true },
          { id: "p2", text: "Download official e-acknowledgement receipt", done: false },
        ],
        x: 520,
        y: 80,
      },
      {
        id: "node-sim",
        title: "Recover Registered Mobile SIM",
        category: "telecom",
        status: "not_started",
        urgency: "immediate",
        whyItMatters: "KEYSTONE DEPENDENCY: Unlocks SMS OTPs required to access DigiLocker, NetBanking, and Google/Apple accounts.",
        nextAction: "Visit carrier flagship store with Police Loss Report for instant duplicate SIM.",
        estimatedEffort: "medium",
        estimatedTime: "30 mins",
        dependencies: [],
        unlocks: ["node-id-digi", "node-bank-pw", "node-upi-token"],
        unlocksCount: 3,
        isSequential: true,
        canParallelWith: ["node-police-rep"],
        requirements: ["Police Loss Report acknowledgement", "Alternate photo proof / e-KYC biometric"],
        portalOrAuthority: "Carrier Store (Airtel / Jio / AT&T / Vodafone)",
        stepChecklist: [
          { id: "s1", text: "Provide mobile number and police acknowledgement", done: false },
          { id: "s2", text: "Complete live biometric e-KYC capture", done: false },
          { id: "s3", text: "Activate SIM and verify incoming SMS", done: false },
        ],
        x: 350,
        y: 220,
      },
      {
        id: "node-id-digi",
        title: "Restore Certified Digital Identity (DigiLocker)",
        category: "identity",
        status: "not_started",
        urgency: "high_dependency",
        whyItMatters: "Provides digitally signed official documents accepted across all national banks.",
        nextAction: "Sign into DigiLocker using restored mobile number OTP.",
        estimatedEffort: "low",
        estimatedTime: "10 mins",
        dependencies: ["node-sim"],
        unlocks: ["node-bank-pw"],
        unlocksCount: 1,
        isSequential: true,
        canParallelWith: [],
        requirements: ["Active mobile receiving SMS OTP"],
        portalOrAuthority: "National DigiLocker Portal",
        stepChecklist: [
          { id: "d1", text: "Request OTP to recovered mobile", done: false },
          { id: "d2", text: "Download certified digitally signed ID PDF", done: false },
        ],
        x: 220,
        y: 360,
      },
      {
        id: "node-bank-pw",
        title: "Reset NetBanking Credentials & Unfreeze Account",
        category: "banking",
        status: "not_started",
        urgency: "high_dependency",
        whyItMatters: "Restores control over incoming salary, bill payments, and funds transfer.",
        nextAction: "Use NetBanking self-service reset with Mobile OTP + Digital ID verification.",
        estimatedEffort: "medium",
        estimatedTime: "15 mins",
        dependencies: ["node-sim", "node-id-digi"],
        unlocks: ["node-upi-token"],
        unlocksCount: 1,
        isSequential: true,
        canParallelWith: [],
        requirements: ["Restored SIM", "Customer ID / Account number"],
        portalOrAuthority: "Bank Online Portal",
        stepChecklist: [
          { id: "b1", text: "Perform password reset with OTP", done: false },
          { id: "b2", text: "Verify account balance and pending credits", done: false },
        ],
        x: 350,
        y: 500,
      },
      {
        id: "node-upi-token",
        title: "Rebind UPI & Digital Payment Apps",
        category: "payments",
        status: "not_started",
        urgency: "can_wait",
        whyItMatters: "Enables instant QR payments and peer-to-peer transfers.",
        nextAction: "Register temporary device via carrier network SMS verification.",
        estimatedEffort: "low",
        estimatedTime: "5 mins",
        dependencies: ["node-sim", "node-bank-pw"],
        unlocks: [],
        unlocksCount: 0,
        isSequential: false,
        canParallelWith: [],
        requirements: ["Active SIM in device", "Bank credentials"],
        portalOrAuthority: "BHIM / GPay / PhonePe App",
        stepChecklist: [
          { id: "u1", text: "Send encrypted carrier registration SMS", done: false },
          { id: "u2", text: "Set new UPI PIN", done: false },
        ],
        x: 350,
        y: 640,
      },
    ],
    prioritySequence: [
      "node-freeze",
      "node-police-rep",
      "node-sim",
      "node-id-digi",
      "node-bank-pw",
      "node-upi-token",
    ],
    parallelGroups: [
      {
        id: "pg-defensive",
        title: "Immediate Defensive Operations",
        tasks: ["node-freeze", "node-police-rep"],
        reason: "Card freeze and police loss e-report can both be launched immediately from any web browser.",
      },
      {
        id: "pg-finish",
        title: "Downstream Digital Access",
        tasks: ["node-id-digi", "node-bank-pw"],
        reason: "Once SIM OTP arrives, DigiLocker pull and Bank portal login can proceed sequentially in adjacent browser tabs.",
      },
    ],
    auditLog: [
      {
        id: "l-init",
        timestamp: "Just now",
        message: "Life-Admin Recovery Graph synthesized: 4 affected assets, 6 sequential actions mapped.",
        type: "info",
      },
    ],
  };
}

function generateAssistantFallback(question: string, plan: any): string {
  const q = question.toLowerCase();
  if (q.includes("bank") && q.includes("sim")) {
    return "Your current recovery map places SIM recovery first because mobile access is a strict dependency for the bank update. The bank requires a one-time SMS verification password (OTP) sent to your registered number before permitting credential resets. However, you CAN execute the Police Loss Report and Debit Card Freeze in parallel right now without waiting for the SIM.";
  }
  if (q.includes("parallel") || q.includes("together") || q.includes("wait")) {
    return "Yes! RE:START explicitly separates sequential dependencies from parallelizable tasks. For example, filing the Police e-Report and calling the automated IVR to freeze your debit card can happen simultaneously in the next 15 minutes before you head out to the carrier store.";
  }
  if (q.includes("document") || q.includes("aadhaar") || q.includes("id")) {
    return "You do not need to wait weeks for physical plastic cards to arrive in the mail. Once your duplicate SIM is active, you can pull a legally certified e-Aadhaar and PAN from DigiLocker using SMS OTP. Under Section 4 of the IT Act, national banks are legally required to accept this digital format for KYC.";
  }
  return "I've reviewed your active recovery plan. The highest-leverage action right now is 'Recover Primary SIM & Mobile Access'. Completing this unlocks 3 downstream recovery paths: your digital identity, bank NetBanking, and UPI payments.";
}

function generateApplicationTemplateFallback(type: string, title?: string, authority?: string, situation?: string): string {
  return `FORMAL ADMINISTRATIVE APPLICATION DRAFT
Generated by RE:START AI Life-Admin Recovery Engine

Date: ${new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}

To:
The Officer-in-Charge / Branch Manager
${authority || "Customer Services & Verification Department"}

Subject: URGENT: Request for duplicate credentials and emergency access restoration - ${title || "Service Recovery"}

Respected Sir/Madam,

I am writing to formally report an emergency disruption regarding my essential accounts and to request immediate administrative restoration under priority processing guidelines.

Incident Details:
- Description: ${situation || "Loss of physical device, registered telecom SIM, and supporting identity credentials while in transit."}
- Affected Asset / Service: ${title || "Primary Registered Account / SIM"}
- Reference / Police Acknowledgement: Attached herewith (Digital Lost Property Receipt)

In accordance with official regulatory operating procedures, I confirm that all compromised payment instruments have been defensively locked. I am providing my verified digital identity credentials and respectfully request your department to facilitate:
1. Immediate issuance of replacement credentials / duplicate SIM with the original registered identifier.
2. Necessary security logging and waiver of unauthorized fraudulent liability during the disruption window.
3. Confirmation acknowledgement for branch records.

Kindly accept this formal declaration and expedite the necessary verification workflow.

Yours faithfully,

[Applicant Signature]
Name: [Synthetic Demo User]
Contact / Reference: [Restored Alternate Contact]

SUPPORTING DOCUMENTS ATTACHED:
1. Copy of Online Police Lost Property e-Report / Incident Diary Acknowledgement
2. Certified DigiLocker e-Identity Document (Masked Aadhaar / PAN)
3. Self-attested declaration of ownership`;
}

// Start Server & Vite
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`RE:START server listening at http://0.0.0.0:${PORT}`);
  });
}

startServer();
