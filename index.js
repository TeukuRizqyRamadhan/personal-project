import express from 'express';
const app = express()
const port = 3000

app.set("view engine", "hbs")
app.set("views", "src/views")

app.use("/assets", express.static("src/assets"))
// request = dari client ke server
// response = dari server ke client
app.get('/project', (req, res) => {
    res.render("project")
})
app.get('/', (req, res) => {
    res.render("index")
})
app.get('/contact', (req, res) => {
    res.render("contact-me")
})
app.get('/testimonial', (req, res) => {
    res.render("testimonial")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})