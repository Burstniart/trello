# Experimentign with Trello API
Testing the Trello API on NodeJS


Started by trying to fetch the url to my boards, ``curl`` command seems to work just fine, however Node 16 doesn't recognize fetch call, so I installed cross-fetch:
> npm install --save cross-fetch

Add the following key-value pair to the ``package.json`` file to use ES modules with Node
>"type": "module"

Then proceeded to import fetch from the package at the top of the **test.js** file (not commited to this repo).

## Check boards 

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

At the very beginning it provides us whith the board's id, which we could also know if we ran the [Check boards](#check-boards) snippet. Here is the snippet for getting a single board based on it's id:

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

## Get cards on a board
Here is the snippet for getting the cards on a board, we jus need to know the board's id, our API key and token, and use them like we've done before.

```javascript
fetch('https://api.trello.com/1/boards/{id}/cards?key=APIKey&token=APIToken', {
    method: 'GET'
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
> When given the id of an empty board the API will respond with a
``Response: 200 OK`` ``[]``

> While using the id of a board with cards will give you a full json type repsonse.

The response from consulting the cards on a board is much bigger than the one we get from consulting jus tthe board.


## Create a new list
Now, we want to create a new card buuuuuuut cards go inside lists, that's just how it is, so first let's look at how to create lists, it's actually very much like creating a new board, we simply need to know the ``id`` of the board we want our list to be created in, give it a ``name`` and the API ``key`` and ``token``:

```javascript
fetch('https://api.trello.com/1/boards/{id}/lists?name={name}&key=APIKey&token=APIToken', {
  method: 'POST',
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
  > The API will respond with a small object confirming that our list has been created and some details about it.

## Create a new card
Alright, now we're onto bussines:
Here's the snippet to create a new card given the ``idList`` BUT in it's simplest form it does not require us to give it a name, however since we've been naming things from the beginning we'll continue to do so by adding the request for name as query parameters like this: ``&name={name}`` which indicates the API that the new card to be created in our list, defined as ``{idList}`` shall be brought onto this world with a name!
``APIKey`` and ``APIToken`` you now by now, your keys go in here.

```javascript
fetch('https://api.trello.com/1/cards?idList={idList}&name={name}&key=APIKey&token=APIToken', {
  method: 'POST',
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
  > The response is the json equivalen of a card like we've seen before

  
