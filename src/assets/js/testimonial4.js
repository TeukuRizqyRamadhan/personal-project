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

function Testimonial(testimonialShow) {
    let htmlInner = ``;
    testimonialShow.forEach(function (value) {
        htmlInner += `
        <div class="card">
        <img src="${value.image}">
        <div class="content-testi">
            <div class="desc-testi">
                <i>"${value.comment}"</i>
            </div>
            <div class="name-testi">
                <p>- ${value.author}</p>
            </div>
            <div class="rating">
                <p>${value.rate} <i class="fa-solid fa-star"></i></p>
              </div>
        </div>
    </div>`;
    });
    let containerCard = document.querySelector(".container-card");
    containerCard.innerHTML = htmlInner;
}

function FilterTestimonial() {
    const buttons = document.querySelectorAll(".rating-btn");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const ratingFilter = parseInt(button.dataset.rate);
            let testimonialShow;
            if (ratingFilter === 0) {
                testimonials()
                    .then((data) => {
                        testimonialShow = data;
                        Testimonial(testimonialShow);
                    })
                    .catch((error) => console.error(error.message));
            } else {
                testimonials()
                    .then((data) => {
                        testimonialShow = data.filter(
                            (testimonial) => testimonial.rate === ratingFilter
                        );
                        Testimonial(testimonialShow);
                    })
                    .catch((error) => console.error(error.message));
            }
        });
    });
}

function initialize() {
    testimonials()
        .then((data) => {
            Testimonial(data);
            FilterTestimonial();
        })
        .catch((error) => console.error(error.message));
}

initialize();