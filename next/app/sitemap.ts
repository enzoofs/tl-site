import type { MetadataRoute } from "next";
import { SOLUCOES } from "@/lib/solucoes";
import { ARTIGOS } from "@/lib/artigos";

const BASE_URL = "https://timelabs.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Páginas geradas a partir dos dados: soluções e artigos do blog
  const dinamicas: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/solucoes`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    ...SOLUCOES.map((s) => ({
      url: `${BASE_URL}/solucoes/${s.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${BASE_URL}/projetos`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/seubloco`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    ...ARTIGOS.map((a) => ({
      url: `${BASE_URL}/blog/${a.slug}`,
      lastModified: new Date(a.data),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];

  return [
    {
      url: `${BASE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/sobre`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/grifo`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/privacidade`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/termos`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...dinamicas,
  ];
}
