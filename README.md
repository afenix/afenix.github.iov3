# North American Shared Print Retention Story Map website

## Dependencies

### Sass

This site uses Sass in a very basic way primarily for pre-processing css variables. More about Sass variables here: http://sass-lang.com/guide

Sass compiles the source .scss file (/resources/styles/source/mapStyle.scss) and outputs it to css (/resources/styles/mapStyle.css).

To use Sass, you will need to either download an app or install Sass from the command line. If you already have ruby installed, I recommend using the command line. More about both options are here: http://sass-lang.com/install

If you go the command line route, you need only navigate to the root of this project then run `sass --watch resources/styles/source:resources/styles` at the prompt. (The left side of the `:` is the location of the scss source directory. The right side of the `:` is the location of compiled css.)


