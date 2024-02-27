const data = [
    {
        name: "Teuku Rizqy Ramadhan",
        desc: "wkwkwkwkwkwkwkwk",
        image: "https://img001.prntscr.com/file/img001/VT0WQPcsRuGreoXrtP3l8Q.png",
        rating: 3
    },
    {
        name: "Teuku Rizqy Ramadhan",
        desc: "wkwkwkwkwkwkwkwk",
        image: "https://img001.prntscr.com/file/img001/7c3rRAA7Q_CYU_PslOOtCg.png",
        rating: 4
    },
    {
        name: "Teuku Rizqy Ramadhan",
        desc: "wkwkwkwkwkwkwkwk",
        image: "https://img001.prntscr.com/file/img001/33feiWwWTFG5NsfQqxOTvQ.png",
        rating: 5
    }
]

function Testimonial() {
    let htmlInner = ''

    data.forEach(function (data) {
        htmlInner += `
        <div class="card">
        <img src="${data.image}">
        <div class="content-testi">
            <div class="desc-testi">
                <i>"${data.desc}"</i>
            </div>
            <div class="name-testi">
                <p>- ${data.name}</p>
            </div>
        </div>
    </div>
        `
    })

    let containerCard = document.querySelector(".container-card");
    containerCard.innerHTML = htmlInner;
}

Testimonial()

// console.log(data[1].name)

const FilterTestimonial = (rating) => {
    let htmlInner = ''

    const dataFiltered = data.filter((data) => {
        return data.rating === rating
    })

    if (!dataFiltered.length) {
        htmlInner += `<h1> Data tidak ditemukan!</h1>`
    } else {
        dataFiltered.forEach((data) => {
            console.log(data)
            htmlInner += `
            <div class="card">
                <img src="${data.image}">
                <div class="content-testi">
                    <div class="desc-testi">
                        <i>"${data.desc}"</i>
                    </div>
                    <div class="name-testi">
                        <p>- ${data.name}</p>
                    </div>
                </div>
            </div>
            `
        })
    }
    let containerCard = document.querySelector(".container-card");
    containerCard.innerHTML = htmlInner;
}