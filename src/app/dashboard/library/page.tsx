"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { mockPosts } from "@/lib/mock-data";
import { formatNumber } from "@/lib/utils";
import { Search, Filter, Copy, Calendar, Trash2, Eye } from "lucide-react";

const statusVariant: Record<string, "success" | "info" | "warning" | "default" | "danger"> = {
  posted: "success",
  scheduled: "info",
  draft: "warning",
  failed: "danger",
};

const typeLabels: Record<string, string> = {
  short_post: "Short Post",
  long_post: "Long Post",
  thought_leadership: "Thought Leadership",
  educational: "Educational",
  hiring: "Hiring",
  case_study: "Case Study",
  sales_post: "Sales",
  carousel: "Carousel",
};

export default function LibraryPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = mockPosts.filter((p) => {
    if (search && !p.title?.toLowerCase().includes(search.toLowerCase()) && !p.content.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== "all" && p.status !== statusFilter) return false;
    if (typeFilter !== "all" && p.contentType !== typeFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Library</h1>
          <p className="text-sm text-gray-500 mt-1">{mockPosts.length} posts in your library</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input placeholder="Search posts..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Select
              options={[
                { value: "all", label: "All Status" },
                { value: "posted", label: "Published" },
                { value: "scheduled", label: "Scheduled" },
                { value: "draft", label: "Draft" },
              ]}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-40"
            />
            <Select
              options={[
                { value: "all", label: "All Types" },
                ...Object.entries(typeLabels).map(([v, l]) => ({ value: v, label: l })),
              ]}
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-48"
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {filtered.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-semibold text-gray-900 truncate">{post.title}</h3>
                    <Badge variant={statusVariant[post.status]}>{post.status}</Badge>
                    <Badge variant="default">{typeLabels[post.contentType] || post.contentType}</Badge>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2">{post.content}</p>
                  <div className="mt-3 flex items-center gap-4 text-xs text-gray-400">
                    {post.scheduledAt && (
                      <span>
                        {post.status === "posted" ? "Published" : "Scheduled"}:{" "}
                        {new Date(post.scheduledAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    )}
                    {post.analytics && (
                      <>
                        <span>{formatNumber(post.analytics.impressions)} impressions</span>
                        <span>{formatNumber(post.analytics.reactions)} reactions</span>
                        <span>{post.analytics.engagement}% engagement</span>
                      </>
                    )}
                  </div>
                  {post.hashtags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {post.hashtags.map((tag) => (
                        <span key={tag} className="text-xs text-blue-600">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex shrink-0 gap-1">
                  <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm"><Copy className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm"><Calendar className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4 text-red-500" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            <Filter className="mx-auto h-8 w-8 mb-2 text-gray-300" />
            <p>No posts match your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
