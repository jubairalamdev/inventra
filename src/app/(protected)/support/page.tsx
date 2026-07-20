"use client";

import { useState } from "react";
import { toast } from "react-toastify";

const initialTickets = [
  { id: "TKT-001", subject: "Deployment failing on custom model", status: "Open", date: "2h ago", priority: "High" },
  { id: "TKT-002", subject: "API rate limit too restrictive", status: "In Progress", date: "1d ago", priority: "Medium" },
  { id: "TKT-003", subject: "Billing inquiry for Enterprise plan", status: "Resolved", date: "3d ago", priority: "Low" },
];

export default function SupportPage() {
  const [tickets, setTickets] = useState(initialTickets);
  const [showForm, setShowForm] = useState(false);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    const newTicket = {
      id: `TKT-${String(tickets.length + 1).padStart(3, "0")}`,
      subject,
      status: "Open",
      date: "Just now",
      priority: "Medium",
    };
    setTickets([newTicket, ...tickets]);
    setSubject("");
    setDescription("");
    setShowForm(false);
    toast.success("Ticket created");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-crisp">Support Desk</h1>
          <p className="text-text-muted mt-1">Submit and track support tickets</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-xl bg-cyber-violet px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-cyber-violet/90"
        >
          {showForm ? "Cancel" : "New Ticket"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-dark-card/30 p-6 mb-8 space-y-4">
          <div>
            <label className="text-sm font-medium text-text-crisp block mb-1">Subject</label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Brief description of the issue"
              className="w-full rounded-xl border border-white/10 bg-slate-deep px-4 py-3 text-sm text-text-crisp placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-cyber-violet"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-text-crisp block mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              placeholder="Detailed explanation..."
              className="w-full rounded-xl border border-white/10 bg-slate-deep px-4 py-3 text-sm text-text-crisp placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-cyber-violet"
            />
          </div>
          <button type="submit" className="rounded-xl bg-radiant-emerald px-6 py-2.5 text-sm font-semibold text-white hover:bg-radiant-emerald/90">
            Submit Ticket
          </button>
        </form>
      )}

      <div className="rounded-2xl border border-white/10 bg-dark-card/30 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 text-left text-sm text-text-muted">
              <th className="px-6 py-4 font-medium">ID</th>
              <th className="px-6 py-4 font-medium">Subject</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Priority</th>
              <th className="px-6 py-4 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t.id} className="border-b border-white/5 text-sm text-text-crisp hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-mono text-xs text-text-muted">{t.id}</td>
                <td className="px-6 py-4 font-medium">{t.subject}</td>
                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-0.5 text-xs font-medium ${
                      t.status === "Open"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : t.status === "In Progress"
                          ? "bg-cyber-violet/20 text-cyber-violet"
                          : "bg-radiant-emerald/20 text-radiant-emerald"
                    }`}
                  >
                    {t.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-0.5 text-xs ${
                      t.priority === "High"
                        ? "bg-red-500/20 text-red-400"
                        : t.priority === "Medium"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-white/10 text-text-muted"
                    }`}
                  >
                    {t.priority}
                  </span>
                </td>
                <td className="px-6 py-4 text-text-muted">{t.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
