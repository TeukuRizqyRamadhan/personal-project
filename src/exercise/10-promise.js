// const isSelected = false

// const promise = new Promise((resolve, reject) => {
//     if (isSelected) {
//         resolve("saya akan makan banyak")
//     } else {
//         reject("saya akan mandi")
//     }
// })

// promise.then((data) => console.log(data)).catch((data) => console.log(data))

// const jsonplaceholder = fetch('https://jsonplaceholder.typicode.com/todos/1')
// console.log(jsonplaceholder)

// fetch('https://jsonplaceholder.typicode.com/todos/1')
//     .then(response => response.json())
//     .then(json => console.log(json))
const isSelected = false

const member = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve([
            {
                id: 1,
                name: "Putri Maharani",
                isVip: isSelected
            }
        ])
    }, 1000)
})

const product = new Promise((resolve) => {
    setTimeout(() => {
        resolve([
            {
                id: 1,
                name: "Espresso",
                price: 499000
            }
        ])
    }, 1000)
})

// member.then((data) => console.log(data)).catch((data) => console.log(data))
// product.then((data) => console.log(data)).catch((data) => console.log(data))

Promise.all([member, product]).then((res) => console.log(res)).catch((res) => console.log(res))