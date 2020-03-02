const data = "./data/recommendations.json";

fetch(data)
  .then(res => res.json())
  .then(data => {
    document.getElementById("app").innerHTML = `
        <h1 class="app-title">WE RECOMMEND</h1>
        ${data.hits.map( function(hits) {
            return `
                <div class="rec__item">
                    <img class="item__photo" src="${data.hits[9].image.link}" alt="${data.hit.image.alt}">
                </div>
            `
        } ).join('')}
    `;
        console.log(data);
  })
  .catch(err => console.error(err));

