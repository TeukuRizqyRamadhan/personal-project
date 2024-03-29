class Car {
    // properties
    constructor(brand, model) {
        this.brand = brand;
        this.model = model;
    }

    //methods
    getInfo(){
        return `The car is ${this.brand} & model of the car is ${this.model}`
    }
}

// inheritence
class ElectricCar extends Car{
    //properties
    constructor(brand,model, batteryCapacity){
    super(brand, model)
    this.batteryCapacity = batteryCapacity
    }

    getInformation(){
        return `${super.getInfo()}, it has battery capacity ${this.batteryCapacity} KwH`
    }
}

let myElecticCar = new ElectricCar("Tesla", "Model S", 300)
console.log(myElecticCar.getInformation());