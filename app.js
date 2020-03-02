const renderHit = hit => {
  // removes product if no image
  if (!hit.image) {
      return "";
  }

  let html = '<div class="rec__item">';
  html += `<img class="item__photo" src="${hit.image.link}" alt="${hit.image.alt}"></img>`;
  html += `<h2>${hit.product_name}</h2>`;
  html += `<p>£${hit.price}.00</p>`
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

const setup = async () => {
  const dataStream = await fetch("./data/recommendations.json");
  const { hits } = await dataStream.json();
  const sortedHits = hits.sort((a, b) => b.price - a.price);
  const topHits = sortedHits.slice(0, 8);
  const html = renderComponent(topHits);
  document.getElementById("app").innerHTML = html;
};

setup();
