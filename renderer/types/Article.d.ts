type ArticleFrontmatterCategory = "Info" | "Kart" | "Oldtimer" | "Verein";

type ArticleFrontmatter = {
  author: string;
  category: ArticleFrontmatterCategory;
  location: string;
  release: string; // eg. 2009-02-02T00:00:00.000Z
  tags: string[];
  slug: string; // eg. moderne-karts-fuer-die-msf-jugend
  title: string;
};
