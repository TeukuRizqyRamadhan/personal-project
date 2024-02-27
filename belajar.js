// Higher-Order Function dengan Callback
function greet(name, callback) {
    return callback("Hello, " + name + "!");
}

function logGreeting(greeting) {
    console.log(greeting);
}

// Menggunakan HOF dan Callback
const greetingMessage = greet("John", logGreeting);
// Output: Hello, John!
