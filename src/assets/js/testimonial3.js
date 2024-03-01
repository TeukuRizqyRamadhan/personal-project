function testimonials() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open("GET", "https://api.npoint.io/1465052a4f4453fb4ba3/data", true);
        xhr.onload = () => {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                resolve(response);
            } else {
                reject(new Error("Error loading data"));
            }
        };

        xhr.onerror = () => {
            reject(new Error("Network Error!"));
        };

        xhr.send();
    });
}

function ContainerTestimonial(testimonialShow) {
    let tagHtml = ``;
    testimonialShow.forEach(function (value) {
        tagHtml += `
          <div class="card">
            <div class="images">
              <img src="${value.image}" alt="" />
              <p class="testy">${value.comment}</p>
              <div class="penulis">
                <p>~ ${value.author}</p>
              </div>
              <div class="rating">
                <p>${value.rate} <i class="fa-solid fa-star"></i></p>
              </div>
            </div>
          </div>`;
    });
    document.querySelector(".container-card").innerHTML = tagHtml;
}

function buttonRating() {
    const buttons = document.querySelectorAll(".rating-button");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const ratingFilter = parseInt(button.dataset.rating);
            let testimonialShow;
            if (ratingFilter === 0) {
                testimonials()
                    .then((data) => {
                        testimonialShow = data;
                        ContainerTestimonial(testimonialShow);
                    })
                    .catch((error) => console.error(error.message));
            } else {
                testimonials()
                    .then((data) => {
                        testimonialShow = data.filter(
                            (testimonial) => testimonial.rating === ratingFilter
                        );
                        ContainerTestimonial(testimonialShow);
                    })
                    .catch((error) => console.error(error.message));
            }
        });
    });
}

function initialize() {
    testimonials()
        .then((data) => {
            ContainerTestimonial(data);
            buttonRating();
        })
        .catch((error) => console.error(error.message));
}

initialize();