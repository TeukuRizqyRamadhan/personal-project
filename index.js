import express from 'express';
import { Sequelize, QueryTypes } from "sequelize";
import connection from "./src/config/connection.js";
import bcrypt from 'bcrypt';
import session from 'express-session'
import flash from 'express-flash';
import multer from 'multer';

const app = express()
const port = 3000

const sequelizeConfig = new Sequelize(connection.development)
const multerConfig = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.png')
    }
})
const upload = multer({ storage: multerConfig })

app.set("view engine", "hbs")
app.set("views", "src/views")

app.use("/assets", express.static("src/assets"))
app.use("/uploads", express.static("src/uploads"));
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

// Start Routing

app.get("/", home);
app.get("/project", project);
app.get("/project-detail/:id", projectDetail);
app.get("/add-project", requireLogin, addProject);
app.get("/delete-project/:id", requireLogin, handleDeleteProject);
app.get("/edit-project/:id", requireLogin, editProject);
app.get("/contact", contact);
app.get("/testimonial", testimonial);
app.get("/register", formRegister);
app.get("/login", formLogin);
app.get("/logout", logout);
app.post("/add-project", upload.single("image"), handleAddProject);
app.post("/edit-project/:id", upload.single("image"), handleEditProject);
app.post("/register", register);
app.post("/login", login);

// End Routing

function requireLogin(req, res, next) {
    if (!req.session.isLogin) {
        req.flash('danger', 'You must be logged in to access this page');
        return res.redirect('/login');
    }
    next();
};

async function home(req, res) {
    try {
        const QueryName = "SELECT * FROM projects ORDER BY id DESC"

        const project = await sequelizeConfig.query(QueryName, { type: QueryTypes.SELECT })

        const obj = project.map((data) => {
            return {
                ...data,
                // author: "Teuku Rizqy Ramadhan",
                startDateFormatted: new Date(data.start_date).toLocaleDateString(),
                endDateFormatted: new Date(data.end_date).toLocaleDateString()
            }
        })

        res.render("index", {
            data: obj,
            isLogin: req.session.isLogin,
            user: req.session.user
        });
    } catch (error) {
        console.log(error);
    }
}

async function project(req, res) {
    try {

        if (req.session.isLogin === true) {
            const QueryName = `SELECT p.id, p.title, p.start_date, p.end_date, p.image, p.content, p.node, p.react, p.golang, p.js, p.diff_date, p."updatedAt", u.name AS author 
            FROM projects p 
            LEFT JOIN "users" u ON p.author = u.id 
            WHERE p.author = ${req.session.idUser}
            ORDER BY p.id DESC`;
            const project = await sequelizeConfig.query(QueryName, { type: QueryTypes.SELECT })

            const objLogin = project.map((datas) => {
                return {
                    ...datas,
                    startDateFormatted: new Date(datas.start_date).toLocaleDateString(),
                    endDateFormatted: new Date(datas.end_date).toLocaleDateString()
                }

            })
            res.render("project", {
                datas: objLogin,
                isLogin: req.session.isLogin,
                user: req.session.user
            });
        } else {
            const QueryName = `SELECT p.id, p.title, p.start_date, p.end_date, p.image, p.content, p.node, p.react, p.golang, p.js, p.diff_date, p."updatedAt", u.name AS author FROM projects p LEFT JOIN "users" u ON p.author = u.id ORDER BY id DESC`;


            const project = await sequelizeConfig.query(QueryName, { type: QueryTypes.SELECT })

            const obj = project.map((data) => {
                return {
                    ...data,
                    // author: "Teuku Rizqy Ramadhan",
                    startDateFormatted: new Date(data.start_date).toLocaleDateString(),
                    endDateFormatted: new Date(data.end_date).toLocaleDateString()
                }
            })
            res.render("project", {
                data: obj,
                isLogin: req.session.isLogin,
                user: req.session.user
            });
        }
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
                author: "Teuku Rizqy Ramadhan",
                startDateFormatted: new Date(data.start_date).toLocaleDateString(),
                endDateFormatted: new Date(data.end_date).toLocaleDateString()
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

        if (!name) {
            req.flash('danger', 'Name field cannot be empty')
            return res.redirect("/register")
        }
        if (!email) {
            req.flash('danger', 'Email field cannot be empty')
            return res.redirect("/register")
        }
        if (!password) {
            req.flash('danger', 'Password field cannot be empty')
            return res.redirect("/register")
        }

        const existingUser = await sequelizeConfig.query(`SELECT * FROM users WHERE email = '${email}'`, { type: QueryTypes.SELECT })
        if (existingUser.length > 0) {
            req.flash('danger', 'Email has already been registered')
            return res.redirect("/register")
        }

        bcrypt.hash(password, 10, async function (err, dataHash) {

            if (err) {
                res.redirect("/register");
            } else {
                await sequelizeConfig.query(`INSERT INTO users(
                    name, email, password, "createdAt", "updatedAt")
                    VALUES ('${name}','${email}','${dataHash}', NOW(), NOW())`)
                req.flash('success', 'Account registered successfully')
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

        if (!email && !password) {
            req.flash('danger', 'Input form cannot be empty')
            res.redirect("/login")
        }

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
                    req.session.idUser = isCheckEmail[0].id;
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

const getDurationTime = (start_date, end_date) => {
    const startDateTime = new Date(start_date).getTime();
    const endDateTime = new Date(end_date).getTime();
    let durationTime = endDateTime - startDateTime;

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

async function handleAddProject(req, res) {
    try {
        const { title, content, start_date, end_date, node, react, golang, js } = req.body;
        const author = req.session.idUser;
        const image = req.file.filename;
        if (!title || !content || !image) {
            req.flash('danger', 'Input form must be filled in')
            return res.redirect("/add-project")
        }

        if (start_date == '') {
            req.flash('danger', 'Please input start date')
            return res.redirect("/add-project")
        }
        if (end_date == '') {
            req.flash('danger', 'Please input end date')
            return res.redirect("/add-project")
        }

        if (end_date <= start_date) {
            req.flash('danger', 'End Date must be after Start Date')
            return res.redirect("/add-project")
        }
        const is_node = node ? true : false;
        const is_react = react ? true : false;
        const is_golang = golang ? true : false;
        const is_js = js ? true : false;
        const diff_date = getDurationTime(start_date, end_date);
        const QueryName = `INSERT INTO projects(
            title, start_date, end_date, image, content, node, react, golang, js, diff_date, author, "createdAt", "updatedAt")
            VALUES ('${title}','${start_date}','${end_date}','${image}','${content}', '${is_node}', '${is_react}','${is_golang}','${is_js}', '${diff_date}', '${author}', NOW(), NOW())`;


        await sequelizeConfig.query(QueryName)
        req.flash('success', 'Project added successfully');
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
        req.flash('success', 'Project deleted successfully');
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
        const { title, content, start_date, end_date, node, react, golang, js } = req.body;

        if (!title || !content) {
            req.flash('danger', 'Input form must be filled in');
            return res.redirect(`/edit-project/${id}`);
        }

        if (start_date == '') {
            req.flash('danger', 'Please input start date');
            return res.redirect(`/edit-project/${id}`);
        }
        if (end_date == '') {
            req.flash('danger', 'Please input end date');
            return res.redirect(`/edit-project/${id}`);
        }

        if (end_date <= start_date) {
            req.flash('danger', 'End Date must be after Start Date');
            return res.redirect(`/edit-project/${id}`);
        }
        const is_node = node ? true : false;
        const is_react = react ? true : false;
        const is_golang = golang ? true : false;
        const is_js = js ? true : false;
        const diff_date = getDurationTime(start_date, end_date);

        let image = '';

        if (req.file) {
            image = req.file.filename;
        }

        const QueryName = `
            UPDATE projects 
            SET 
                title = '${title}',
                start_date = '${start_date}',
                end_date = '${end_date}',
                ${image ? `image = '${image}',` : ''}
                content = '${content}',
                node = '${is_node}',
                react = '${is_react}',
                golang = '${is_golang}',
                js = '${is_js}',
                diff_date = '${diff_date}',
                "updatedAt" = NOW()
            WHERE 
                id = ${id}
        `;

        await sequelizeConfig.query(QueryName);
        req.flash('success', 'Project edit successfully');
        res.redirect("/project");

    } catch (error) {
        console.log(error);
    }
}


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})