# shared-print-hub

## North American Shared Print Retention website
This site takes advantage of some of the latest CSS syntax. To support less capable browsers, this forward-looking CSS is made backwards-compatible (within reason) using the post-processor 
[PostCSS](http://postcss.org) and the [cssnext](http://cssnext.io/) plugin.


### Install tools for post-processing css, JavaScript linting, etc
It is recommended that you install a Node Version Manager such as the popular [nvm] for Mac (https://github.com/creationix/nvm/blob/master/README.md#installation) if you are currently or plan to use various Node.js utilities.  After your Node Version Manager is successfully installed then [install node.js and npm](https://github.com/creationix/nvm/blob/master/README.md#usage).  If, however, you don't need or want a Node Version Manager you can simply [install node.js and npm](https://docs.npmjs.com/getting-started/installing-node).  
Once both Node and npm are successfully installed ensure that you are in the root directory of this project and run the following command in your terminal:

`npm install`

The above command reads the "devDependencies" properties in the `package.json` file,  creates a node_modules directory in this projects root directory, and finally installs all required npm packages and dependencies needed for this project.

At the time of writing this website runs on the latest Long-term Support (LTS) version of Node v6.11.1 and npm v3.10.10.  


### Start a dev server for testing and monitor ongoing changes to CSS
To automatically start a local [lite-server](https://www.npmjs.com/package/lite-server) for dev testing, as well as start monitoring all CSS edits by adding the following command in terminal in the root directory of this project:

`npm start`

The above command will immediately open this project in the browser, refreshes when html or javascript change, injects CSS changes using sockets, and has a fallback page when a route is not found. 
It will also monitor and apply all changes made to `mapStyle_next.css` (only make CSS edits to this file) automatically to `mapStyle.css`, our post-processed CSS file for production.

To quit the server and stop monitoring changes to CSS hit `control-c`. 

If you'd like to set up your own server, or do not need/want ongoing CSS monitoring and updates then please read the ### Build Tool section before pushing to production.


### Edit the CSS
As discussed above only make CSS edits to the `/resources/styles/source/*mapStyle_next.css*` file.  These updates will either be automatically monitored and updated if you have run `npm start` or will be updated when you use the build tool mentioned directly below.


### Use the Build tool prior to pushing to production
To minify JavaScript and ensure that all edits to `/resources/styles/source/mapStyle_next.css` have been post-processed, run the following command in terminal in the root directory of this project:

`npm run build`

You're terminal window will show you a success message once the build has successfully completed, at which time this project is ready to be `pushed`. Remember, before any `push` to production to ensure that the JavaScript has been minified and the any updates to the CSS `mapStyle_next.css` file are correctly post-processed to the `mapStyle.css`


### JavaScipt Linting
For JS linting to the primary JavaScript file `/resources/scripts/*.js` run the following command in terminal in the root directory of this project:

`npm run lintJS -s`


### Adjust browser support
Backwards compatibility settings are set explicitly in the `.browserlistrc` file.



