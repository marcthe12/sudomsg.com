import { IdAttributePlugin, EleventyHtmlBasePlugin, RenderPlugin, InputPathToUrlTransformPlugin } from '@11ty/eleventy';
import syntaxHighlightPlugin from "@11ty/eleventy-plugin-syntaxhighlight";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import directoryOutputPlugin from "@11ty/eleventy-plugin-directory-output";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img"
import pluginWebc from "@11ty/eleventy-plugin-webc";

import { DateTime } from "luxon";

import { readFileSync } from 'node:fs';

export default async function (eleventyConfig) {
	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
	eleventyConfig.addPlugin(RenderPlugin);
	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);
	eleventyConfig.addPlugin(IdAttributePlugin);
	eleventyConfig.addPlugin(syntaxHighlightPlugin);
	eleventyConfig.addPlugin(feedPlugin, {
		type: "atom",
		outputPath: "/atom.xml",
		collection: {
			name: "post"
		},
		metadata: {
			language: "en-GB",
			title: "Sudomsg",
			subtitle: "Messages from Root",
			base: "https://sudomsg.com/",
			author: {
				name: "Marc Pervaz Boocha",
				email: "mboocha@sudomsg.com",
			}
		}
	});
	eleventyConfig.addPlugin(eleventyNavigationPlugin);
	eleventyConfig.addPlugin(directoryOutputPlugin);
	eleventyConfig.addPlugin(pluginWebc, {
		components: [
			"npm:@11ty/eleventy-plugin-syntaxhighlight/*.webc",
		],
	});

	eleventyConfig.addPassthroughCopy({
		"public/": "/",
	});

	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		extensions: "html",
		formats: ["webp", "jpeg", "svg", "avif", "auto", "png"],
		widths: [128, 256, 512, 1024, "auto"],
		defaultAttributes: {
			sizes: "auto",
			decoding: "async",
			loading: "lazy"
		},
	});
	eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy")
	});
	eleventyConfig.addFilter('htmlDateString', dateObj => DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd'));
	eleventyConfig.addShortcode('schema', type => (type instanceof URL ? type : new URL(type, "http://schema.org/")).href);

	eleventyConfig.addFilter('embed', path => readFileSync(path, { encoding: 'utf8' }));

	eleventyConfig.setQuietMode(true);
	eleventyConfig.setDynamicPermalinks(false);

	return {
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "webc",
		dir: {
			output: "dist",
			input: "src",
			includes: "../includes",
			data: "../data",
			components: "components",
		}
	};
}
