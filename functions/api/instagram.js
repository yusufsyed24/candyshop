// Cloudflare Pages Function  ->  /api/instagram
// Reads the latest posts from the Blesscon Candy Instagram account and returns them as JSON.
// Needs ONE secret in Cloudflare Pages: IG_ACCESS_TOKEN  (see INSTAGRAM-SETUP.md)
const GRAPH = "https://graph.instagram.com";
const FIELDS = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp," +
  "children{id,media_type,media_url,thumbnail_url}";

export async function onRequestGet({ request, env, waitUntil }) {
  const json = (obj, ttl) => new Response(JSON.stringify(obj), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": `public, max-age=60, s-maxage=${ttl}`
    }
  });

  const token = env.IG_ACCESS_TOKEN;
  if (!token) return json({ configured: false, posts: [] }, 60);

  // Edge cache: Instagram is only asked once every 15 minutes, however many visitors there are.
  const cache = caches.default;
  const key = new Request(new URL("/api/instagram", request.url).toString());
  const hit = await cache.match(key);
  if (hit) return hit;

  try {
    const [mediaRes, meRes] = await Promise.all([
      fetch(`${GRAPH}/me/media?fields=${encodeURIComponent(FIELDS)}&limit=18&access_token=${token}`),
      fetch(`${GRAPH}/me?fields=username,name,profile_picture_url,media_count,followers_count&access_token=${token}`)
    ]);
    const media = await mediaRes.json();
    if (!mediaRes.ok || media.error) {
      return json({ configured: true, error: media.error?.message || "Instagram error", posts: [] }, 60);
    }
    const me = meRes.ok ? await meRes.json() : {};

    const posts = (media.data || []).map(p => ({
      id: p.id,
      type: p.media_type,                       // IMAGE | VIDEO | CAROUSEL_ALBUM
      src: p.media_url,
      thumb: p.thumbnail_url || p.media_url,
      caption: p.caption || "",
      link: p.permalink,
      time: p.timestamp,
      children: (p.children?.data || []).map(c => ({
        type: c.media_type, src: c.media_url, thumb: c.thumbnail_url || c.media_url
      }))
    }));

    const res = json({
      configured: true,
      profile: {
        username: me.username || "blessconcandy",
        name: me.name || "Blesscon Candy",
        avatar: me.profile_picture_url || "",
        posts: me.media_count ?? null,
        followers: me.followers_count ?? null
      },
      posts
    }, 900);
    waitUntil(cache.put(key, res.clone()));
    return res;
  } catch (e) {
    return json({ configured: true, error: "fetch failed", posts: [] }, 60);
  }
}
