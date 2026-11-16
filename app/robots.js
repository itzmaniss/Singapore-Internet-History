const BASE_URL = process.env.SITE_URL || "localhost:3000";

// generates /robots.txt for search engine crawlers
export default function robots() {
    return {
        rules: { userAgent: "*", allow: "/" },
        sitemap: `${BASE_URL}/sitemap.xml`,
    };
}
