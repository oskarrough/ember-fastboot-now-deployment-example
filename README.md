# Ember.js deployment to Now.sh

This example demonstrates how you can deploy an [Ember](http://emberjs.com/) application to [Now](https://now.sh/).

First, [download `now`](https://zeit.co/download).
Then, clone this repository (a fresh ember project with fastboot and deployment already configured) and run `now`:

```bash
git clone git@github.com:oskarrough/ember-now-deployment-example.git
now
```

> Example: [`https://now-test-cqtighifnv.now.sh/`](https://now-test-cqtighifnv.now.sh/)

But you probably already have an application, read on...

## How to setup deployment for your own ember-cli project

Add the `serve` package, which `now` will use to serve the static website.  
If you use bower, make sure to install that to your project as well.

```bash
yarn add serve
yarn add bower
```

Update `engines` in `package.json` to at least node version 7.
There is work being done to make `serve` work for older versions of node as well but for now it is required.

```json
"engines": {
  "node": ">= 7.0.0"
},
```

Add two new scripts to your `package.json`.

```json
"scripts": {
  "now-build": "bower install; ember build --environment=production",
  "now-start": "serve dist --single",
  ...
```

The `--single` flag makes sure all requests are routed through your index.html.

Run `now`. Done.

## How to deploy with Ember FastBoot

To get server-side rendering, we need to install two new packages:

```bash
yarn add ember-cli-fastboot fastboot-app-server
```

Put the following in a new `fastboot-server.js` file in the root of your project.

```js
const FastBootAppServer = require('fastboot-app-server');
let server = new FastBootAppServer({
  distPath: 'dist',
  gzip: true // Optional - Enables gzip compression.
});
server.start();
```

Modify your `now-start` script in package.json to:

```json
"now-start": "PORT=8000 node fastboot-server.js"
```

That's it. Now, when you run `now`, your Ember app will be served by a [fastboot-app-server](https://github.com/ember-fastboot/fastboot-app-server#quick-start) instead of `serve`.

> Example: [`https://now-test-wvmhfiorbe.now.sh/](https://now-test-wvmhfiorbe.now.sh/) (check the source code, you'll see hello world in there)

> Note: your app might need some modifications before it can run in a node environment. See [https://ember-fastboot.com/](https://ember-fastboot.com/).

> Another note: now.sh servers "sleep" and currently waking up can take ~20 seconds. Not sure how to deal with this.
