import React, { useState } from 'react';
import { SyntheticDocument } from '../types';
import { 
  FileText, 
  Upload, 
  CheckCircle2, 
  ShieldAlert, 
  Sparkles, 
  Eye, 
  FileCheck, 
  ExternalLink,
  Lock,
  Plus
} from 'lucide-react';

interface DocumentsPageProps {
  documents: SyntheticDocument[];
  onAddDocument: (doc: SyntheticDocument) => void;
}

export const DocumentsPage: React.FC<DocumentsPageProps> = ({
  documents,
  onAddDocument,
}) => {
  const [selectedDoc, setSelectedDoc] = useState<SyntheticDocument | null>(documents[0] || null);
  const [isSimulatingUpload, setIsSimulatingUpload] = useState(false);

  const handleSimulateUpload = () => {
    setIsSimulatingUpload(true);
    setTimeout(() => {
      const newDoc: SyntheticDocument = {
        id: `doc-${Date.now()}`,
        name: 'State Police Lost Property e-Challan (Synthetic)',
        category: 'Statutory Police e-Report',
        issuingAuthority: 'State Police Citizen Services Portal',
        status: 'verified',
        uploadDate: 'Just now',
        fileSize: '210 KB',
        documentType: 'Official Loss Report Acknowledgement (Synthetic)',
        detectedInfo: {
          documentCategory: 'Police Lost Incident Record',
          issuingAuthority: 'State Police Digital Citizen Services (CCTNS)',
          expiryInfo: 'Valid for 90 days from issuance',
          supportingInfo: 'Contains registered mobile IMEI number and lost backpack inventory.',
        },
        potentialUses: ['Duplicate SIM reissuance at carrier retail store', 'Bank liability freeze proof'],
        rawSummary: 'Authenticated e-Lost Report confirming loss of registered device and credential bag.',
      };
      onAddDocument(newDoc);
      setSelectedDoc(newDoc);
      setIsSimulatingUpload(false);
    }, 900);
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 sm:px-6 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-3xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
              Page 09 • Document Intelligence Vault
            </span>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono">
              Synthetic Sandbox
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Document Vault & Verification Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
            Upload or inspect synthetic digital records. The AI categorizes issuing authorities, verifies validity, and maps them directly to recovery steps.
          </p>
        </div>

        <button
          onClick={handleSimulateUpload}
          disabled={isSimulatingUpload}
          className="px-5 py-2.5 rounded-2xl bg-white text-black hover:bg-neutral-200 text-xs font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center gap-2 shrink-0 active:scale-95 disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
          <span>{isSimulatingUpload ? 'Extracting metadata...' : '＋ Add Synthetic Document'}</span>
        </button>
      </div>

      {/* Trust & Privacy Notice */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-center gap-3">
        <Lock className="w-4 h-4 shrink-0 text-amber-400" />
        <span>
          <strong>Zero PII Retention Sandbox:</strong> RE:START uses synthetic mockup documents for demo safety. Never upload real passports, PAN cards, or confidential financial statements.
        </span>
      </div>

      {/* Main Two-Column View: Left List, Right Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Document Cards List (6 cols) */}
        <div className="lg:col-span-6 space-y-3">
          {documents.map((doc) => {
            const isSelected = selectedDoc?.id === doc.id;
            return (
              <div
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-white/15 border-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.2)]'
                    : 'glass-panel hover:bg-white/[0.08] border-white/10'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-white/10 border border-white/10 text-cyan-300">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white leading-tight">
                        {doc.name}
                      </h4>
                      <span className="text-[11px] text-neutral-400">
                        {doc.issuingAuthority}
                      </span>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified</span>
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-white/[0.06]">
                  {doc.potentialUses.map((step, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.06] text-neutral-300 font-mono"
                    >
                      Unlocks: {step}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Document AI Analysis Inspector (6 cols) */}
        {selectedDoc && (
          <div className="lg:col-span-6 glass-panel-highlight rounded-3xl p-6 border border-white/15 flex flex-col gap-5 sticky top-24">
            <div className="flex items-start justify-between gap-3 pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-300">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-semibold text-cyan-400 uppercase tracking-wider block">
                    AI Document Extraction
                  </span>
                  <h3 className="text-base font-bold text-white">
                    {selectedDoc.name}
                  </h3>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono capitalize">
                {selectedDoc.status.replace('_', ' ')}
              </span>
            </div>

            {/* Extracted Details Grid */}
            <div>
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-2">
                Parsed Metadata & Fields
              </span>
              <div className="bg-black/50 border border-white/10 rounded-2xl p-4 font-mono text-xs space-y-2">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-1.5">
                  <span className="text-neutral-500">Document Type</span>
                  <span className="text-white font-medium">{selectedDoc.documentType}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-1.5">
                  <span className="text-neutral-500">Issuing Authority</span>
                  <span className="text-white font-medium">{selectedDoc.detectedInfo.issuingAuthority}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-1.5">
                  <span className="text-neutral-500">Validity / Expiry</span>
                  <span className="text-white font-medium">{selectedDoc.detectedInfo.expiryInfo}</span>
                </div>
                <div className="flex flex-col gap-1 pt-1">
                  <span className="text-neutral-500">Supporting Verification</span>
                  <span className="text-neutral-300 text-[11px] font-normal leading-relaxed">{selectedDoc.detectedInfo.supportingInfo}</span>
                </div>
              </div>
            </div>

            {/* Usability in Downstream Steps */}
            <div>
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-2">
                Authorized Recovery Use-Cases
              </span>
              <div className="space-y-2">
                {selectedDoc.potentialUses.map((step, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/20 text-xs text-neutral-200 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="font-semibold text-white">{step}</span>
                    </div>
                    <span className="text-[10px] text-emerald-300 font-mono">
                      Satisfies Requirement
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Authority Verification Rule */}
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-xs text-neutral-300 leading-relaxed">
              <strong className="text-cyan-300 block mb-0.5">Regulatory Standard:</strong>
              Digitally signed digital versions from {selectedDoc.issuingAuthority} carry statutory equality with physical originals under Section 4 of the Information Technology Act.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
