let fetchData = (dataSet) => {
    return fetch(`http://localhost:3001/api/v1/${dataSet}`)
      .then(response => response.json())
      .catch(error => console.log(error));
}

let fetchInstance = (dataSet, id) => {
    return fetch(`http://localhost:3001/api/v1/${dataSet}/${id}`)
      .then(response => response.json())
      .catch(error => console.log(error));
}

export {fetchData, fetchInstance};
