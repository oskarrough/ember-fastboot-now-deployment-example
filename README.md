# Ember.js deployment to Now.sh

This example demonstrates how you can deploy an [Ember](http://emberjs.com/) + FastBoot application to [now](https://now.sh/).

1. Download `now` on https://zeit.co/download)
2. Run `now oskarrough/ember-now-deployment-example`

Now, `now` will clone the repo, it will run either `yarn` or `npm install` in the cloud followed by `npm build` and finally `npm start` and return a unique deployment URL. Here's an example: [`https://ember-now-deployment-example-pqwagqtgcn.now.sh/`](https://ember-now-deployment-example-pqwagqtgcn.now.sh/).

But you probably already have an application… If you want server-side rendering with FastBoot, we will need to deploy a node.js app. If you don't need FastBoot, we can get away with a static build:

## How to deploy Ember to now.sh without FastBoot

To deploy stuff on now, you need a package.json and the `start` and `build` scripts defined. You can use `now-start` and `now-build` to use different commands locally and on now.

Add the `serve` package, which `now` will use to serve the static website.  

```bash
yarn add serve
yarn add bower # only needed if you use bower
```

Update `engines` in `package.json` to at least node version 6.9.0. This is a requirement from `serve`. 

```json
"engines": {
  "node": ">= 6.9.0"
}
```

Add two new scripts to your `package.json`.

```json
"scripts": {
  "now-build": "bower install; ember build -prod",
  "now-start": "serve dist --single",
  ...
```

The `--single` flag to `serve` makes sure all requests are routed through your index.html.  
Run `now`. Done.

## How to deploy Ember to now with FastBoot

To get server-side rendering, we need to install two new packages:

```bash
yarn add ember-cli-fastboot fastboot-app-server
```

Create a new `fastboot-server.js` file in the root of your project with the following:

```js
const FastBootAppServer = require('fastboot-app-server')
const server = new FastBootAppServer({
  distPath: 'dist',
  gzip: true // Optional - Enables gzip compression.
})
server.start()
```

Modify your `now-start` script in package.json to:

```json
"now-start": "NODE_ENV=production PORT=8000 node fastboot-server.js"
```

That's it. Now, when you run `now`, your Ember app will be served by a [fastboot-app-server](https://github.com/ember-fastboot/fastboot-app-server#quick-start) instead of `serve`.

> Example: [`https://ember-now-deployment-example-pqwagqtgcn.now.sh/`](https://ember-now-deployment-example-pqwagqtgcn.now.sh/) (check the source code, you'll see hello world in there)

> Note: your app might need some modifications before it can run in a non-browser environment. See [https://ember-fastboot.com/](https://ember-fastboot.com/).

> Another note: now.sh servers "sleep" and currently waking up can take ~30 seconds. If you have a payed account, you can avoid this with `now scale [insert-deployment-id] 1`.

## Progressive Web App

To improve performance further, see the ["PWA" branch](https://github.com/oskarrough/ember-fastboot-now-deployment-example/pull/5) on this repo and https://madhatted.com/2017/6/16/building-a-progressive-web-app-with-ember.
