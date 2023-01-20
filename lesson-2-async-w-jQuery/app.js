/* eslint-env jquery */

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
    $.ajax({
      url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
      headers: {
        authorization: "Client-ID FDKJEQ79W9ljmSNMBCHH3ln4WRdKhr06kxkfYlN0BPc",
      },
    }).done(addImage);

    /* Setting up article request */
    $.ajax({
      url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=25UAPkIu3przpAwJsySAKfPwL5VUX2IK`,
    }).done(addArticle);
  }

  function addImage(images) {
    let htmlContent = "";
    const firstImage = images.results[0];

    if (images && images.results && firstImage) {
      htmlContent = `<figure>
                      <img src="${firstImage.urls.full}" alt="${searchedForText}" load="lazy"/>
                      <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
                    </figure>`;
    } else {
      htmlContent = `<div class="error-no-image">No image available</div>`;
    }

    responseContainer.innerHTML = "";
    responseContainer.insertAdjacentHTML("afterbegin", htmlContent);
  }

  function addArticle(articles) {
    let htmlContent = "";

    if (articles && articles.response && articles.response.docs) {
      htmlContent =
        "<ul>" +
        articles.response.docs
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
