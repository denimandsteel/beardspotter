# Beardspotter Readme

## About
Beardspotter is a fun single-page mobile web app that we cooked up to play with design for casual social and geo-location features. We solved a number of real problems with our little toy, and have made the code open source for you to learn from and reuse. If you use it, be a sport and throw us a credit at @denimandsteel or [denimandsteel.com](http://denimandsteel.com)

## License
Copyright (C) 2012 Denim & Steel Interactive (Todd Sieling and Tylor Sherman)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Installation
Deploying on Heroku (basically: <http://devcenter.heroku.com/articles/node-js>):

- $ heroku create --stack cedar
- $ git push heroku master
- $ heroku ps:scale web=1
- $ heroku addons:add shared-database
- $ heroku run node schema.js
- $ heroku open

## To Do
