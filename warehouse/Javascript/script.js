const parentDiv = document.getElementsByClassName("items");
//for (let x = 0; x < garments2.data.length; x++) {
garments = garments.hits
  .map((g, i) => ({ ...g, index: i }))
  .filter((h, i) => h.image)
  .slice(0, 4);

for (let i = 0; i < garments.length; i++) {
  const child = document.createElement("div");
  child.setAttribute("class", "item");
  const image = document.createElement("img");
  image.setAttribute("src", garments[i].image.link);
  image.setAttribute("alt", garments[i].image.alt);
  image.setAttribute("class", "image");
  const productPrice = document.createElement("p");
  productPrice.setAttribute("class", "product-price");
  image.style.cssText = "cursor: pointer;";

  const productName = document.createElement("p");
  productName.setAttribute("class", "product-name");

  const productDetails = document.createElement("div");
  productDetails.setAttribute("class", "product-details");

  productName.innerText = garments[i].product_name;
  productPrice.innerHTML = `&pound; ${garments[i].price}.00`;

  var modal_picture = document.createElement("img");
  modal_picture.setAttribute("src", garments[i].image.link);
  modal_picture.setAttribute("src", garments[i].image.alt);
  modal_picture.setAttribute("class", "modal-picture");

  // modal bit
  var closeBtn = document.getElementsByClassName("closeBtn")[0];

  var modal = document.getElementById("simpleModal");

  function displayModal() {
    modal.style = "display: flex";
    $(".carousel-inner").html("");
    garments2.data[garments[i].index].image_groups[0].images.forEach(
      (img, ind) => {
        $(`<div class="carousel-item"><img src=${img.link}></div>`).appendTo(
          ".carousel-inner"
        );
        $(
          '<li data-target="#carousel" data-slide-to="' + ind + '"></li>'
        ).appendTo(".carousel-indicators");
        $(".carousel-item")
          .first()
          .addClass("active");
        $(".carousel-indicators > li")
          .first()
          .addClass("active");
        $("#carousel").carousel();
      }
    );

    garments2.data[garments[i].index].image_groups
      .slice(-1)[0]
      .images.forEach((img, ind) => {
        document.getElementById(
          "g-color"
        ).innerHTML = `<img src=${img.link} />`;
      });
    const size = document.getElementById("sizes");
    size.innerHTML = "";
    garments2.data[garments[i].index].variants.slice(0, 6).forEach(v => {
      let s = document.createElement("div");
      s.innerHTML = v.variation_values.size;
      size.appendChild(s);
    });

    document.querySelector(".name").innerHTML = garments[i].product_name;
    document.querySelector(
      ".price"
    ).innerHTML = `&pound; ${garments[i].price}.00`;
  }

  function closeModal() {
    modal.style = "display: none";
  }

  image.addEventListener("click", () => displayModal(garments[i]));
  closeBtn.addEventListener("click", closeModal);

  productDetails.appendChild(productName);
  productDetails.appendChild(productPrice);
  productDetails.appendChild(image);

  child.appendChild(image);
  child.appendChild(productDetails);

  parentDiv[0].appendChild(child);
  //}
}
