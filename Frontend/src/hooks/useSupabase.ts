import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { Project } from "@/types";
import type { ProjectRow, TestimonialRow } from "@/types/supabase";

/* ── Map Supabase row → frontend Project type ───────────────── */

function mapRowToProject(row: ProjectRow): Project {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    type: row.type as Project["type"],
    status: row.status as Project["status"],
    price: row.price,
    areaSqft: row.area_sqft,
    location: row.location,
    address: row.address,
    bedrooms: row.bedrooms,
    bathrooms: row.bathrooms,
    images: row.images ?? [],
    featured: row.featured,
    reraNumber: row.rera_number,
    possessionDate: row.possession_date,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/* ── Hook: Fetch all projects ───────────────────────────────── */

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    const client = supabase;

    const fetchProjects = async () => {
      try {
        const { data, error: fetchError } = await client
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false });

        if (fetchError) throw fetchError;

        setProjects(data ? data.map(mapRowToProject) : []);
      } catch (err) {
        console.warn("Supabase fetch failed:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch projects",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
}

/* ── Hook: Fetch site settings ──────────────────────────────── */

export function useSiteSettings() {
  const [settings, setSettings] = useState<
    Record<string, Record<string, unknown>>
  >({});
  const [loading, setLoading] = useState(!!supabase);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase
      .from("site_settings")
      .select("*")
      .then(({ data }) => {
        if (data) {
          const mapped: Record<string, Record<string, unknown>> = {};
          for (const row of data) {
            mapped[row.key] = row.value as Record<string, unknown>;
          }
          setSettings(mapped);
        }
        setLoading(false);
      });
  }, []);

  return { settings, loading };
}

/* ── Hook: Submit a contact message ─────────────────────────────── */

export function useSubmitContact() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitContact = async (data: {
    name: string;
    email: string;
    countryCode: string;
    phone: string;
    subject: string;
    message: string;
  }) => {
    if (!supabase) {
      // No Supabase — just pretend it worked
      return true;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: insertError } = await supabase
        .from("contact_messages")
        .insert({
          name: data.name,
          email: data.email,
          country_code: data.countryCode,
          phone: data.phone,
          subject: data.subject,
          message: data.message,
        });

      if (insertError) throw insertError;
      return true;
    } catch (err) {
      console.error("Failed to submit contact:", err);
      setError(err instanceof Error ? err.message : "Failed to submit");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { submitContact, loading, error };
}

/* ── Hook: Submit a lead ────────────────────────────────────────── */

export function useSubmitLead() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitLead = async (data: {
    name: string;
    email: string;
    countryCode: string;
    phone: string;
    intent: string;
    propertyType: string;
    location: string;
    budgetMin: number;
    budgetMax: number;
    propertyId?: string | null;
  }) => {
    if (!supabase) {
      return true;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: insertError } = await supabase.from("leads").insert({
        name: data.name,
        email: data.email,
        country_code: data.countryCode,
        phone: data.phone,
        intent: data.intent,
        property_type: data.propertyType,
        location: data.location,
        budget_min: data.budgetMin,
        budget_max: data.budgetMax,
        project_id: data.propertyId ?? null,
      });

      if (insertError) throw insertError;
      return true;
    } catch (err) {
      console.error("Failed to submit lead:", err);
      setError(err instanceof Error ? err.message : "Failed to submit");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { submitLead, loading, error };
}

/* ── Hook: Subscribe to newsletter ──────────────────────────────── */

export function useNewsletterSubscribe() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subscribe = async (email: string) => {
    if (!supabase) {
      return true;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: insertError } = await supabase
        .from("newsletter_subscribers")
        .insert({ email });

      if (insertError) throw insertError;
      return true;
    } catch (err) {
      console.error("Failed to subscribe:", err);
      setError(err instanceof Error ? err.message : "Failed to subscribe");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { subscribe, loading, error };
}

/* ── Hook: Fetch approved testimonials ──────────────────────────── */

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<TestimonialRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase
      .from("testimonials")
      .select("*")
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setTestimonials(data as TestimonialRow[]);
        setLoading(false);
      });
  }, []);

  return { testimonials, loading };
}

/* ── Hook: Submit a client story ────────────────────────────────── */

export function useSubmitTestimonial() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitTestimonial = async (data: {
    name: string;
    designation: string;
    rating: number;
    comment: string;
    project: string;
  }) => {
    if (!supabase) return true;

    setLoading(true);
    setError(null);

    try {
      const { error: insertError } = await supabase
        .from("testimonials")
        .insert({
          name: data.name,
          designation: data.designation,
          rating: data.rating,
          comment: data.comment,
          project: data.project,
          status: "pending",
          source: "client",
        });

      if (insertError) throw insertError;
      return true;
    } catch (err) {
      console.error("Failed to submit testimonial:", err);
      setError(err instanceof Error ? err.message : "Failed to submit");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { submitTestimonial, loading, error };
}
