# Experimentign with Trello API

Started by trying to fetch the url to my boards, ``curl`` command seems to work just fine, however Node 16 doesn't recognize fetch call, so I installed cross-fetch:
> npm install --save cross-fetch

Add the following key-value pair to the ``package.json`` file to use ES modules with Node
>"type": "module"

Then proceeded to import fetch from the package at the top of the **test.js** file (not commited to this repo).
>import fetch from 'cross-fetch'
