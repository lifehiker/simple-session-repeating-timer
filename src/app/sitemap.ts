import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://sessiontimer.app";
  const routes = [
    "/",
    "/pricing",
    "/presentation-timer",
    "/visual-timer",
    "/interval-timer",
    "/repeating-timer",
    "/classroom-timer",
    "/workout-interval-timer",
    "/speaking-timer",
    "/templates",
    "/templates/presentation",
    "/templates/classroom-rotation",
    "/templates/tabata-alternative",
    "/blog/best-presentation-timer-app",
    "/blog/visual-timer-for-classroom",
    "/blog/repeating-timer-with-voice",
    "/blog/interval-timer-not-fitness",
    "/login",
    "/signup",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route === "/" ? "" : route}`,
    lastModified: new Date(),
    priority: route === "/" ? 1 : 0.8,
  }));
}
