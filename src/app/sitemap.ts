import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://sessiontimer.app";

  return [
    { url: baseUrl, lastModified: new Date(), priority: 1 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/presentation-timer`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/visual-timer`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/interval-timer`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/repeating-timer`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/classroom-timer`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/templates`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/login`, lastModified: new Date(), priority: 0.5 },
    { url: `${baseUrl}/signup`, lastModified: new Date(), priority: 0.5 },
  ];
}
