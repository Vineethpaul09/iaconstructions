import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, MapPin, Home, Loader2, Phone } from "lucide-react";
import { usePageSEO } from "@/hooks/usePageSEO";
import { SITE, siteUrl } from "@/config/site";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useProjects } from "@/hooks/useSupabase";
import LeadCaptureModal from "@/components/lead/LeadCaptureModal";
import type { Project } from "@/types";

/* ── Animation helpers ─────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
} as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ── Status styles ─────────────────────────────────────────────────── */

const statusBadgeStyles: Record<string, string> = {
  ongoing: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  completed: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  upcoming: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

/* ── Project card display data ─────────────────────────────────────── */

interface ProjectCard {
  id: string;
  title: string;
  slug: string;
  location: string;
  image: string;
  status: string;
  price: number;
  types: string[];
}

function toProjectCards(projects: Project[]): ProjectCard[] {
  return projects.map((p) => ({
    id: p.id,
    title: p.name,
    slug: p.slug,
    location: p.location,
    image: p.images[0] ?? "",
    status: p.status,
    price: p.price,
    types: [p.type],
  }));
}

/* ── Project Card ──────────────────────────────────────────────────── */

function ProjectCardItem({
  project,
  onEnquire,
}: {
  project: ProjectCard;
  onEnquire: (id: string) => void;
}) {
  return (
    <motion.div variants={fadeUp}>
      <div>
        <Card className="bg-[#0f2847]/60 border-[#1a3a5c] hover:border-[#C9A227]/30 transition-all group overflow-hidden h-full">
          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={project.image}
              alt={`${project.title} — ${project.status} project in ${project.location} by iA Constructions`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              width={600}
              height={375}
              loading="lazy"
              decoding="async"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://placehold.co/600x375/0B1F3A/C9A227?text=Project";
              }}
            />
            <Badge
              className={cn(
                "absolute top-3 left-3 border capitalize",
                statusBadgeStyles[project.status] ?? statusBadgeStyles.ongoing,
              )}
            >
              {project.status}
            </Badge>
          </div>

          <CardContent className="p-5 space-y-3">
            <h3 className="text-white font-semibold text-lg line-clamp-1 group-hover:text-[#C9A227] transition-colors">
              {project.title}
            </h3>

            <div className="flex items-center gap-1.5 text-[#e4e4e7] text-sm">
              <MapPin className="h-3.5 w-3.5 text-[#C9A227]" />
              {project.location}
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1.5 text-[#e4e4e7]">
                <Home className="h-3.5 w-3.5 text-[#C9A227]" />
                <span className="capitalize">{project.types.join(", ")}</span>
              </div>
              <span className="text-[#C9A227] font-semibold">
                {formatPrice(project.price)}
              </span>
            </div>

            <Button
              size="sm"
              onClick={() => onEnquire(project.id)}
              className="w-full bg-[#C9A227] hover:bg-[#a8861e] text-[#0B1F3A] font-semibold mt-1"
            >
              <Phone className="h-3.5 w-3.5 mr-1.5" />
              Enquire Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}

/* ── Component ─────────────────────────────────────────────────────── */

export default function ProjectsPage() {
  const projectsJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `Real Estate Projects | ${SITE.name}`,
      url: siteUrl("/projects"),
      description: `Portfolio of premium residential and commercial real estate projects by ${SITE.name} in ${SITE.address.city}.`,
      isPartOf: {
        "@type": "WebSite",
        name: SITE.name,
        url: SITE.url,
      },
    }),
    [],
  );

  usePageSEO({
    title: "Our Projects — Apartments, Villas & More",
    description: `Explore ${SITE.name}' portfolio of ongoing, completed & upcoming residential and commercial projects in ${SITE.address.city}. RERA approved.`,
    canonical: siteUrl("/projects"),
    ogImageAlt: `Premium real estate projects in ${SITE.address.city} by ${SITE.name}`,
    jsonLd: projectsJsonLd,
    keywords:
      "ongoing projects Hyderabad, completed projects Hyderabad, upcoming apartments Hyderabad, new residential projects Kukatpally, RERA approved projects Telangana, gated community projects Hyderabad, under construction flats Hyderabad, luxury apartment projects KPHB",
  });

  const [activeTab, setActiveTab] = useState("all");
  const { projects, loading } = useProjects();
  const [leadOpen, setLeadOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<
    string | undefined
  >();

  const handleEnquire = (projectId: string) => {
    setSelectedProjectId(projectId);
    setLeadOpen(true);
  };

  const allProjectCards = useMemo(() => toProjectCards(projects), [projects]);

  const filteredProjects = useMemo(() => {
    if (activeTab === "all") return allProjectCards;
    return allProjectCards.filter((p) => p.status === activeTab);
  }, [activeTab, allProjectCards]);

  const tabCounts = useMemo(() => {
    return {
      all: allProjectCards.length,
      ongoing: allProjectCards.filter((p) => p.status === "ongoing").length,
      completed: allProjectCards.filter((p) => p.status === "completed").length,
      upcoming: allProjectCards.filter((p) => p.status === "upcoming").length,
    };
  }, [allProjectCards]);

  return (
    <main className="min-h-screen bg-[#0B1F3A] text-white">
      {/* ── Hero Banner ──────────────────────────────────────────── */}
      <section className="relative pt-10 pb-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0f2847] to-[#0B1F3A]">
        <div className="max-w-7xl mx-auto">
          <motion.nav
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-2 text-sm text-[#7a8fa6] mb-6"
          >
            <Link to="/" className="hover:text-[#C9A227] transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#C9A227]">Projects</span>
          </motion.nav>

          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              Our <span className="text-[#C9A227]">Projects</span>
            </h1>
            <p className="text-[#e4e4e7] max-w-2xl text-lg">
              From ongoing developments to completed landmarks — explore our
              portfolio of premium real estate projects in and around Hyderabad.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Tabs + Grid ──────────────────────────────────────────── */}
      <section className="py-5 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 text-[#C9A227] animate-spin" />
          </div>
        ) : (
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-10"
            >
              <TabsList className="bg-[#0f2847] border border-[#1a3a5c] p-1 flex-wrap h-auto gap-1">
                {(
                  [
                    ["all", "All"],
                    ["ongoing", "Ongoing"],
                    ["completed", "Completed"],
                    ["upcoming", "Upcoming"],
                  ] as const
                ).map(([value, label]) => (
                  <TabsTrigger
                    key={value}
                    value={value}
                    className="data-[state=active]:bg-[#C9A227]/20 data-[state=active]:text-[#C9A227] text-[#e4e4e7]"
                  >
                    {label}
                    <span className="ml-1.5 px-1.5 py-0.5 rounded text-[10px] bg-[#122d4d] text-[#7a8fa6]">
                      {tabCounts[value]}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </motion.div>

            {/* Content for each tab (we use a single TabsContent since filter is state-driven) */}
            {(["all", "ongoing", "completed", "upcoming"] as const).map(
              (tab) => (
                <TabsContent key={tab} value={tab}>
                  {filteredProjects.length === 0 ? (
                    <div className="text-center py-20">
                      <p className="text-[#7a8fa6] text-lg">
                        No {tab === "all" ? "" : tab} projects found.
                      </p>
                    </div>
                  ) : (
                    <motion.div
                      variants={stagger}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                      {filteredProjects.map((project) => (
                        <ProjectCardItem
                          key={project.id}
                          project={project}
                          onEnquire={handleEnquire}
                        />
                      ))}
                    </motion.div>
                  )}
                </TabsContent>
              ),
            )}
          </Tabs>
        )}
      </section>

      <LeadCaptureModal
        open={leadOpen}
        onOpenChange={setLeadOpen}
        propertyId={selectedProjectId}
      />
    </main>
  );
}
