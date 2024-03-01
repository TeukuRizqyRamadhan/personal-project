const getData = () => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.open("GET", "https://api.npoint.io/1465052a4f4453fb4ba3/data")


        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.response))
            } else {
                reject("error loading data")
            }
        }

        xhr.onerror = () => reject("network error")

        xhr.send()

    })
}

const runData = async () => {
    try {
        const response = await getData()
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}

runData()