const BASE_URL = process.env.SITE_URL || "localhost:3000";

export default function sitemap() {
    return [
        { url: `${BASE_URL}/`, lastModified: new Date() },
        { url: `${BASE_URL}/overview`, lastModified: new Date() },
        { url: `${BASE_URL}/foundation`, lastModified: new Date() },
        { url: `${BASE_URL}/wireless`, lastModified: new Date() },
        { url: `${BASE_URL}/smart-nation`, lastModified: new Date() },
    ];
}
