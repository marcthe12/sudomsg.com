import { EleventyHtmlBasePlugin, RenderPlugin, InputPathToUrlTransformPlugin } from '@11ty/eleventy';
import syntaxHighlightPlugin from "@11ty/eleventy-plugin-syntaxhighlight";
import rssPlugin from "@11ty/eleventy-plugin-rss";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import directoryOutputPlugin from "@11ty/eleventy-plugin-directory-output";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import pluginWebc from "@11ty/eleventy-plugin-webc";

import { DateTime } from "luxon";

export default async function(eleventyConfig) {
	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
	eleventyConfig.addPlugin(RenderPlugin);
	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);
	eleventyConfig.addPlugin(syntaxHighlightPlugin);
	eleventyConfig.addPlugin(rssPlugin);
	eleventyConfig.addPlugin(eleventyNavigationPlugin);

	eleventyConfig.addPlugin(directoryOutputPlugin);

	eleventyConfig.addPlugin(pluginWebc);

	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		extensions: "html",
		formats: ["webp", "jpeg", "svg", "avif", "auto", "png"],
		defaultAttributes: {
			loading: "lazy",
			decoding: "async",
		},
	});

	eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

	eleventyConfig.addPassthroughCopy({
		"./public/": "/",
	});

	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
	});

	eleventyConfig.addFilter('htmlDateString', (dateObj) => {
		return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
	});

	eleventyConfig.addShortcode('schema', (type) => {
		return (type instanceof URL ? type : new URL(type, "http://schema.org/")).href;
	});

	eleventyConfig.setQuietMode(true);

	return {
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
	}
}
