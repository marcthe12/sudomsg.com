import slugify from '@sindresorhus/slugify';

export default function () {
	return {
		layout: "post",
		tags: [
			"post"
		],
		eleventyComputed: {
			permalink(data) {
				return data.title ? `posts/${slugify(data.title)}/` : `posts/${data.page.fileSlug}/`
			},
		}
	}
}
