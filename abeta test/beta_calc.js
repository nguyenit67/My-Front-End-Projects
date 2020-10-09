const betaCalc = new class {
  currentValue = 0;

  setValue(newValue) {
    this.currentValue = newValue;
    console.log("Init", this.currentValue);
  }

  plus(addend) {
    this.setValue(this.currentValue + addend);

  }
}