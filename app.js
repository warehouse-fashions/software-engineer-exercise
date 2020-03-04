const renderHit = hit => {
  // removes product if no image
  if (!hit.image) {
      return "test";
  }

  let html = '<div class="rec__item">';
  html += `<img class="item__photo" src="${hit.image.link}" alt="${hit.image.alt}"></img>`;
  html += `<h2 class="product__name">${hit.product_name}</h2>`;
  html += `<p class="price">£${hit.price}.00</p>`
  html += "</div>";
  return html;
};

const renderComponent = hits => {
  let html = '<div class="rec">';
  hits.forEach(hit => {
    html += renderHit(hit);
  });
  html += "</div>";
  return html;
};

const fetchData = async url => {
    const dataStream = await fetch(url);
    const data = await dataStream.json();
    return data;
}

const findTopHits = hits => {
    const hitsWithPictures = hits.filter(hit => !!hit.image);
    const sortedHits = hitsWithPictures.sort((a, b) => b.price - a.price);
    const topHits = sortedHits.slice(0, 4);
    return topHits;
}

const setup = async () => {
    const { hits } = await fetchData('./data/recommendations.json');
    const topHits = findTopHits(hits);
    const html = renderComponent(topHits);
    document.getElementById("app").innerHTML = html;
}

setup();
