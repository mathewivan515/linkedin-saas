"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  RefreshCw,
  Save,
  Calendar,
  Send,
  Image as ImageIcon,
  Hash,
  Target,
  Lightbulb,
  Copy,
  X,
  CheckCircle2,
  AlertTriangle,
  Loader2,
} from "lucide-react";

const contentTypes = [
  { value: "short_post", label: "Short Post" },
  { value: "long_post", label: "Long Post" },
  { value: "thought_leadership", label: "Thought Leadership" },
  { value: "sales_post", label: "Sales Post" },
  { value: "educational", label: "Educational" },
  { value: "poll", label: "Poll" },
  { value: "carousel", label: "Carousel" },
  { value: "industry_update", label: "Industry Update" },
  { value: "promotional", label: "Promotional" },
  { value: "event", label: "Event Post" },
  { value: "hiring", label: "Hiring Post" },
];

const tones = [
  { value: "professional", label: "Professional" },
  { value: "friendly", label: "Friendly" },
  { value: "thought_leadership", label: "Thought Leadership" },
  { value: "educational", label: "Educational" },
  { value: "sales", label: "Sales Focused" },
  { value: "casual", label: "Casual" },
  { value: "motivational", label: "Motivational" },
];

const sampleContent = `The future of work isn't about choosing between remote and office — it's about building systems that empower people regardless of where they sit.

After leading distributed teams for 3 years, here's what I've learned:

1. Async-first communication reduces meetings by 40%
2. Documentation becomes your competitive advantage
3. Trust is built through outcomes, not presence
4. Time zones are a feature, not a bug

The companies that figure this out first will attract the best talent globally.

What's your experience with distributed teams? 👇`;

const sampleHashtags = ["#RemoteWork", "#FutureOfWork", "#Leadership", "#DistributedTeams", "#WorkCulture"];
const sampleKeywords = ["remote work", "distributed teams", "async communication", "leadership"];

export default function CreateContentPage() {
  const { data: session } = useSession();
  const [contentType, setContentType] = useState("thought_leadership");
  const [tone, setTone] = useState("professional");
  const [topic, setTopic] = useState("");
  const [goal, setGoal] = useState("");
  const [cta, setCta] = useState("");
  const [keywords, setKeywords] = useState("");
  const [audience, setAudience] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [generatedHashtags, setGeneratedHashtags] = useState<string[]>([]);
  const [generatedKeywords, setGeneratedKeywords] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState<"idle" | "success" | "error">("idle");
  const [publishMessage, setPublishMessage] = useState("");
  const [ctaSuggestion, setCtaSuggestion] = useState("");
  const [imageSuggestion, setImageSuggestion] = useState("");

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedContent(sampleContent);
      setGeneratedHashtags(sampleHashtags);
      setGeneratedKeywords(sampleKeywords);
      setCtaSuggestion("Share your experience with distributed teams in the comments");
      setImageSuggestion("A modern workspace split-screen showing a team collaborating across different locations with connected nodes overlay");
      setIsGenerating(false);
    }, 1500);
  };

  const removeHashtag = (tag: string) => {
    setGeneratedHashtags(generatedHashtags.filter((h) => h !== tag));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Create Content</h1>
        <p className="text-sm text-gray-500 mt-1">Generate AI-powered LinkedIn content</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-600" />
                Content Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Content Type</label>
                <Select options={contentTypes} value={contentType} onChange={(e) => setContentType(e.target.value)} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Tone</label>
                <Select options={tones} value={tone} onChange={(e) => setTone(e.target.value)} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Topic (optional)</label>
                <Input placeholder="e.g., Remote work productivity" value={topic} onChange={(e) => setTopic(e.target.value)} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Goal (optional)</label>
                <Input placeholder="e.g., Drive engagement, Generate leads" value={goal} onChange={(e) => setGoal(e.target.value)} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Call to Action (optional)</label>
                <Input placeholder="e.g., Comment below, Visit our site" value={cta} onChange={(e) => setCta(e.target.value)} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Keywords (optional)</label>
                <Input placeholder="e.g., AI, automation, SaaS" value={keywords} onChange={(e) => setKeywords(e.target.value)} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Target Audience (optional)</label>
                <Input placeholder="e.g., Tech founders, HR managers" value={audience} onChange={(e) => setAudience(e.target.value)} />
              </div>

              <Button onClick={handleGenerate} disabled={isGenerating} className="w-full" size="lg">
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" /> Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" /> Generate Content
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6 lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Generated Content</CardTitle>
                {generatedContent && (
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={handleGenerate}>
                      <RefreshCw className="h-4 w-4" /> Regenerate
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(generatedContent)}>
                      <Copy className="h-4 w-4" /> Copy
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {generatedContent ? (
                <Textarea
                  value={generatedContent}
                  onChange={(e) => setGeneratedContent(e.target.value)}
                  rows={12}
                  className="font-normal"
                />
              ) : (
                <div className="flex h-48 items-center justify-center rounded-lg border-2 border-dashed border-gray-200 text-gray-400">
                  <div className="text-center">
                    <Sparkles className="mx-auto h-8 w-8 mb-2" />
                    <p className="text-sm">Configure settings and click Generate</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {generatedHashtags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-5 w-5 text-blue-600" /> Hashtags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {generatedHashtags.map((tag) => (
                    <Badge key={tag} variant="info" className="gap-1 pr-1.5">
                      {tag}
                      <button onClick={() => removeHashtag(tag)} className="ml-1 rounded-full hover:bg-blue-200 p-0.5">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {generatedKeywords.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-600" /> Keywords
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {generatedKeywords.map((kw) => (
                    <Badge key={kw} variant="default">{kw}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {ctaSuggestion && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" /> Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase">CTA Suggestion</p>
                  <p className="mt-1 text-sm text-gray-700">{ctaSuggestion}</p>
                </div>
                {imageSuggestion && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Suggested Image</p>
                    <p className="mt-1 text-sm text-gray-700">{imageSuggestion}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {publishStatus === "success" && (
            <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <p className="text-sm font-medium text-green-800">{publishMessage}</p>
            </div>
          )}
          {publishStatus === "error" && (
            <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <p className="text-sm font-medium text-red-800">{publishMessage}</p>
            </div>
          )}

          {generatedContent && (
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">
                <Save className="h-4 w-4" /> Save Draft
              </Button>
              <Button variant="secondary" className="flex-1">
                <Calendar className="h-4 w-4" /> Schedule
              </Button>
              <Button variant="outline" className="flex-1">
                <ImageIcon className="h-4 w-4" /> Generate Media
              </Button>
              <Button
                className="flex-1"
                disabled={isPublishing || !session}
                onClick={async () => {
                  if (!session) {
                    setPublishStatus("error");
                    setPublishMessage("Please connect your LinkedIn account in Settings first.");
                    return;
                  }
                  setIsPublishing(true);
                  setPublishStatus("idle");
                  try {
                    const fullContent = generatedContent + (generatedHashtags.length > 0 ? "\n\n" + generatedHashtags.join(" ") : "");
                    const res = await fetch("/api/linkedin/post", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ content: fullContent }),
                    });
                    const data = await res.json();
                    if (res.ok) {
                      setPublishStatus("success");
                      setPublishMessage("Successfully posted to LinkedIn!");
                    } else {
                      setPublishStatus("error");
                      setPublishMessage(data.error || "Failed to post to LinkedIn");
                    }
                  } catch {
                    setPublishStatus("error");
                    setPublishMessage("Network error. Please try again.");
                  } finally {
                    setIsPublishing(false);
                  }
                }}
              >
                {isPublishing ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Publishing...</>
                ) : (
                  <><Send className="h-4 w-4" /> Publish Now</>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
