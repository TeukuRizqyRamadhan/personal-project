console.log("system start")

function Stop() {
    console.log("system stop")
}
for (let index = 0; index < 5; index++) {
    ProcessB(index, () => {
        if (index === 4) {
            Stop()
        }
    })
}

function ProcessB(iterasi, callback) {
    setTimeout(() => {
        console.log("process" + iterasi);
        callback()
    }, 1000)
}