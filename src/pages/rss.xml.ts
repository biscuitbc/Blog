import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { site } from "../config/site";
import { isPublished, sortPosts } from "../utils/posts";

export async function GET(context: { site: URL | undefined }) {
  const posts = sortPosts((await getCollection("posts")).filter(isPublished));

  return rss({
    title: site.title,
    description: site.description,
    site: context.site ?? site.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: `/posts/${post.id.replace(/\.(md|mdx)$/, "")}/`,
    })),
  });
}
