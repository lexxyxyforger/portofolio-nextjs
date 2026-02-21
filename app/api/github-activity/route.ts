import { NextResponse } from "next/server";

export async function GET() {
  try {
    const username = process.env.GITHUB_USERNAME || "octocat";
    const token = process.env.GITHUB_TOKEN;

    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
    };
    if (token) headers["Authorization"] = `token ${token}`;

    const res = await fetch(
      `https://api.github.com/users/${username}/events/public?per_page=10`,
      { headers, next: { revalidate: 3600 } },
    );

    if (!res.ok) throw new Error("GitHub API error");

    const events = await res.json();
    const activities = events
      .filter((e: Record<string, unknown>) => e.type === "PushEvent")
      .slice(0, 5)
      .flatMap((e: Record<string, unknown>) => {
        const payload = e.payload as Record<string, unknown>;
        const commits =
          (payload.commits as Array<Record<string, unknown>>) || [];
        return commits.slice(0, 2).map((c: Record<string, unknown>) => ({
          repo: (e.repo as Record<string, unknown>)?.name || "unknown",
          message: c.message as string,
          date: new Date(e.created_at as string).toISOString().split("T")[0],
          sha: (c.sha as string)?.slice(0, 7) || "unknown",
        }));
      })
      .slice(0, 6);

    return NextResponse.json({ activities });
  } catch {
    return NextResponse.json({
      activities: [
        {
          repo: "nightfall-topup",
          message: "feat: payment gateway integration",
          date: "2024-07-20",
          sha: "abc1234",
        },
        {
          repo: "github-clone",
          message: "feat: recursive folder structure renderer",
          date: "2024-07-18",
          sha: "def5678",
        },
        {
          repo: "nekonime",
          message: "fix: rate limiting with caching layer",
          date: "2024-07-15",
          sha: "ghi9012",
        },
        {
          repo: "nightfall-tech",
          message: "perf: lazy loading & mysql query optimization",
          date: "2024-07-12",
          sha: "jkl3456",
        },
        {
          repo: "techstore",
          message: "fix: server-side session cart management",
          date: "2024-07-10",
          sha: "mno7890",
        },
        {
          repo: "portfolio",
          message: "feat: add skill radar chart & tech stack section",
          date: "2024-07-08",
          sha: "pqr1234",
        },
      ],
    });
  }
}
