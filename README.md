# Ember.js deployment to Now.sh

This example demonstrates deploying a server that uses [`ember-cli`](https://github.com/ember-cli/ember-cli/) to [Now](https://now.sh/).

## How to setup deploy for your own ember-cli project

First, install `now` globally and create a new Ember application. 
Then, add the `serve` package, which now will use to serve the static website.

```bash
yarn global add now
ember new my-project
cd my-project
```

Update `engines` in `package.json` to at least node version 7. 
This is temporary. There is work being done to make `serve` work for older versions of node as well.

```
"engines": {
  "node": ">= 7.0.0"
},
```

Add two new scripts to your `package.json`. 
The `--single` flag makes sure all requests are routed through your index.html.

```
"scripts": {
  ...
  "now-build": "ember build --environment=production",
  "now-start": "serve dist --single",
  ...
},
```

## How to deploy

```
now
```

> Example: [`https://now-test-cqtighifnv.now.sh/`](https://now-test-cqtighifnv.now.sh/)
