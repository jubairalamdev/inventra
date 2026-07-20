"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useSession } from "@/lib/auth-client";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function SupportPage() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const token = session?.session?.token;
  const [showForm, setShowForm] = useState(false);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["support-tickets"],
    queryFn: async () => {
      const res = await fetch(`${API}/support/tickets`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch tickets");
      return res.json() as Promise<{ tickets: any[] }>;
    },
    enabled: !!token,
  });

  const createTicket = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${API}/support/tickets`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ subject, description }),
      });
      if (!res.ok) throw new Error("Failed to create ticket");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["support-tickets"] });
      toast.success("Ticket created");
      setSubject("");
      setDescription("");
      setShowForm(false);
    },
    onError: () => toast.error("Failed to create ticket"),
  });

  if (!session) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-text-primary mb-4">Support</h1>
        <p className="text-text-muted">Please log in to access support.</p>
      </div>
    );
  }

  const tickets = data?.tickets || [];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Support Desk</h1>
          <p className="text-text-muted mt-1">Submit and track support tickets</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="rounded-xl bg-gaming-purple px-6 py-2.5 text-sm font-semibold text-white hover:bg-gaming-purple/90">
          {showForm ? "Cancel" : "New Ticket"}
        </button>
      </div>

      {showForm && (
        <div className="rounded-xl border border-border-light bg-white p-6 mb-8 space-y-4">
          <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject"
            className="w-full rounded-lg border border-border-light px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gaming-purple" />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="Describe your issue..."
            className="w-full rounded-lg border border-border-light px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gaming-purple" />
          <button onClick={() => createTicket.mutate()} disabled={createTicket.isPending || !subject || !description}
            className="rounded-xl bg-gaming-purple px-6 py-2.5 text-sm font-semibold text-white hover:bg-gaming-purple/90 disabled:opacity-50">
            {createTicket.isPending ? "Submitting..." : "Submit Ticket"}
          </button>
        </div>
      )}

      <div className="rounded-xl border border-border-light bg-white overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-light text-left text-sm text-text-muted">
              <th className="px-5 py-3 font-medium">Subject</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Priority</th>
              <th className="px-5 py-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length === 0 ? (
              <tr><td colSpan={4} className="px-5 py-10 text-center text-text-muted text-sm">No tickets yet.</td></tr>
            ) : tickets.map((t: any) => (
              <tr key={t._id} className="border-b border-border-light text-sm text-text-primary hover:bg-gray-50">
                <td className="px-5 py-4 font-medium">{t.subject}</td>
                <td className="px-5 py-4">
                  <span className="rounded-full bg-gaming-purple/10 px-2.5 py-0.5 text-xs text-gaming-purple">{t.status}</span>
                </td>
                <td className="px-5 py-4 text-text-muted">{t.priority}</td>
                <td className="px-5 py-4 text-text-muted">{new Date(t.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
