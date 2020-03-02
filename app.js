let data = "./data/recommendations.json";

fetch(data)
  .then(res => res.json())
  .then(data => {
    console.log(data);
  })
  .catch(err => console.error(err));
