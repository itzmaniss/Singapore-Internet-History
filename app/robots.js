const BASE_URL = process.env.SITE_URL || "localhost:3000";

export default function robots() {
    return {
        rules: { userAgent: "*", allow: "/" },
        sitemap: `${BASE_URL}/sitemap.xml`,
    };
}
