/*jshint node:true*/
'use strict';

module.exports = function(/* environment, appConfig */) {
  // See https://github.com/san650/ember-web-app#documentation for a list of
  // supported properties

  return {
    name: "ember-now-deployment-example",
    short_name: "ember-now",
    description: "",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "favicon.jpg",
        sizes: "512x512",
        type: "image/jpeg"
      }
    ]
  };
}
