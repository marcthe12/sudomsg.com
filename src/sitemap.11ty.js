export default class {
	data() {
		return {
			permalink: "/sitemapa.xml",
			eleventyExcludeFromCollections: true
		};
	}

	render(data) {
		const urrlset = data.collections.all
			.map((page) => {
				const absoluteUrl = this.htmlBaseUrl(page.url, data.metadata.url);
				return `<url><loc>${absoluteUrl}</loc><lastmod>${this.htmlDateString(page.date)}</lastmod></url>`
			})

		return `<?xml version="1.0" encoding="utf-8"?>
		<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urrlset.join('')}</urlset>`;
	}
}


