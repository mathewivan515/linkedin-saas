"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockPosts } from "@/lib/mock-data";
import { ChevronLeft, ChevronRight, Plus, Clock, Lightbulb } from "lucide-react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const statusVariant: Record<string, "success" | "info" | "warning" | "default"> = {
  posted: "success",
  scheduled: "info",
  draft: "warning",
  failed: "danger" as "warning",
};

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"month" | "week">("month");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  }, [year, month]);

  const postsForDay = (day: number) => {
    return mockPosts.filter((p) => {
      const d = p.scheduledAt || p.publishedAt;
      if (!d) return false;
      const postDate = new Date(d);
      return postDate.getFullYear() === year && postDate.getMonth() === month && postDate.getDate() === day;
    });
  };

  const navigate = (dir: number) => {
    setCurrentDate(new Date(year, month + dir, 1));
  };

  const monthLabel = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Calendar</h1>
          <p className="text-sm text-gray-500 mt-1">Plan and schedule your LinkedIn content</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" /> New Post
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate(-1)} className="rounded-lg p-2 hover:bg-gray-100">
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              <h2 className="text-lg font-semibold text-gray-900">{monthLabel}</h2>
              <button onClick={() => navigate(1)} className="rounded-lg p-2 hover:bg-gray-100">
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            <div className="flex rounded-lg border border-gray-200 p-0.5">
              <button
                onClick={() => setView("month")}
                className={`rounded-md px-3 py-1.5 text-sm font-medium ${view === "month" ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:text-gray-900"}`}
              >
                Month
              </button>
              <button
                onClick={() => setView("week")}
                className={`rounded-md px-3 py-1.5 text-sm font-medium ${view === "week" ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:text-gray-900"}`}
              >
                Week
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-px rounded-lg border border-gray-200 bg-gray-200 overflow-hidden">
            {DAYS.map((day) => (
              <div key={day} className="bg-gray-50 px-3 py-2 text-center text-xs font-semibold text-gray-500 uppercase">
                {day}
              </div>
            ))}
            {calendarDays.map((day, i) => {
              const posts = day ? postsForDay(day) : [];
              const isToday = day && new Date().getDate() === day && new Date().getMonth() === month && new Date().getFullYear() === year;
              return (
                <div
                  key={i}
                  className={`min-h-[100px] bg-white p-2 ${!day ? "bg-gray-50" : "hover:bg-blue-50/30 cursor-pointer"}`}
                >
                  {day && (
                    <>
                      <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-sm ${isToday ? "bg-blue-600 text-white font-bold" : "text-gray-700"}`}>
                        {day}
                      </span>
                      <div className="mt-1 space-y-1">
                        {posts.map((post) => (
                          <div
                            key={post.id}
                            className="rounded-md bg-blue-50 border border-blue-100 px-2 py-1 cursor-pointer hover:bg-blue-100 transition-colors"
                          >
                            <p className="truncate text-xs font-medium text-blue-800">{post.title}</p>
                            <Badge variant={statusVariant[post.status] || "default"} className="mt-0.5 text-[10px] px-1.5 py-0">
                              {post.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Clock className="h-4 w-4 text-blue-600" /> Upcoming Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockPosts
                .filter((p) => p.status === "scheduled")
                .map((post) => (
                  <div key={post.id} className="rounded-lg border border-gray-100 p-3">
                    <p className="text-sm font-medium text-gray-900">{post.title}</p>
                    <p className="mt-1 text-xs text-gray-500">
                      {new Date(post.scheduledAt!).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
                    </p>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Lightbulb className="h-4 w-4 text-yellow-500" /> Best Times to Post
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { day: "Tuesday", time: "9:00 AM", score: 95 },
                { day: "Wednesday", time: "11:00 AM", score: 88 },
                { day: "Thursday", time: "8:00 AM", score: 82 },
                { day: "Monday", time: "10:00 AM", score: 79 },
              ].map((slot) => (
                <div key={slot.day + slot.time} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{slot.day}</p>
                    <p className="text-xs text-gray-500">{slot.time}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-16 rounded-full bg-gray-100">
                      <div className="h-2 rounded-full bg-blue-600" style={{ width: `${slot.score}%` }} />
                    </div>
                    <span className="text-xs font-medium text-gray-600">{slot.score}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Post Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { label: "Published", count: mockPosts.filter((p) => p.status === "posted").length, color: "bg-green-500" },
                { label: "Scheduled", count: mockPosts.filter((p) => p.status === "scheduled").length, color: "bg-blue-500" },
                { label: "Drafts", count: mockPosts.filter((p) => p.status === "draft").length, color: "bg-yellow-500" },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${s.color}`} />
                    <span className="text-sm text-gray-700">{s.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{s.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
