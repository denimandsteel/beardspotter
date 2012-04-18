# Beardspotter Readme

## About
Beardspotter is a fun single-page mobile web app that we cooked up to play with design for casual social and geo-location features. We solved a number of real problems with our little toy, and have made the code open source for you to learn from and reuse. If you use it, be a sport and throw us a credit at @denimandsteel or [denimandsteel.com](http://denimandsteel.com)

## Installation
Setting up on your local, make sure you install [node.js](https://github.com/joyent/node/wiki/Installation) and [PostgreSQL](http://www.postgresql.org/download/):

- $ git clone git@github.com:denimandsteel/beardspotter.git
- $ cd beardspotter
- $ createdb beardspotter # create database in PostgreSQL
- $ node schema.js # create schema
- $ node index.js

Then you can deploy on Heroku (basically: <http://devcenter.heroku.com/articles/node-js>):

- $ heroku create --stack cedar
- $ git push heroku master
- $ heroku ps:scale web=1
- $ heroku addons:add shared-database
- $ heroku run node schema.js
- $ heroku open

<<<<<<< HEAD
## To Do

- intersitial for identity

## License
Copyright (C) 2012 Denim & Steel Interactive (Todd Sieling and Tylor Sherman)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
=======
## Acknowledgements
The background photo on the main page is derived from http://www.flickr.com/photos/omaromar/2063335787/sizes/l/in/photostream/ by Omar Omar. The Creative Commons license for this photo can be viewed at http://creativecommons.org/licenses/by/2.0/

Additional design assistance from Angela Rabideau.

>>>>>>> Acknowledgements
