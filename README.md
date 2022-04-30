# Experimentign with Trello API
Testing the Trello API on NodeJS


Started by trying to fetch the url to my boards, ``curl`` command seems to work just fine, however Node 16 doesn't recognize fetch call, so I installed cross-fetch:
> npm install --save cross-fetch

Add the following key-value pair to the ``package.json`` file to use ES modules with Node
>"type": "module"

Then proceeded to import fetch from the package at the top of the **test.js** file (not commited to this repo).
## Consult your boards {#check}
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
Here it is enough to simply insert your API key and token righ after the ``=`` sign in the url and the API will reward you with all the info available from you, to you; How cool is that?

## Create a new board
The lovely people that wrote the Trello API documentation left us some code snippets to guide us through the process.
Here is the snippet to create a new board with Node JS:
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
Simple enough as replacing the curly brackets with the values indicated by them, i.e. ``{name}`` will be replaced with the name of the board you wish to create, ``{API}`` and ``{token}`` with your own keys.

Then the API will reward us with this totally not confusing at all message that contains all of the specifications for our newly created board (All of this parameters can be configured during the creation of the board).
>Response: 200 OK
{"id":"626cc3b99a29692c758e43b2","name":"testBoard0","desc":"","descData":null,"closed":false,"idOrganization":"60c1a5470496f22d18e17cda","idEnterprise":null,"pinned":false,"url": ... "limits":{}}

## Get a board
Now, if we want to get the info of a board we simply need to know it's id, and that's where the totally not confusing at all message comes in handy, see this line right here:
>"id":"626cc3b99a29692c758e43b2","name":"testBoard0","desc":"",

At the very beginning it provides us whith the board's id, which we could also know if we ran the [Check boards](#consult-your-boards-check) snippet. Here is the snippet for getting a single board based on it's id:

```javascript
fetch('https://api.trello.com/1/boards/{id}?key=APIKey&token=APIToken', {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
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

As we've done before we simply replace values such as ``{id}``  with the id of the board you wish to consult, ``APIkey`` and ``APIToken`` with your own keys.