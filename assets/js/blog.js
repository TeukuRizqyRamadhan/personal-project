let dataBlogs = [];

function addBlog(event) {
  event.preventDefault();

  let title = document.getElementById("input-blog-title").value;
  let datestart = document.getElementById("input-blog-start").value;
  let dateend = document.getElementById("input-blog-end").value;
  let desc = document.getElementById("input-blog-desc").value;
  let technologyInput = [...document.querySelectorAll("input[name='technology']:checked")];
  
  let technology = technologyInput.map(item=>item.value)

  let dataBlog = {
    title,
    datestart,
    dateend,
    desc,
    technology
  };
  
  dataBlogs.push(dataBlog);

  console.log(dataBlogs);

  renderBlog();

}

function renderBlog() {
  document.getElementById("contents").innerHTML = "";

  for (let index = 0; index < dataBlogs.length; index++) {
    document.getElementById("contents").innerHTML += `
    <div class="container">
    <div class="card">
        <img src="assets/img/blog-img.png">
        <div class="blog-content">
        <h1 id"title-h1">
        <a href="projectDetail.html" target="_blank"
        >${dataBlogs[index].title}</a>
        </h1>
        <div class="detail-blog-content">
        <p>durasi : 3 bulan</p>
        </div>
        <p>
        ${dataBlogs[index].desc}
        </p>
        <div class="technology">
        ${dataBlogs[index].technology.map((item)=>`<i class='${item}'></i>`).join(" ")}
        </div>
        <div class="btn-group">
          <button class="button">Edit Post</button>
          <button class="btn-post">Delete Post</button>
        </div>
    </div>
    </div>
    </div>
    `;
  }
}
// function renderDetail(id) {
// }

// const sayHello = (data) => {
//   return `<i class='${data}'></i>`
// }

// (item) => {
//   return `<i class='${item}'></i>`
// }

// (data) => `<i class='${data}'></i>`

// data => `<i class='${data}'></i>`


// function (item) {
//   return `<i class='${item}'></i>`
// }

// let technology = []

// let technologyInput = [...document.querySelectorAll("input[name='technology']:checked")];
// let initechnology2 = ["fa-brands fa-node fa-2xl", "fa-brands fa-golang fa-2xl"]

// let technologyInput2 = [document.querySelectorAll("input[name='technology']:checked")];
// let technology2 = ["fa-brands fa-golang fa-2xl"]

// = : 
// let myName = "Teuku Rizqy Ramadhan"

// myName = "Samsul"

// ==
// 0 == "0" : true 


// ===z