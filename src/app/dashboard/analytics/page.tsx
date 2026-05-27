"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AreaChartComponent,
  BarChartComponent,
  LineChartComponent,
  PieChartComponent,
} from "@/components/charts/analytics-charts";
import { mockAnalyticsSnapshots, mockPosts, mockRecommendations } from "@/lib/mock-data";
import { formatNumber, formatPercent } from "@/lib/utils";
import {
  Users,
  Eye,
  MousePointerClick,
  TrendingUp,
  ThumbsUp,
  MessageSquare,
  Share2,
  Lightbulb,
  Clock,
  Hash,
  BarChart3,
} from "lucide-react";

const latest = mockAnalyticsSnapshots[mockAnalyticsSnapshots.length - 1];
const prev = mockAnalyticsSnapshots[mockAnalyticsSnapshots.length - 8];

function change(curr: number, prev: number) {
  const pct = ((curr - prev) / prev) * 100;
  return pct > 0 ? `+${pct.toFixed(1)}%` : `${pct.toFixed(1)}%`;
}

const stats = [
  { label: "Followers", value: formatNumber(latest.followers), change: change(latest.followers, prev.followers), icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Engagement", value: formatPercent(latest.engagement), change: change(latest.engagement, prev.engagement), icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
  { label: "Impressions", value: formatNumber(latest.impressions), change: change(latest.impressions, prev.impressions), icon: Eye, color: "text-purple-600", bg: "bg-purple-50" },
  { label: "Clicks", value: formatNumber(latest.clicks), change: change(latest.clicks, prev.clicks), icon: MousePointerClick, color: "text-orange-600", bg: "bg-orange-50" },
  { label: "Reactions", value: formatNumber(latest.reactions), change: change(latest.reactions, prev.reactions), icon: ThumbsUp, color: "text-pink-600", bg: "bg-pink-50" },
  { label: "Comments", value: formatNumber(latest.comments), change: change(latest.comments, prev.comments), icon: MessageSquare, color: "text-cyan-600", bg: "bg-cyan-50" },
];

const recommendationIcons: Record<string, React.ElementType> = {
  clock: Clock, trending: BarChart3, hash: Hash, users: Users, alert: Lightbulb,
};

export default function AnalyticsPage() {
  const [range, setRange] = useState("30");

  const data = mockAnalyticsSnapshots.slice(-parseInt(range)).map((s) => ({
    date: new Date(s.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    followers: s.followers,
    engagement: s.engagement,
    reach: s.reach,
    impressions: s.impressions,
    clicks: s.clicks,
    reactions: s.reactions,
    comments: s.comments,
    shares: s.shares,
  }));

  const contentTypeData = [
    { name: "Thought Leadership", value: 35 },
    { name: "Educational", value: 25 },
    { name: "Case Study", value: 15 },
    { name: "Hiring", value: 10 },
    { name: "Promotional", value: 15 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">Track your LinkedIn performance</p>
        </div>
        <div className="flex rounded-lg border border-gray-200 p-0.5">
          {[{ v: "7", l: "7D" }, { v: "14", l: "14D" }, { v: "30", l: "30D" }].map((r) => (
            <button
              key={r.v}
              onClick={() => setRange(r.v)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium ${range === r.v ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:text-gray-900"}`}
            >
              {r.l}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${s.bg}`}>
                  <s.icon className={`h-4 w-4 ${s.color}`} />
                </div>
                <div>
                  <p className="text-xs text-gray-500">{s.label}</p>
                  <p className="text-lg font-bold text-gray-900">{s.value}</p>
                  <p className={`text-xs font-medium ${s.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>{s.change}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Follower Growth</CardTitle></CardHeader>
          <CardContent>
            <AreaChartComponent data={data} dataKey="followers" xKey="date" color="#3b82f6" height={280} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Engagement Rate</CardTitle></CardHeader>
          <CardContent>
            <AreaChartComponent data={data} dataKey="engagement" xKey="date" color="#10b981" height={280} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Impressions & Reach</CardTitle></CardHeader>
          <CardContent>
            <BarChartComponent data={data} dataKey="impressions" xKey="date" color="#8b5cf6" height={280} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Click Trends</CardTitle></CardHeader>
          <CardContent>
            <LineChartComponent data={data} dataKey="clicks" xKey="date" color="#f59e0b" height={280} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>Content Type Distribution</CardTitle></CardHeader>
          <CardContent>
            <PieChartComponent data={contentTypeData} height={250} />
            <div className="mt-4 space-y-2">
              {contentTypeData.map((d, i) => (
                <div key={d.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"][i] }} />
                    <span className="text-gray-600">{d.name}</span>
                  </div>
                  <span className="font-medium text-gray-900">{d.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Best Performing Posts</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockPosts
                .filter((p) => p.analytics)
                .sort((a, b) => (b.analytics?.engagement ?? 0) - (a.analytics?.engagement ?? 0))
                .slice(0, 4)
                .map((post, i) => (
                  <div key={post.id} className="flex items-center gap-3 rounded-lg border border-gray-100 p-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-600">
                      #{i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">{post.title}</p>
                      <p className="text-xs text-gray-500">
                        {formatPercent(post.analytics!.engagement)} eng · {formatNumber(post.analytics!.impressions)} imp
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" /> AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockRecommendations.map((rec, i) => {
                const Icon = recommendationIcons[rec.icon] || Lightbulb;
                return (
                  <div key={i} className="rounded-lg border border-gray-100 p-3">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-blue-600 shrink-0" />
                      <p className="text-sm font-medium text-gray-900">{rec.title}</p>
                      <Badge variant={rec.priority === "high" ? "danger" : rec.priority === "medium" ? "warning" : "default"} className="ml-auto text-[10px]">
                        {rec.priority}
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs text-gray-500 pl-6">{rec.description}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
