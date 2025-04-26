// src/app/dashboard/email/subscribers/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Users } from "lucide-react";
import { sampleSubscribers } from "@/data/sampleSubscribers";

interface Subscriber {
  id: string;
  name: string;
  email: string;
  subscribedAt: string;
}

export default function SubscribersPage() {
  const [subs, setSubs] = useState<Subscriber[]>([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch subscribers, fall back to samples if empty or on error
  useEffect(() => {
    fetch("/api/subscribers")
      .then((res) => res.json())
      .then((data: Subscriber[]) => {
        setSubs(data.length ? data : sampleSubscribers);
        setLoading(false);
      })
      .catch(() => {
        setSubs(sampleSubscribers);
        setLoading(false);
      });
  }, []);

  // Add a new subscriber, then re-fetch (with fallback)
  const addSubscriber = async () => {
    if (!email || !name) return;
    await fetch("/api/subscribers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name }),
    });
    const updated = await fetch("/api/subscribers").then((res) => res.json());
    setSubs(updated.length ? updated : sampleSubscribers);
    setEmail("");
    setName("");
  };

  return (
    <div className="space-y-6">
      {/* Header & Add Form */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Subscribers</h1>
            <p className="text-muted-foreground mt-1">
              View and manage your mailing list.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm w-36"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm w-48"
          />
          <button
            onClick={addSubscriber}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-md inline-flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" /> Add
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search subscribers..."
          onChange={(e) => {
            const term = e.target.value.toLowerCase();
            setSubs((prev) =>
              prev.filter(
                (s) =>
                  s.name.toLowerCase().includes(term) ||
                  s.email.toLowerCase().includes(term)
              )
            );
          }}
          className="pl-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
      </div>

      {/* Loading or Table */}
      {loading ? (
        <div className="flex items-center justify-center h-32">
          <span className="text-muted-foreground">Loading subscribers…</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-card rounded-lg border shadow-sm">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-sm">Name</th>
                <th className="px-4 py-2 text-left text-sm">Email</th>
                <th className="px-4 py-2 text-left text-sm">Subscribed On</th>
              </tr>
            </thead>
            <tbody>
              {subs.map((s) => (
                <tr key={s.id} className="even:bg-muted/10">
                  <td className="px-4 py-2 text-sm">{s.name}</td>
                  <td className="px-4 py-2 text-sm">{s.email}</td>
                  <td className="px-4 py-2 text-sm">{s.subscribedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
