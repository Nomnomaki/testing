import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/api/webhooks/clerk", "/api/webhooks/stripe", "/favicon.ico"],
  debug: true,

  // This prevents Clerk from trying to auth non-browser requests like Vercel's favicon fetcher
  beforeAuth: (req) => {
    const userAgent = req.headers.get("user-agent") || "";
    if (userAgent.includes("vercel-favicon") || userAgent.includes("bot") || userAgent.includes("crawl")) {
      return false;
    }
    return true;
  },
});

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|.*\\..*).*)", // Exclude static files and favicon
    "/", 
    "/(api|trpc)(.*)"
  ],
};
