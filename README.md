# North American Shared Print Retention Story Map website

This site takes advantage of some of the latest CSS syntax. To support less capable browsers, this forward-looking CSS is made backwards-compatible (within reason) using the post-processor [PostCSS](http://postcss.org) and the [cssnext](http://cssnext.io/) plugin.

## Install post-processing tools

If you haven’t already, [install node.js and npm](https://docs.npmjs.com/getting-started/installing-node). Run the following command in your terminal from the root directory of this project.

`npm install`

## Edit the css

Make all css edits in `/resources/styles/source/mapStyle_next.css`. 

## Run the post-processor

To monitor and apply changes to `mapStyle_next.css` automatically to `mapStyle.css`, run the following command in your terminal. 

`postcss resources/styles/source/mapStyle_next.css --use postcss-cssnext --output resources/styles/mapStyle.css --watch`

## Adjust browser support

Backwards compatibility settings are set explicitly in the `.browserlistrc` file.




