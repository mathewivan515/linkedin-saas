import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const s = session as any;
  const accessToken = s.accessToken as string;
  const linkedinId = s.linkedinId as string;

  if (!accessToken) {
    return Response.json({ error: "No LinkedIn access token" }, { status: 401 });
  }

  const body = await request.json();
  const { content, mediaUrl } = body;

  if (!content) {
    return Response.json({ error: "Content is required" }, { status: 400 });
  }

  const postBody: Record<string, unknown> = {
    author: `urn:li:person:${linkedinId}`,
    lifecycleState: "PUBLISHED",
    specificContent: {
      "com.linkedin.ugc.ShareContent": {
        shareCommentary: {
          text: content,
        },
        shareMediaCategory: mediaUrl ? "IMAGE" : "NONE",
        ...(mediaUrl && {
          media: [
            {
              status: "READY",
              originalUrl: mediaUrl,
            },
          ],
        }),
      },
    },
    visibility: {
      "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
    },
  };

  const linkedinResponse = await fetch("https://api.linkedin.com/v2/ugcPosts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify(postBody),
  });

  if (!linkedinResponse.ok) {
    const error = await linkedinResponse.text();
    return Response.json(
      { error: "Failed to post to LinkedIn", details: error },
      { status: linkedinResponse.status }
    );
  }

  const result = await linkedinResponse.json();
  return Response.json({ success: true, postId: result.id });
}
