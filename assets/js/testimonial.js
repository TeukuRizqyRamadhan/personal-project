class Testimonial {
    // properties
    constructor(image, desc, name) {
        this.image = image;
        this.desc = desc;
        this.name = name;
    }

    get cardHtml() {
        return `<div class="card">
                    <img src="${this.image}">
                        <div class="content-testi">
                        <div class="desc-testi">
                        <i>"${this.desc}"</i>
                        </div>
                        <div class="name-testi">
                         <p>- ${this.name}</p>
                       </div>
                    </div>
                </div>`;
    }
}

class TestimonialCard extends Testimonial {
    get cardHtml() {
        return `<div class="card">
        <img src="${this.image}">
            <div class="content-testi">
            <div class="desc-testi">
            <p>"${this.desc}"</p>
            </div>
            <div class="name-testi">
             <p>- ${this.name}</p>
           </div>
        </div>
    </div>`;
    }
}

const testimonials = [
    new Testimonial(
        "https://img001.prntscr.com/file/img001/33feiWwWTFG5NsfQqxOTvQ.png",
        "wkwkwkwkwkwkwkwk",
        "Teuku Rizqy Ramadhan"
    ),
    new Testimonial(
        "https://img001.prntscr.com/file/img001/7c3rRAA7Q_CYU_PslOOtCg.png",
        "wkwkwkwkwkwkwkwk",
        "Teuku Rizqy Ramadhan"
    ),
    new Testimonial(
        "https://img001.prntscr.com/file/img001/VT0WQPcsRuGreoXrtP3l8Q.png",
        "wkwkwkwkwkwkwkwk",
        "Teuku Rizqy Ramadhan"
    ),
];

let htmlInner = "";

for (let index = 0; index < testimonials.length; index++) {
    htmlInner += testimonials[index].cardHtml;
}

let containerCard = document.querySelector(".container-card");
containerCard.innerHTML = htmlInner;
