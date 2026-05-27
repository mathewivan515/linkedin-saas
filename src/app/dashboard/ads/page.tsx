"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChartComponent, LineChartComponent } from "@/components/charts/analytics-charts";
import { mockCampaigns } from "@/lib/mock-data";
import { formatNumber, formatCurrency, formatPercent } from "@/lib/utils";
import {
  Plus,
  DollarSign,
  Eye,
  MousePointerClick,
  TrendingUp,
  Target,
  Users,
  Pause,
  Play,
  BarChart3,
} from "lucide-react";

const totalSpend = mockCampaigns.reduce((a, c) => a + c.spend, 0);
const totalImpressions = mockCampaigns.reduce((a, c) => a + c.impressions, 0);
const totalClicks = mockCampaigns.reduce((a, c) => a + c.clicks, 0);
const totalConversions = mockCampaigns.reduce((a, c) => a + c.conversions, 0);
const totalLeads = mockCampaigns.reduce((a, c) => a + c.leads, 0);
const avgCtr = totalClicks / totalImpressions * 100;
const avgCpc = totalSpend / totalClicks;

const summaryCards = [
  { label: "Total Spend", value: formatCurrency(totalSpend), icon: DollarSign, color: "text-green-600", bg: "bg-green-50" },
  { label: "Impressions", value: formatNumber(totalImpressions), icon: Eye, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Clicks", value: formatNumber(totalClicks), icon: MousePointerClick, color: "text-purple-600", bg: "bg-purple-50" },
  { label: "Avg CTR", value: formatPercent(avgCtr), icon: TrendingUp, color: "text-orange-600", bg: "bg-orange-50" },
  { label: "Avg CPC", value: formatCurrency(avgCpc), icon: Target, color: "text-pink-600", bg: "bg-pink-50" },
  { label: "Total Leads", value: totalLeads.toString(), icon: Users, color: "text-cyan-600", bg: "bg-cyan-50" },
];

const statusVariant: Record<string, "success" | "warning" | "info" | "default"> = {
  active: "success",
  paused: "warning",
  completed: "info",
  draft: "default",
};

const spendData = Array.from({ length: 14 }, (_, i) => ({
  date: `Day ${i + 1}`,
  spend: Math.floor(Math.random() * 150) + 50,
  clicks: Math.floor(Math.random() * 300) + 100,
}));

export default function AdsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ads Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Manage LinkedIn ad campaigns and track ROI</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" /> Create Campaign
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {summaryCards.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${s.bg}`}>
                  <s.icon className={`h-4 w-4 ${s.color}`} />
                </div>
                <div>
                  <p className="text-xs text-gray-500">{s.label}</p>
                  <p className="text-lg font-bold text-gray-900">{s.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Daily Ad Spend</CardTitle></CardHeader>
          <CardContent>
            <BarChartComponent data={spendData} dataKey="spend" xKey="date" color="#10b981" height={280} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Click Trends</CardTitle></CardHeader>
          <CardContent>
            <LineChartComponent data={spendData} dataKey="clicks" xKey="date" color="#3b82f6" height={280} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Campaigns</CardTitle>
            <div className="flex gap-2">
              {["all", "active", "paused", "completed"].map((f) => (
                <Badge key={f} variant="default" className="cursor-pointer capitalize hover:bg-gray-200">{f}</Badge>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left">
                  <th className="pb-3 font-medium text-gray-500">Campaign</th>
                  <th className="pb-3 font-medium text-gray-500">Status</th>
                  <th className="pb-3 font-medium text-gray-500 text-right">Budget</th>
                  <th className="pb-3 font-medium text-gray-500 text-right">Spend</th>
                  <th className="pb-3 font-medium text-gray-500 text-right">Impressions</th>
                  <th className="pb-3 font-medium text-gray-500 text-right">Clicks</th>
                  <th className="pb-3 font-medium text-gray-500 text-right">CTR</th>
                  <th className="pb-3 font-medium text-gray-500 text-right">CPC</th>
                  <th className="pb-3 font-medium text-gray-500 text-right">Leads</th>
                  <th className="pb-3 font-medium text-gray-500"></th>
                </tr>
              </thead>
              <tbody>
                {mockCampaigns.map((c) => (
                  <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3 font-medium text-gray-900">{c.name}</td>
                    <td className="py-3">
                      <Badge variant={statusVariant[c.status] || "default"}>{c.status}</Badge>
                    </td>
                    <td className="py-3 text-right text-gray-600">{formatCurrency(c.budget)}</td>
                    <td className="py-3 text-right text-gray-600">{formatCurrency(c.spend)}</td>
                    <td className="py-3 text-right text-gray-600">{formatNumber(c.impressions)}</td>
                    <td className="py-3 text-right text-gray-600">{formatNumber(c.clicks)}</td>
                    <td className="py-3 text-right text-gray-600">{formatPercent(c.ctr)}</td>
                    <td className="py-3 text-right text-gray-600">{formatCurrency(c.cpc)}</td>
                    <td className="py-3 text-right text-gray-600">{c.leads}</td>
                    <td className="py-3 text-right">
                      <Button variant="ghost" size="sm">
                        {c.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Organic vs Paid Performance</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: "Impressions", organic: 45000, paid: totalImpressions },
                { label: "Clicks", organic: 2300, paid: totalClicks },
                { label: "Engagement Rate", organic: 3.8, paid: avgCtr },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between rounded-lg border border-gray-100 p-3">
                  <span className="text-sm font-medium text-gray-700">{row.label}</span>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Organic</p>
                      <p className="text-sm font-semibold text-blue-600">{typeof row.organic === "number" && row.organic > 100 ? formatNumber(row.organic) : formatPercent(row.organic)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Paid</p>
                      <p className="text-sm font-semibold text-green-600">{typeof row.paid === "number" && row.paid > 100 ? formatNumber(row.paid) : formatPercent(row.paid)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Top ROI Campaigns</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockCampaigns
                .map((c) => ({ ...c, roi: c.spend > 0 ? ((c.conversions * 50 - c.spend) / c.spend) * 100 : 0 }))
                .sort((a, b) => b.roi - a.roi)
                .slice(0, 3)
                .map((c, i) => (
                  <div key={c.id} className="flex items-center gap-3 rounded-lg border border-gray-100 p-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-50 text-sm font-bold text-green-600">
                      #{i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">{c.name}</p>
                      <p className="text-xs text-gray-500">{formatCurrency(c.spend)} spent · {c.conversions} conversions</p>
                    </div>
                    <Badge variant="success">{formatPercent(c.roi)} ROI</Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
