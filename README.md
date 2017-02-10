# Ember.js deployment to Now.sh

This example demonstrates deploying a server that uses [`ember-cli`](https://github.com/ember-cli/ember-cli/) to [Now](https://now.sh/).

## How to deploy

First, [download `now`](https://zeit.co/download).  
Then, clone this repository and run `now`:

```bash
git clone git@github.com:oskarrough/ember-now-deployment-example.git
now
```

> Example: [`https://now-test-cqtighifnv.now.sh/`](https://now-test-cqtighifnv.now.sh/)

## How to setup deployment for your own ember-cli project
  
Add the `serve` package, which `now` will use to serve the static website.

```bash
yarn add serve
```

Update `engines` in `package.json` to at least node version 7.  
This is temporary. There is work being done to make `serve` work for older versions of node as well.

```json
"engines": {
  "node": ">= 7.0.0"
},
```

Add two new scripts to your `package.json`.  

```json
"scripts": {
  "now-build": "ember build --environment=production",
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

Put the following in a `server.js` file:

```js
const FastBootAppServer = require('fastboot-app-server');
let server = new FastBootAppServer({
  distPath: 'dist',
  gzip: true // Optional - Enables gzip compression.
});
server.start();
```

Modify your `now-build` script in package.json to:

```json
"now-build": "PORT=8000 node server.js"
```

That's it. Now, when you run `now`, your Ember app will be served by a [fastboot-app-server](https://github.com/ember-fastboot/fastboot-app-server#quick-start) instead of `serve`.

> Example: [`https://now-test-wvmhfiorbe.now.sh/](https://now-test-wvmhfiorbe.now.sh/) (check the source code, you'll see hello world in there)

> Note: your app might need some modifications before it can run in a node environment. See [https://ember-fastboot.com/](https://ember-fastboot.com/).
