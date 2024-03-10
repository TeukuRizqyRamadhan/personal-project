import express from 'express';
import { Sequelize, QueryTypes } from "sequelize";
import connection from "./src/config/connection.js";
import bcrypt from 'bcrypt';
import session from 'express-session'
import flash from 'express-flash';
const app = express()
const port = 3000

const sequelizeConfig = new Sequelize(connection.development)

app.set("view engine", "hbs")
app.set("views", "src/views")

app.use("/assets", express.static("src/assets"))
app.use(express.urlencoded({ extended: false }));

app.use(flash());

app.use(
    session({
        cookie: {
            maxAge: 1000 * 60 * 60,
            httpOnly: true,
            secure: false, // https => http
        },
        store: new session.MemoryStore(),
        saveUninitialized: true,
        resave: false,
        secret: "pinjamduluseratus",
    })
);
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
app.get("/contact", contact);
app.get("/testimonial", testimonial);
app.get("/register", formRegister);
app.post("/register", register);
app.get("/login", formLogin);
app.post("/login", login);
app.get("/logout", logout);


function home(req, res) {

    res.render("index", {
        isLogin: req.session.isLogin,
        user: req.session.user,
    });
}

async function project(req, res) {
    try {
        const QueryName = "SELECT * FROM projects ORDER BY id DESC"

        const project = await sequelizeConfig.query(QueryName, { type: QueryTypes.SELECT })

        const obj = project.map((data) => {
            return {
                ...data,
                author: "Putri Maharani Chan"
            }
        })

        res.render("project", {
            data: obj,
            isLogin: req.session.isLogin,
            user: req.session.user
        });
    } catch (error) {
        console.log(error);
    }
}

function contact(req, res) {
    res.render("contact-me", {
        isLogin: req.session.isLogin,
        user: req.session.user
    });
}

async function projectDetail(req, res) {
    try {
        const id = req.params.id;
        const QueryName = `SELECT * FROM projects where id=${id}`

        const project = await sequelizeConfig.query(QueryName, { type: QueryTypes.SELECT })
        const obj = project.map((data) => {
            return {
                ...data,
                author: "Putri Maharani Chan"
            }
        })
        res.render("project-detail", {
            data: obj[0],
            isLogin: req.session.isLogin,
            user: req.session.user
        });
    } catch (error) {
        console.log(error);
    }
}


function addProject(req, res) {
    res.render("add-project", {
        isLogin: req.session.isLogin,
        user: req.session.user,
    });
}

function testimonial(req, res) {
    res.render("testimonial");
}

function formRegister(req, res) {

    res.render('register')
}

async function register(req, res) {
    try {
        const { name, email, password } = req.body

        bcrypt.hash(password, 10, async function (err, dataHash) {

            if (err) {
                res.redirect("/register");
            } else {
                await sequelizeConfig.query(`INSERT INTO users(
                    name, email, password, "createdAt", "updatedAt")
                    VALUES ('${name}','${email}','${dataHash}', NOW(), NOW())`)
                res.redirect("/");

            }
        })
    } catch (error) {
        console.log(error)
    }
}

function formLogin(req, res) {

    res.render('login')
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const queryName = `SELECT * FROM users WHERE email = '${email}'`

        const isCheckEmail = await sequelizeConfig.query(queryName, { type: QueryTypes.SELECT })
        if (!isCheckEmail.length) {
            req.flash('danger', 'Email has not been registered')
            return res.redirect("/login")

        }
        await bcrypt.compare(
            password,
            isCheckEmail[0].password,
            function (err, result) {
                if (!result) {
                    req.flash("danger", "Password wrong");
                    return res.redirect("/login");
                } else {
                    req.session.isLogin = true;
                    req.session.user = isCheckEmail[0].name;
                    req.flash("succes", "login success");

                    return res.redirect("/");
                }
            }
        );
    } catch (error) {
        console.log(error);
    }
}

// ...


// ...

function logout(req, res) {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/login");
        }
    });
}

async function handleAddProject(req, res) {
    try {
        // const titleData = req.body.title;
        // const content = req.body.content;
        const { title, content, startDate, endDate, node, react, golang, js } = req.body;
        const is_node = node ? true : false;
        const is_react = react ? true : false;
        const is_golang = golang ? true : false;
        const is_js = js ? true : false;
        const image = "https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon.png?v=c78bd457575a"
        const QueryName = `INSERT INTO projects(
            title, image, content, node, react, golang, js, "createdAt", "updatedAt")
            VALUES ('${title}','${image}','${content}', '${is_node}', '${is_react}','${is_golang}','${is_js}',NOW(), NOW())`;


        await sequelizeConfig.query(QueryName)
        res.redirect("/project");
    } catch (error) {
        console.log(error)
    }
}

async function handleDeleteProject(req, res) {
    try {
        const { id } = req.params;
        const QueryName = `DELETE FROM projects WHERE id = ${id}`;

        await sequelizeConfig.query(QueryName)

        res.redirect("/project");
    } catch (error) {
        console.log(error);
    }
}

async function editProject(req, res) {
    try {
        const id = req.params.id;
        const QueryName = `SELECT * FROM projects where id=${id}`

        const project = await sequelizeConfig.query(QueryName, { type: QueryTypes.SELECT })
        const obj = project.map((data) => {
            return {
                ...data
            }
        })
        console.log(obj);


        res.render("edit-project", {
            data: obj[0],
            isLogin: req.session.isLogin,
            user: req.session.user
        });
    } catch (error) {
        console.log(error);
    }
}

async function handleEditProject(req, res) {
    try {
        const { id } = req.params;
        const { title, content, start, end, node, react, golang, js } = req.body;
        const is_node = node ? true : false;
        const is_react = react ? true : false;
        const is_golang = golang ? true : false;
        const is_js = js ? true : false;

        // Jika Anda ingin memperbarui data selain judul dan konten, sesuaikan dengan kebutuhan
        const QueryName = `
            UPDATE projects 
            SET 
                title = '${title}',
                content = '${content}',
                node = '${is_node}',
                react = '${is_react}',
                golang = '${is_golang}',
                js = '${is_js}',
                "updatedAt" = NOW()
            WHERE 
                id = ${id}
        `;

        await sequelizeConfig.query(QueryName);

        res.redirect("/project");
    } catch (error) {
        console.log(error);
    }
}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})