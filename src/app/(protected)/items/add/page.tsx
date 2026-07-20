"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function AddItemPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [step, setStep] = useState(1);
  const [generating, setGenerating] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: "",
    category: "nlp",
    keywords: "",
    tone: "professional",
  });

  const [generated, setGenerated] = useState<{
    shortDescription: string;
    fullDescription: string;
    tags: string[];
  } | null>(null);

  const handleGenerate = async () => {
    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }
    setGenerating(true);
    try {
      const res = await fetch(`${API}/ai/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.session?.token}`,
        },
        body: JSON.stringify({
          title: form.title,
          category: form.category,
          keywords: form.keywords.split(",").map((k) => k.trim()).filter(Boolean),
          tone: form.tone,
        }),
      });
      if (!res.ok) throw new Error("Generation failed");
      const data = await res.json();
      setGenerated(data);
      setStep(2);
    } catch {
      toast.error("AI generation failed. Try again.");
    } finally {
      setGenerating(false);
    }
  };

  const handleSubmit = async () => {
    if (!generated) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${API}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.session?.token}`,
        },
        body: JSON.stringify({
          title: form.title,
          category: form.category,
          shortDescription: generated.shortDescription,
          fullDescription: generated.fullDescription,
          tags: generated.tags,
          price: 0,
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      toast.success("Asset created successfully!");
      router.push("/items/manage");
    } catch {
      toast.error("Failed to create asset.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-text-crisp mb-2">Create AI Asset</h1>
      <p className="text-text-muted mb-8">Describe your AI agent and let AI generate the listing for you.</p>

      <div className="flex gap-2 mb-10">
        {[1, 2, 3].map((s) => (
          <div key={s} className={`flex-1 h-1.5 rounded-full ${step >= s ? "bg-cyber-violet" : "bg-white/10"}`} />
        ))}
      </div>

      {step === 1 && (
        <div className="rounded-2xl border border-white/10 bg-dark-card/30 p-8 space-y-5">
          <div>
            <label className="text-sm font-medium text-text-crisp block mb-1">Asset Title *</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g., GPT-4 Code Review Agent"
              className="w-full rounded-xl border border-white/10 bg-slate-deep px-4 py-3 text-sm text-text-crisp placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-cyber-violet"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-text-crisp block mb-1">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-slate-deep px-4 py-3 text-sm text-text-crisp focus:outline-none focus:ring-2 focus:ring-cyber-violet"
            >
              <option value="nlp">NLP</option>
              <option value="vision">Computer Vision</option>
              <option value="data">Data Analytics</option>
              <option value="code">Code Generation</option>
              <option value="speech">Speech & Audio</option>
              <option value="recommendation">Recommendation</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-text-crisp block mb-1">Keywords (comma-separated)</label>
            <input
              value={form.keywords}
              onChange={(e) => setForm({ ...form, keywords: e.target.value })}
              placeholder="code-review, gpt-4, automation"
              className="w-full rounded-xl border border-white/10 bg-slate-deep px-4 py-3 text-sm text-text-crisp placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-cyber-violet"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-text-crisp block mb-1">Output Tone</label>
            <select
              value={form.tone}
              onChange={(e) => setForm({ ...form, tone: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-slate-deep px-4 py-3 text-sm text-text-crisp focus:outline-none focus:ring-2 focus:ring-cyber-violet"
            >
              <option value="professional">Professional</option>
              <option value="technical">Technical</option>
              <option value="conversational">Conversational</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="w-full rounded-xl bg-cyber-violet py-3.5 text-sm font-semibold text-white transition-all hover:bg-cyber-violet/90 disabled:opacity-50"
          >
            {generating ? "Generating with AI..." : "Generate with AI →"}
          </button>
        </div>
      )}

      {step === 2 && generated && (
        <div className="rounded-2xl border border-white/10 bg-dark-card/30 p-8 space-y-5">
          <h2 className="text-xl font-semibold text-text-crisp">Review & Edit</h2>
          <div>
            <label className="text-sm font-medium text-text-crisp block mb-1">Short Description</label>
            <textarea
              value={generated.shortDescription}
              onChange={(e) => setGenerated({ ...generated, shortDescription: e.target.value })}
              rows={3}
              className="w-full rounded-xl border border-white/10 bg-slate-deep px-4 py-3 text-sm text-text-crisp focus:outline-none focus:ring-2 focus:ring-cyber-violet"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-text-crisp block mb-1">Full Description (Markdown)</label>
            <textarea
              value={generated.fullDescription}
              onChange={(e) => setGenerated({ ...generated, fullDescription: e.target.value })}
              rows={8}
              className="w-full rounded-xl border border-white/10 bg-slate-deep px-4 py-3 text-sm text-text-crisp font-mono focus:outline-none focus:ring-2 focus:ring-cyber-violet"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-text-crisp block mb-1">Tags</label>
            <input
              value={generated.tags.join(", ")}
              onChange={(e) => setGenerated({ ...generated, tags: e.target.value.split(",").map((t) => t.trim()) })}
              className="w-full rounded-xl border border-white/10 bg-slate-deep px-4 py-3 text-sm text-text-crisp focus:outline-none focus:ring-2 focus:ring-cyber-violet"
            />
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="rounded-xl border border-white/20 px-6 py-3 text-sm text-text-crisp hover:bg-white/10">
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex-1 rounded-xl bg-radiant-emerald py-3 text-sm font-semibold text-white transition-all hover:bg-radiant-emerald/90 disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Asset"}
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="rounded-2xl border border-white/10 bg-dark-card/30 p-8 text-center">
          <p className="text-radiant-emerald text-lg font-semibold">Asset created successfully!</p>
        </div>
      )}
    </div>
  );
}
