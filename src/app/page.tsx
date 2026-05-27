import Link from "next/link";
import { BarChart3, Calendar, Sparkles, Megaphone, ArrowRight } from "lucide-react";

const features = [
  { icon: Sparkles, title: "AI Content Studio", desc: "Generate LinkedIn posts, hashtags, keywords, and media with AI" },
  { icon: Calendar, title: "Smart Scheduling", desc: "Schedule with best-time recommendations and recurring options" },
  { icon: BarChart3, title: "Deep Analytics", desc: "Track followers, engagement, reach, and content performance" },
  { icon: Megaphone, title: "Ads Dashboard", desc: "Manage campaigns, targeting, budgets, and track ROI" },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm">
              LP
            </div>
            <span className="text-xl font-bold text-gray-900">LinkedPro</span>
          </div>
          <Link
            href="/dashboard"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </header>

      <main className="flex-1 bg-gray-50">
        <section className="mx-auto max-w-7xl px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700 mb-6">
            <Sparkles className="h-4 w-4" />
            AI-Powered LinkedIn Growth
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Grow Your LinkedIn
            <br />
            <span className="text-blue-600">With AI Automation</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Create AI-generated content, schedule posts, track analytics, and manage ad campaigns — all from one powerful dashboard.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700 transition-colors"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-24">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                  <f.icon className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-base font-semibold text-gray-900">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
