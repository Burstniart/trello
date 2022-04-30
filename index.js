import fetch from 'cross-fetch';

// Consulting your boards
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

// Creating a new board
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

// Checking existing board info
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
  
  //  Get cards on a board
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

// Create a new list
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