module.exports = class {
        data() {
            return {
                permalink: "/sitemap.xml"
            };
        }

        render(data) {
                return `<?xml version="1.0" encoding="utf-8"?>
				<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
				${(data.collections.all || []).map(page => `<url>
					<loc>${new URL(page.url, data.metadata.url)}</loc>
					<lastmod>${page.date.toISOString()}</lastmod>
				</url>`).join()}
			</urlset>`;
 	}
};
