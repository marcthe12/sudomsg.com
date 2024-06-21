import slugify from '@sindresorhus/slugify';

export default _ => {
	return {
		layout: "post",
		tags: [
			"post"
		],
		eleventyComputed: {
			permalink: data => `posts/${slugify(data.title)}/`
		}
	}
}
