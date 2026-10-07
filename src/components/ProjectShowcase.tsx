"use client";

import * as React from "react";
import {
  usePortfolioStore,
  type ProjectItem,
  type ProjectCategory,
} from "@/store/usePortfolioStore";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bookmark, BookmarkCheck, ExternalLink, GitBranch, Search, Filter } from "lucide-react";

const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: "otakufy",
    title: "Otakufy",
    description:
      "Interactive Japanese vocabulary & anime song learning platform with Kuroshiro tokenizer, SRS practice modes, and seasonal visual themes.",
    category: "fullstack",
    techStack: ["Next.js", "React 19", "Supabase", "Tailwind CSS", "Kuroshiro"],
    githubUrl: "https://github.com/NotCatfish/Otakufy",
    liveUrl: "https://otakufy-lake.vercel.app",
    metrics: "10,000+ words parsed • 60fps canvas animations",
  },
  {
    id: "spotify-pipeline",
    title: "Spotify Analytics Pipeline",
    description:
      "Headless Spotify listening synchronization, zero-leakage causal session replay, and automated shadow ML evaluation using serverless GitHub Actions cron.",
    category: "systems",
    techStack: ["Python", "Pandas", "PostgreSQL", "GitHub Actions", "DuckDB"],
    githubUrl: "https://github.com/NotCatfish/Spotify-Analytics-Pipeline",
    metrics: "24/7 autonomous cron sync • O(1) memory generators",
  },
  {
    id: "portfolio",
    title: "Personal Portfolio & Work Showcase",
    description:
      "Modern portfolio showcasing full-stack engineering, performance audits, and system architecture blueprints.",
    category: "fullstack",
    techStack: ["Vite", "React 19", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/NotCatfish/portfolio",
    liveUrl: "https://indraneelsamanta.vercel.app",
    metrics: "100 Lighthouse Performance • Fast hydration",
  },
  {
    id: "neetcode",
    title: "NeetCode Algorithmic Engine",
    description:
      "Comprehensive repository of optimal algorithmic solutions, dynamic programming patterns, and graph theory problem breakdowns.",
    category: "ml",
    techStack: ["Python", "Data Structures", "Algorithms", "AST Analysis"],
    githubUrl: "https://github.com/NotCatfish/neetcode-submissions",
    metrics: "150+ LeetCode problems verified with O(N) proofs",
  },
];

export function ProjectShowcase() {
  const [mounted, setMounted] = React.useState(false);

  const selectedCategory = usePortfolioStore((s) => s.selectedCategory);
  const searchQuery = usePortfolioStore((s) => s.searchQuery);
  const bookmarkedIds = usePortfolioStore((s) => s.bookmarkedProjectIds);
  const setCategory = usePortfolioStore((s) => s.setCategory);
  const setSearchQuery = usePortfolioStore((s) => s.setSearchQuery);
  const toggleBookmark = usePortfolioStore((s) => s.toggleBookmark);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const filteredProjects = React.useMemo(() => {
    return INITIAL_PROJECTS.filter((proj) => {
      const matchesCategory =
        selectedCategory === "all" || proj.category === selectedCategory;
      const matchesSearch =
        proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.techStack.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const categories: { label: string; value: ProjectCategory }[] = [
    { label: "All Projects", value: "all" },
    { label: "Full-Stack", value: "fullstack" },
    { label: "Systems & Data", value: "systems" },
    { label: "ML & Algorithms", value: "ml" },
  ];

  return (
    <div className="space-y-6">
      {/* Search and Category Control Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center glass-panel p-4 rounded-xl">
        <div className="flex flex-wrap gap-1.5 items-center">
          <Filter className="w-4 h-4 text-zinc-400 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                selectedCategory === cat.value
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stack or title..."
              className="pl-9 h-9 text-xs"
            />
          </div>
          {mounted && (
            <Badge variant="accent" className="h-9 px-3 gap-1 whitespace-nowrap">
              <BookmarkCheck className="w-3.5 h-3.5" />
              <span>{bookmarkedIds.length} Saved</span>
            </Badge>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => {
          const isSaved = mounted && bookmarkedIds.includes(project.id);

          return (
            <Card
              key={project.id}
              className="flex flex-col justify-between hover:border-indigo-500/50 transition-all hover:shadow-lg group"
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {project.title}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleBookmark(project.id)}
                    className="h-8 w-8 text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                    title={isSaved ? "Remove from bookmarks" : "Save project"}
                    aria-label={`Toggle save for ${project.title}`}
                  >
                    {isSaved ? (
                      <BookmarkCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <CardDescription className="pt-2">{project.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="text-xs font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1.5 rounded-md border border-indigo-200 dark:border-indigo-900/50">
                  ⚡ {project.metrics}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-[11px]">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="flex justify-between gap-2">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 font-medium"
                >
                  <GitBranch className="w-3.5 h-3.5" />
                  Source Repo
                </a>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                  >
                    Live Demo
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
