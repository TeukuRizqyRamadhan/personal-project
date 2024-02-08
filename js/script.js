function getData() {
let name = document.getElementById("name").value
    email = document.getElementById("email").value
    phone = document.getElementById("phone").value
    subject = document.getElementById("subject").value
    message = document.getElementById("message").value


if (name == "") {
    return alert("Tolong isikan nama terlebih dahulu")
}  else if (email == "") {
    return alert("Tolong isikan email terlebih dahulu")
}  else if (phone == "") {
    return alert("Tolong isikan nomor handphone terlebih dahulu")
}  else if (subject == "") {
    return alert("Tolong isikan judul terlebih dahulu")
}  else if (message == "") {
    return alert("Tolong isikan pesan terlebih dahulu")
}

const emailDestination = "teukurizqyr@gmail.com"
let a = document.createElement("a")
a.href = `mailto:${emailDestination}?subject=${subject}&body= Halo bang nama saya ${name}, pesan saya adalah ${message}, bisakah anda menghubungi saya di ${phone} `
a.click()

const data = {
    name,
    email,
    phone,
    subject,
    message
}

console.log(data)
}