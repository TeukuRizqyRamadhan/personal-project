const member = () => {
    return new Promise((resolve, reject) => {
        const time = 1000

        setTimeout(() => {
            if (time <= 5000) {
                resolve("continue")
            } else {
                reject("time's up")
            }
        }, 4000)
    })
}

const runRental = async () => {
    try {
        const response = await member()
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}

runRental()