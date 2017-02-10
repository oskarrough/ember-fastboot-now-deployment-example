# Ember.js deployment to Now.sh

This example demonstrates deploying a server that uses [`ember-cli`](https://github.com/ember-cli/ember-cli/) to [Now](https://now.sh/).

## How to deploy

First, [download `now`](https://zeit.co/download). Then, clone this repository and run `now`:

```bash
now
```

> Example: [`https://now-test-cqtighifnv.now.sh/`](https://now-test-cqtighifnv.now.sh/)

## How to setup deployment for your own ember-cli project
  
Add the `serve` package, which now will use to serve the static website.

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
The `--single` flag makes sure all requests are routed through your index.html.

```json
"scripts": {
  "now-build": "ember build --environment=production",
  "now-start": "serve dist --single",
  ...
```

Run `now`.
