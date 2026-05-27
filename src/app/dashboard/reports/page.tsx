"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileDown,
  FileSpreadsheet,
  FileText,
  Calendar,
  BarChart3,
  Users,
  Megaphone,
  TrendingUp,
  Download,
} from "lucide-react";

const reports = [
  {
    id: 1,
    title: "Content Calendar Report",
    description: "Full export of scheduled, published, and draft posts with dates and performance",
    icon: Calendar,
    formats: ["Excel", "PDF"],
    category: "Content",
  },
  {
    id: 2,
    title: "Analytics Overview",
    description: "Follower growth, engagement rates, impressions, clicks, and reach over time",
    icon: BarChart3,
    formats: ["Excel", "PDF"],
    category: "Analytics",
  },
  {
    id: 3,
    title: "Follower Growth Report",
    description: "Daily follower count, gain/loss, and growth rate with trend analysis",
    icon: Users,
    formats: ["Excel", "PDF"],
    category: "Analytics",
  },
  {
    id: 4,
    title: "Ad Campaign Performance",
    description: "Campaign spend, impressions, clicks, CTR, CPC, CPM, conversions, and leads",
    icon: Megaphone,
    formats: ["Excel", "PDF"],
    category: "Ads",
  },
  {
    id: 5,
    title: "Top Performing Posts",
    description: "Ranked list of posts by engagement, reach, and impressions with content details",
    icon: TrendingUp,
    formats: ["Excel", "PDF"],
    category: "Content",
  },
  {
    id: 6,
    title: "Complete Dashboard Export",
    description: "All analytics, content, and ad data in a single comprehensive report",
    icon: FileDown,
    formats: ["Excel", "PDF"],
    category: "All",
  },
];

const recentExports = [
  { name: "Analytics_May2026.xlsx", date: "May 25, 2026", size: "245 KB" },
  { name: "Campaign_Q2.pdf", date: "May 20, 2026", size: "1.2 MB" },
  { name: "ContentCalendar_May.xlsx", date: "May 15, 2026", size: "128 KB" },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="text-sm text-gray-500 mt-1">Download analytics, content, and ad performance reports</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <Card key={report.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                  <report.icon className="h-5 w-5 text-blue-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-gray-900">{report.title}</h3>
                  <p className="mt-1 text-xs text-gray-500 line-clamp-2">{report.description}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <Badge variant="default">{report.category}</Badge>
                    <div className="ml-auto flex gap-1.5">
                      {report.formats.map((fmt) => (
                        <Button key={fmt} variant="outline" size="sm" className="h-7 text-xs">
                          {fmt === "Excel" ? <FileSpreadsheet className="h-3 w-3" /> : <FileText className="h-3 w-3" />}
                          {fmt}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Exports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentExports.map((exp) => (
              <div key={exp.name} className="flex items-center justify-between rounded-lg border border-gray-100 p-3">
                <div className="flex items-center gap-3">
                  {exp.name.endsWith(".xlsx") ? (
                    <FileSpreadsheet className="h-5 w-5 text-green-600" />
                  ) : (
                    <FileText className="h-5 w-5 text-red-500" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{exp.name}</p>
                    <p className="text-xs text-gray-500">{exp.date} · {exp.size}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
