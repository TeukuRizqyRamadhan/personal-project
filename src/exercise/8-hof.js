const arr = [1, 2, 3, 4, 5, 6]

arr.forEach((data) => console.log('Data ke-' + data))

arr.map((data, index) => {
    return data * 2
})