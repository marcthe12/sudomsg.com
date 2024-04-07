import slugify from '@sindresorhus/slugify';

export default _ => {
	return {
		layout: "post.html",
		eleventyComputed: {
			permalink: data => `posts/${slugify(data.title)}/`
		}
	}
}
