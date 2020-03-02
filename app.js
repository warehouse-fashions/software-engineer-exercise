const renderHit = hit => {
  // provide a default image
  if (!hit.image) {
      return '';
  }

  let html = '<div class="rec__item">';
  html += `<img class="item__photo" src="${hit.image.link}" alt="${hit.image.alt}"></img>`;
  html += "</div>";
  return html;
};

const renderComponent = hits => {
  let html = '<div class="rec">';
  html += '<h1 class="app-title">WE RECOMMEND</h1>';
  hits.forEach(hit => {
    html += renderHit(hit);
  });
  html += "</div>";
  return html;
};

const setup = async () => {
  const dataStream = await fetch("./data/recommendations.json");
  const { hits } = await dataStream.json();
  const html = renderComponent(hits);
  document.getElementById("app").innerHTML = html;
};

setup();
