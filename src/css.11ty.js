const fs = require('fs')
const path = require('path')
const postcss = require('postcss')

module.exports = class {
  async data() {
    return {
      inputs: [
        'index.css',
        'prism.css'
      ],

      pagination: {
        data: 'inputs',
        alias: 'inputfiles',
        size: 1
      },

      permalink: ({ inputfiles }) => `/${inputfiles}`,

      eleventyExcludeFromCollections: true
    }
  };

  async render({ inputfiles}) {
    const inputfile = path.join(__dirname, inputfiles);
    return await postcss([
      require('postcss-import'),
      require('autoprefixer'),
    ])
      .process(await fs.readFileSync(inputfile), {
        from: inputfile
      })
      .then(result => result.css)
  };
}
