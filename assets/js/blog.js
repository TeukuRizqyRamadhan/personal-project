 let dataBlogs = [];

function addBlog(event) {
  event.preventDefault();

  let title = document.getElementById("input-blog-title").value;
  let desc = document.getElementById("input-blog-desc").value;
  let technologyInput = [...document.querySelectorAll("input[name='technology']:checked")];
  
  let technology = technologyInput.map(item=>item.value)
  
  let durationTime = getDurationTime();

  let dataBlog = {
    title,
    desc,
    technology,
    durationTime
  };
  
  dataBlogs.push(dataBlog);

  // console.log(dataBlogs);

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
        <a href="projectDetail.html?id=${index}" target="_blank return false;">${dataBlogs[index].title}</a>
        </h1>
        <div class="detail-blog-content">
        <p>durasi : ${dataBlogs[index].durationTime}</p>
        </div>
        <p>
        ${dataBlogs[index].desc}
        </p>
        <div class="technology">
        ${dataBlogs[index].technology.map((item)=>`<i class='${item}'></i>`).join(" ")}
        </div>
        <div class="btn-group">
          <button class="button">Edit</button>
          <button class="btn-post">Delete</button>
        </div>
    </div>
    </div>
    </div>
    `;
  }
}

function getDurationTime(){

  let dateStart = document.getElementById("input-blog-start").value;
  let dateEnd = document.getElementById("input-blog-end").value;
  let inputStartDate = new Date(dateStart);
  let inputEndDate = new Date(dateEnd);

  let durationTime = inputEndDate - inputStartDate;

  let milisecond = 1000 // milisecond
  let secondInHour = 3600 // 1 jam = 3600 detik
  let hourInDay = 24 // 1 hari - 24 jam
  let dayInMonth = 30 // 30 hari dalam 1 bulan

  let durationMonth = Math.floor(
    durationTime / (milisecond * secondInHour * hourInDay * dayInMonth)
  );
  
  let durationDay = Math.floor(
    durationTime / (milisecond * secondInHour * hourInDay)
  );

    if (durationMonth > 0){
    return `${durationMonth} bulan`;
  } else if(durationDay > 0) {
    return `${durationDay} hari`;
  }
}