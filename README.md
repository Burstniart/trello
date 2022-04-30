# Experimentign with Trello API
Testing the Trello API on NodeJS


Started by trying to fetch the url to my boards, ``curl`` command seems to work just fine, however Node 16 doesn't recognize fetch call, so I installed cross-fetch:
> npm install --save cross-fetch

Add the following key-value pair to the ``package.json`` file to use ES modules with Node
>"type": "module"

Then proceeded to import fetch from the package at the top of the **test.js** file (not commited to this repo).

```javascript
import fetch from 'cross-fetch';

const fetchTrello = () => {
    const url = 'https://api.trello.com/1/members/me/boards?key=&token=';
    fetch(url).then((res) => {
        if (res.status != 200) {
            console.log(res);
        } else {
            return res.json();
        }
    }).then((data) => {
        console.log(data);
    })
}

fetchTrello();
```
The lovely people that wrote the Trello API documentation left us some code snippets to guide us through the process.
Here is the snippet to create a new board with Node:
```javascript

fetch('https://api.trello.com/1/boards/?name={name}&key={API}&token={token}', {
        method: 'POST'
      })
        .then(response => {
          console.log(
            `Response: ${response.status} ${response.statusText}`
          );
          return response.text();
        })
        .then(text => console.log(text))
        .catch(err => console.error(err));
```