
const fetchGet = () => {
  fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(json => console.log(json))
    .catch( err => console.log(err))

}

const fetchGetWithError = () => {
  fetch('https://.typicode.com/todos/1')
    .then(response => response.json())
    .then(json => console.log(json))
    .catch( err => console.log(err))

}

const fetchPost = () => {
  fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch( err => console.log(err))
}

const fetchGetAsync = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const body = await response.json();
    console.log("Body",body);
  }
  catch(err) {
    console.log(err);
  }
}

const fetchGetAsyncWithError = async () => {
  try {
    const response = await fetch('https://.typicode.com/todos/1');
    const body = await response.json();
    console.log("Body",body);
  }
  catch(err) {
    console.log(err);
  }
}

const fetchPostAsync = async () => {
  try{
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: 'foo',
          body: 'bar',
          userId: 1
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
      const body = await response.json();
      console.log("Body",body);
   }
  catch(err) {
    console.log(err);
  }
}

