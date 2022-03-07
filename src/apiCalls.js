let fetchData = (param) => {
    return fetch(`http://localhost:3001/api/v1/${param}`)
      .then(response => response.json())
      .catch(error => console.log(error));
}

export {fetchData};
