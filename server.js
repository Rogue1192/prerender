#!/usr/bin/env node
var prerender = require('./lib');

var server = prerender({
  chromeLocation: process.env.CHROME_BIN || '/usr/bin/chromium',
  chromeFlags: [
    '--headless',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--remote-debugging-port=9222',
    '--hide-scrollbars',
  ],
});

server.use(prerender.sendPrerenderHeader());
server.use(prerender.browserForceRestart());
// server.use(prerender.blockResources());
server.use(prerender.addMetaTags());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());

server.start();
