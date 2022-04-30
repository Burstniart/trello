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
