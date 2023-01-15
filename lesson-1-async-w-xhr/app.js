(function () {
  /* Select all the elements that we need */
  const form = document.querySelector("#search-form");
  const searchField = document.querySelector("#search-keyword");
  let searchedForText;
  const responseContainer = document.querySelector("#response-container");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    responseContainer.innerHTML = "";
    searchedForText = searchField.value;

    const unsplashRequest = new XMLHttpRequest();
    unsplashRequest.open(
      "GET",
      `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`
    );

    unsplashRequest.setRequestHeader(
      "authorization",
      "Client-ID FDKJEQ79W9ljmSNMBCHH3ln4WRdKhr06kxkfYlN0BPc"
    );

    unsplashRequest.onload = addImage;

    unsplashRequest.send();
  });

  function addImage() {
    let htmlContent = "";
    const data = JSON.parse(this.responseText);
    const firstImage = data.results[0];

    if (data && data.results && firstImage) {
      htmlContent = `<figure>
                    <img src="${firstImage.urls.full}" alt="${searchedForText}" load="lazy"/>
                    <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
                  </figure>`;

      responseContainer.insertAdjacentHTML("beforebegin", htmlContent);
    } else {
      htmlContent = `<div class="error-no-image">No image available</div>`;
    }
  }
})();
