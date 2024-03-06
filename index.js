import express from 'express';
const app = express()
const port = 3000

app.set("view engine", "hbs")
app.set("views", "src/views")

app.use("/assets", express.static("src/assets"))
app.use(express.urlencoded({ extended: false }));
// request = dari client ke server
// response = dari server ke client
app.get("/", home);
app.get("/project", project);
app.get("/project-detail/:id", projectDetail);
app.get("/add-project", addProject);
app.post("/add-project", handleAddProject);
app.get("/delete-project/:id", handleDeleteProject);
app.get("/edit-project/:id", editProject);
app.post("/edit-project/:id", handleEditProject);
// app.get("/edit-blog/:id");
// app.post("/edit-blog/:id", a);

// function a(req, res) {
//   const { id } = req.params;
//   const { title, content } = req.body;

//   datas.splice(id, 1, { title, content });

//   res.redirect("/blog");
// }

app.get("/contact", contact);
app.get("/testimonial", testimonial);

const datas = [];

function home(req, res) {
    res.render("index");
}

function project(req, res) {
    res.render("project", { data: datas });
}

function contact(req, res) {
    res.render("contact-me");
}

function projectDetail(req, res) {
    const id = req.params.id;

    if (id >= 0 && id < datas.length) {
        const projectData = datas[id];
        res.render("project-detail", { title: projectData.title, content: projectData.content });
    } else {
        res.status(404).send('Project not found');
    }
}


function addProject(req, res) {
    res.render("add-project");
}

function testimonial(req, res) {
    res.render("testimonial");
}

function handleAddProject(req, res) {
    // const titleData = req.body.title;
    // const content = req.body.content;

    const { title, content, start, end, technology } = req.body;

    datas.push({ title, content, start, end, technology });

    res.redirect("/project");
}

function handleDeleteProject(req, res) {
    const { id } = req.params;

    datas.splice(id, 1);

    res.redirect("/project");
}

function editProject(req, res) {
    const id = req.params.id;

    // Pastikan ID valid dan ada dalam data proyek
    if (id >= 0 && id < datas.length) {
        const projectData = datas[id];
        res.render("edit-project", { id, title: projectData.title, content: projectData.content });
    } else {
        // Handle kasus ID tidak valid
        res.status(404).send('Project not found');
    }
}

function handleEditProject(req, res) {
    const id = req.params.id;

    // Pastikan ID valid dan ada dalam data proyek
    if (id >= 0 && id < datas.length) {
        const { title, content } = req.body;
        datas[id] = { title, content };
        res.redirect("/project");
    } else {
        // Handle kasus ID tidak valid
        res.status(404).send('Project not found');
    }
}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})