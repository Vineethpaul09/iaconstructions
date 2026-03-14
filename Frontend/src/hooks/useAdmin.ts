import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import type {
  ProjectRow,
  LeadRow,
  ContactMessageRow,
  NewsletterSubscriberRow,
  SiteSettingRow,
  TestimonialRow,
} from "@/types/supabase";

/* ── Admin Projects CRUD ────────────────────────────────────── */

export function useAdminProjects() {
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setProjects(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const createProject = async (
    project: Omit<ProjectRow, "id" | "created_at" | "updated_at">,
  ) => {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase
      .from("projects")
      .insert(project)
      .select()
      .single();
    if (error) throw error;
    await fetchProjects();
    return data;
  };

  const updateProject = async (id: string, updates: Partial<ProjectRow>) => {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase
      .from("projects")
      .update(updates)
      .eq("id", id);
    if (error) throw error;
    await fetchProjects();
  };

  const deleteProject = async (id: string) => {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) throw error;
    await fetchProjects();
  };

  const getProject = async (id: string): Promise<ProjectRow | null> => {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();
    if (error) return null;
    return data;
  };

  return {
    projects,
    loading,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
    getProject,
  };
}

/* ── Admin Leads (read-only) ────────────────────────────────── */

export function useAdminLeads() {
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setLeads(data);
        setLoading(false);
      });
  }, []);

  const deleteLead = async (id: string) => {
    if (!supabase) return;
    await supabase.from("leads").delete().eq("id", id);
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  return { leads, loading, deleteLead };
}

/* ── Admin Contact Messages (read-only) ─────────────────────── */

export function useAdminContacts() {
  const [contacts, setContacts] = useState<ContactMessageRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setContacts(data);
        setLoading(false);
      });
  }, []);

  const deleteContact = async (id: string) => {
    if (!supabase) return;
    await supabase.from("contact_messages").delete().eq("id", id);
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  return { contacts, loading, deleteContact };
}

/* ── Admin Newsletter Subscribers (read-only) ───────────────── */

export function useAdminSubscribers() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriberRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    supabase
      .from("newsletter_subscribers")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setSubscribers(data);
        setLoading(false);
      });
  }, []);

  const deleteSubscriber = async (id: string) => {
    if (!supabase) return;
    await supabase.from("newsletter_subscribers").delete().eq("id", id);
    setSubscribers((prev) => prev.filter((s) => s.id !== id));
  };

  return { subscribers, loading, deleteSubscriber };
}

/* ── Admin Site Settings ────────────────────────────────────── */

export function useAdminSettings() {
  const [settings, setSettings] = useState<
    Record<string, Record<string, unknown>>
  >({});
  const [loading, setLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    const { data } = await supabase.from("site_settings").select("*");
    if (data) {
      const mapped: Record<string, Record<string, unknown>> = {};
      for (const row of data as SiteSettingRow[]) {
        mapped[row.key] = row.value;
      }
      setSettings(mapped);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const updateSetting = async (key: string, value: Record<string, unknown>) => {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase
      .from("site_settings")
      .upsert({ key, value }, { onConflict: "key" });
    if (error) throw error;
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return { settings, loading, fetchSettings, updateSetting };
}

/* ── Admin Dashboard Stats ──────────────────────────────────── */

export function useAdminStats() {
  const [stats, setStats] = useState({
    projects: 0,
    leads: 0,
    contacts: 0,
    subscribers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    Promise.all([
      supabase.from("projects").select("id", { count: "exact", head: true }),
      supabase.from("leads").select("id", { count: "exact", head: true }),
      supabase
        .from("contact_messages")
        .select("id", { count: "exact", head: true }),
      supabase
        .from("newsletter_subscribers")
        .select("id", { count: "exact", head: true }),
    ]).then(([p, l, c, n]) => {
      setStats({
        projects: p.count ?? 0,
        leads: l.count ?? 0,
        contacts: c.count ?? 0,
        subscribers: n.count ?? 0,
      });
      setLoading(false);
    });
  }, []);

  return { stats, loading };
}

/* ── Admin Testimonials CRUD ────────────────────────────────── */

export function useAdminTestimonials() {
  const [testimonials, setTestimonials] = useState<TestimonialRow[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTestimonials = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setTestimonials(data as TestimonialRow[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const createTestimonial = async (
    testimonial: Omit<TestimonialRow, "id" | "created_at" | "updated_at">,
  ) => {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.from("testimonials").insert(testimonial);
    if (error) throw error;
    await fetchTestimonials();
  };

  const updateTestimonial = async (
    id: string,
    updates: Partial<TestimonialRow>,
  ) => {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase
      .from("testimonials")
      .update(updates)
      .eq("id", id);
    if (error) throw error;
    await fetchTestimonials();
  };

  const deleteTestimonial = async (id: string) => {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) throw error;
    await fetchTestimonials();
  };

  return {
    testimonials,
    loading,
    fetchTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
  };
}
