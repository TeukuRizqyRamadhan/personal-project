let dataProjects = [];

function addProject(event) {
  event.preventDefault();

  let title = document.getElementById("input-project-title").value;
  let desc = document.getElementById("input-project-desc").value;
  let technologyInput = [...document.querySelectorAll("input[name='technology']:checked")];

  let technology = technologyInput.map(item => item.value)

  let durationTime = getDurationTime();

  let dataProject = {
    title,
    desc,
    technology,
    durationTime
  };

  dataProjects.push(dataProject);

  // console.log(dataProjects);

  renderProject();

}

function renderProject() {
  document.getElementById("contents").innerHTML = "";

  for (let index = 0; index < dataProjects.length; index++) {

    document.getElementById("contents").innerHTML += `
    <div class="container">
    <div class="card">
        <img src="assets/img/blog-img.png">
        <div class="project-content">
        <h1 id"title-h1">
        <a href="projectDetail.html?id=${index}" target="_blank return false;">${dataProjects[index].title}</a>
        </h1>
        <div class="detail-project-content">
        <p>durasi : ${dataProjects[index].durationTime}</p>
        </div>
        <p>
        ${dataProjects[index].desc}
        </p>
        <div class="technology">
        ${dataProjects[index].technology.map((item) => `<i class='${item}'></i>`).join(" ")}
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

function getDurationTime() {

  let dateStart = document.getElementById("input-project-start").value;
  let dateEnd = document.getElementById("input-project-end").value;
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

  if (durationMonth > 0) {
    return `${durationMonth} bulan`;
  } else if (durationDay > 0) {
    return `${durationDay} hari`;
  }
}