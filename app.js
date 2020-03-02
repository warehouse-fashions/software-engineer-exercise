const data = "./data/recommendations.json";

fetch(data)
    .then(res => res.json())
    .then(data => {
        let html = '';
        html += '<h1 class="app-title">WE RECOMMEND</h1>'
        html += data.hits.map(hit => {
            let hitHtml = '<div class="rec__item">';
            if(!hit.image) hit.image = { link: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_avaliable.svg/1200px-No_image_avaliable.svg.png' }
            hitHtml += `<img class="item__photo" src="${hit.image.link}" alt=${hit.image.alt}></img>`
            return hitHtml
        } ).join('');
        document.getElementById("app").innerHTML = html;
    })

    .catch(err => console.error(err));