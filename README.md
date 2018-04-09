# Ember.js deployment to Now.sh

This example demonstrates how you can deploy an [Ember](http://emberjs.com/) + FastBoot application to [now](https://now.sh/).

1. Download `now` on https://zeit.co/download)
2. Run `now oskarrough/ember-now-deployment-example`

That's it. Now, `now` will clone the repo, it will run either `yarn` or `npm install` (depending on your lock files) in the cloud followed by `npm build` and finally `npm start` and return a unique deployment URL. 

## How to deploy Ember to now with FastBoot

There are three steps.

1. Install ember fastboot to your ember app
2. Create a node.js server that serves your app
3. Configure our scripts in `package.json`

1) To get server-side rendering, we need to install two new packages:

```bash
yarn add ember-cli-fastboot fastboot-app-server
```

> If you can run `npm start` and see your rendered app when you view source
> Note: your app might need some modifications before it can run in a non-browser environment. See [https://ember-fastboot.com/](https://ember-fastboot.com/).

2) Create a new `fastboot-server.js` file in the root of your project. Copy/paste the following:

```js
const FastBootAppServer = require('fastboot-app-server')
const server = new FastBootAppServer({
  distPath: 'dist',
  gzip: true // Optional - Enables gzip compression.
})
server.start()
```

3) Now to configure the scripts. We will need to first run ember build and then start the new fastboot server.

When we run `now` it will run first `npm build` then `npm start` in the cloud. The normal start script for ember-cli runs `ember serve`. But through convention now allows you to overwrite what is run with `now-build` and `now-start. Like this:

```json
"start-fastboot": "NODE_ENV=production node fastboot-server.js",
"now-start": "start-fastboot",
```

> Example: [`https://ember-now-deployment-example-pqwagqtgcn.now.sh/`](https://ember-now-deployment-example-pqwagqtgcn.now.sh/) (check the source code, you'll see hello world in there)

> Another note: now.sh servers "sleep" and currently waking up can take ~30 seconds. If you have a payed account, you can avoid this with `now scale [insert-deployment-id] 1`.

## How to deploy Ember to now.sh without FastBoot

To deploy stuff on now, you need a package.json with `start` and `build` scripts defined. To use different commands locally and on now, use `now-start` and `now-build`.

Add the `serve` package, which `now` will use to serve the static website.  

```bash
yarn add serve
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
  "now-build": "ember build --environment=production",
  "now-start": "serve dist --single",
  ...
```

The `--single` flag to `serve` makes sure all requests are routed through your index.html.  
Run `now`. Done.

## Progressive Web App

To improve performance further, see the ["PWA" branch](https://github.com/oskarrough/ember-fastboot-now-deployment-example/pull/5) on this repo and https://madhatted.com/2017/6/16/building-a-progressive-web-app-with-ember.

## Deploying with `up`

Here we just reuse the above. That is, deploy to a node host and run `npm build` followed by `npm start-fastboot`. See `up.json`.
