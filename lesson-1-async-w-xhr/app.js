(function () {
  /* Select all the elements that we need */
  const form = document.querySelector("#search-form");
  const searchField = document.querySelector("#search-keyword");
  let searchedForText;
  const responseContainer = document.querySelector("#response-container");

  form.addEventListener("submit", requestHandler);

  function requestHandler(e) {
    e.preventDefault();
    responseContainer.innerHTML = "";
    searchedForText = searchField.value;

    /* Setting up image request */
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

    /* Setting up article request */
    const nytHttpRequest = new XMLHttpRequest();
    nytHttpRequest.open(
      "GET",
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=25UAPkIu3przpAwJsySAKfPwL5VUX2IK`
    );

    nytHttpRequest.onload = addArticle;

    /* Send out the requests */
    unsplashRequest.send();
    nytHttpRequest.send();
  }

  function addImage() {
    let htmlContent = "";
    const data = JSON.parse(this.responseText);
    const firstImage = data.results[0];

    if (data && data.results && firstImage) {
      htmlContent = `<figure>
                    <img src="${firstImage.urls.full}" alt="${searchedForText}" load="lazy"/>
                    <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
                  </figure>`;
    } else {
      htmlContent = `<div class="error-no-image">No image available</div>`;
    }

    responseContainer.insertAdjacentHTML("beforebegin", htmlContent);
  }

  function addArticle() {
    let htmlContent = "";
    const data = JSON.parse(this.responseText);
    console.log(data.response.docs);

    if (data && data.response && data.response.docs) {
      htmlContent =
        "<ul>" +
        data.response.docs
          .map(function (article) {
            return `<li class="article">
          <h2><a href="${article.web_url}" target="_blank">${article.headline.main}</a></h2>
          <p>${article.snippet}</p>
      </li>`;
          })
          .join("") +
        "</ul>";
    } else {
      htmlContent = `<div class="error-no-image">No image available</div>`;
    }

    responseContainer.insertAdjacentHTML("beforeend", htmlContent);
  }
})();
