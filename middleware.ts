import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/api/webhooks/clerk", "/api/webhooks/stripe", "/favicon.ico"],
  debug: true,

  beforeAuth: (req) => {
    const userAgent = req.headers.get("user-agent") || "";

    // Skip Clerk for non-browser requests (like vercel-favicon or bots)
    if (
      userAgent.includes("vercel-favicon") ||
      userAgent.toLowerCase().includes("bot") ||
      userAgent.toLowerCase().includes("crawl")
    ) {
      return false; // ❗️This is valid – tells Clerk to skip auth
    }

    // ❌ Don't return true — just allow default behavior by returning nothing
  },
});

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|.*\\..*).*)", // Exclude static files and favicon
    "/", 
    "/(api|trpc)(.*)"
  ],
};
