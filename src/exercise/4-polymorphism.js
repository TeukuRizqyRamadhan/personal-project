class Vehicle{
    constructor(type){
        this.type=type
    }

    getInfo(){
        return `veihicle is driven`
    }
}

class Car extends Vehicle{
    getInfo(){
        return `Car is driven`
    }
}

class ElectricCar extends Car{
    getInfo(){
        return `ElectricCar is driven`
    }
}

let myVehicle = new Vehicle()
let myCar = new Car()
let myElecticCar = new ElectricCar()

console.log(myVehicle.getInfo());
console.log(myCar.getInfo());
console.log(myElecticCar.getInfo());