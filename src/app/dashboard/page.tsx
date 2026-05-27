"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AreaChartComponent } from "@/components/charts/analytics-charts";
import { mockAnalyticsSnapshots, mockPosts, mockRecommendations } from "@/lib/mock-data";
import { formatNumber, formatPercent } from "@/lib/utils";
import {
  Users,
  Eye,
  MousePointerClick,
  TrendingUp,
  Clock,
  Hash,
  BarChart3,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";

const latest = mockAnalyticsSnapshots[mockAnalyticsSnapshots.length - 1];

const statCards = [
  { label: "Total Followers", value: formatNumber(latest.followers), change: `+${latest.followersGain}`, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Engagement Rate", value: formatPercent(latest.engagement), change: "+0.3%", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
  { label: "Total Reach", value: formatNumber(latest.reach), change: "+12%", icon: Eye, color: "text-purple-600", bg: "bg-purple-50" },
  { label: "Total Clicks", value: formatNumber(latest.clicks), change: "+8%", icon: MousePointerClick, color: "text-orange-600", bg: "bg-orange-50" },
];

const recommendationIcons: Record<string, React.ElementType> = {
  clock: Clock,
  trending: BarChart3,
  hash: Hash,
  users: Users,
  alert: Lightbulb,
};

const chartData = mockAnalyticsSnapshots.map((s) => ({
  date: new Date(s.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
  followers: s.followers,
  engagement: s.engagement,
  reach: s.reach,
  impressions: s.impressions,
}));

export default function DashboardPage() {
  const topPosts = mockPosts
    .filter((p) => p.analytics)
    .sort((a, b) => (b.analytics?.impressions ?? 0) - (a.analytics?.impressions ?? 0))
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Your LinkedIn performance overview</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{s.label}</p>
                  <p className="mt-1 text-2xl font-bold text-gray-900">{s.value}</p>
                  <p className="mt-1 text-xs font-medium text-green-600">{s.change} this week</p>
                </div>
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${s.bg}`}>
                  <s.icon className={`h-5 w-5 ${s.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Follower Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <AreaChartComponent data={chartData} dataKey="followers" xKey="date" color="#3b82f6" height={250} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Engagement Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <AreaChartComponent data={chartData} dataKey="engagement" xKey="date" color="#10b981" height={250} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Top Performing Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between rounded-lg border border-gray-100 p-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">{post.title}</p>
                    <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                      <span>{formatNumber(post.analytics!.impressions)} impressions</span>
                      <span>{formatNumber(post.analytics!.reactions)} reactions</span>
                      <span>{formatPercent(post.analytics!.engagement)} engagement</span>
                    </div>
                  </div>
                  <Badge variant="success">Published</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockRecommendations.slice(0, 3).map((rec, i) => {
                const Icon = recommendationIcons[rec.icon] || Lightbulb;
                return (
                  <div key={i} className="rounded-lg border border-gray-100 p-3">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-blue-600" />
                      <p className="text-sm font-medium text-gray-900">{rec.title}</p>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">{rec.description}</p>
                  </div>
                );
              })}
              <Link href="/dashboard/analytics" className="block text-center text-sm font-medium text-blue-600 hover:text-blue-700">
                View all insights
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
