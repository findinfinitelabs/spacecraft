class Sensor {
    constructor(name, min, max) {
      this.name = name;
      this.min = min;
      this.max = max;
    }
  
    read() {
      return Math.floor(Math.random() * (this.max - this.min + 1) + this.min);
    }
  }
  
  module.exports = Sensor;
  