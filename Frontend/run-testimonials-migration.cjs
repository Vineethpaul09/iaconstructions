// Run: node run-testimonials-migration.cjs
const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = "https://gbbnrheyuoqnakvwdusm.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdiYm5yaGV5dW9xbmFrdndkdXNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyNjE4MzAsImV4cCI6MjA4ODgzNzgzMH0.IJVQO_uc7mDjE4_loZI-AKjjqMbNlrktxFcH-OkQ_9M";

async function main() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // Sign in as admin
  const { error: authErr } = await supabase.auth.signInWithPassword({
    email: "admin@iaconstructions.in",
    password: "IAconst@2024!",
  });
  if (authErr) {
    console.error("Auth failed:", authErr.message);
    process.exit(1);
  }
  console.log("Authenticated as admin");

  // Try creating the table via rpc or direct SQL
  // Since we can't run raw SQL from the client SDK, we'll create via the REST API
  // Instead, let's just test if the table exists, and if not, create it through inserts

  // First, try to query the table
  const { error: queryErr } = await supabase
    .from("testimonials")
    .select("id")
    .limit(1);

  if (queryErr && queryErr.message.includes("does not exist")) {
    console.log("Table 'testimonials' does not exist yet.");
    console.log("Please run the following SQL in the Supabase SQL Editor:");
    console.log("---");
    const fs = require("fs");
    const sql = fs.readFileSync(
      require("path").join(__dirname, "src/migrations/create-testimonials.sql"),
      "utf8",
    );
    console.log(sql);
    console.log("---");
    console.log("After running the SQL, re-run this script to seed data.");
    process.exit(0);
  } else if (queryErr) {
    console.error("Query error:", queryErr.message);
    process.exit(1);
  }

  console.log("Table 'testimonials' exists!");

  // Seed with existing testimonials data (as approved, source=admin)
  const testimonials = [
    {
      name: "Dr. Anitha Menon",
      designation: "Surgeon, Amrita Hospital",
      rating: 5,
      comment:
        "We purchased a villa at IAC Serenity in Bandlaguda Jagir and the entire experience was seamless. From the first site visit to the registration, the IAC team was transparent and supportive. The construction quality is outstanding — Italian marble, Kohler fittings, everything as promised.",
      project: "IAC Serenity Villa",
      status: "approved",
      source: "admin",
    },
    {
      name: "Rajesh Kulkarni",
      designation: "IT Manager, Infosys",
      rating: 5,
      comment:
        "Being an IT professional in HITEC City, location was everything for me. IAC Skyline in Mehdipatnam is perfectly situated — 15 minutes to office with zero highway hassle. The 3 BHK layout is very practical, and the clubhouse amenities rival five-star resorts.",
      project: "IAC Skyline Residences",
      status: "approved",
      source: "admin",
    },
    {
      name: "Smt. Priya Dash",
      designation: "Retired School Principal",
      rating: 4,
      comment:
        "After retirement, my husband and I wanted a peaceful home near nature. IAC Shamshabad Greens near Hyderabad was the perfect answer. The gated community is safe, the neighbours are wonderful, and the morning walks along the jogging track with garden views are priceless.",
      project: "IAC Shamshabad Greens",
      status: "approved",
      source: "admin",
    },
    {
      name: "Mohammed Irfan Sheikh",
      designation: "Chartered Accountant",
      rating: 5,
      comment:
        "I invested in a commercial space at IAC Business Hub in HITEC City for my CA practice. The building infrastructure is truly Grade A — centralized AC, high-speed lifts, and excellent façade. The IAC team even helped me with loan processing through their consulting arm.",
      project: "IAC Business Hub",
      status: "approved",
      source: "admin",
    },
    {
      name: "Deepika Nair",
      designation: "NRI, Software Engineer (Dubai)",
      rating: 5,
      comment:
        "Buying property from overseas is always nerve-wracking, but IAC's NRI desk made it effortless. Video calls for site visits, digital documentation, and power-of-attorney support — everything was handled professionally. My penthouse at IAC Horizon in Jubilee Hills is my dream retirement home.",
      project: "IAC Horizon Penthouse",
      status: "approved",
      source: "admin",
    },
  ];

  // Check if already seeded
  const { data: existing } = await supabase
    .from("testimonials")
    .select("id")
    .limit(1);

  if (existing && existing.length > 0) {
    console.log("Testimonials already seeded. Skipping.");
  } else {
    const { error: insertErr } = await supabase
      .from("testimonials")
      .insert(testimonials);
    if (insertErr) {
      console.error("Seed failed:", insertErr.message);
    } else {
      console.log(`Seeded ${testimonials.length} testimonials.`);
    }
  }

  process.exit(0);
}

main();
