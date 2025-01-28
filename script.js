const lengthUnits = ['inches', 'feet', 'centimeters']; // length units supported in the app
const inCms = { centimeters: 1, inches: 2.54, feet: 30.48 }; // every length unit value in centimeters

const converter = {}; // object storing conversion factors for the length units

for (let fromUnit of lengthUnits) {
    converter[fromUnit] = {};  // for each unit, setting the object storing converters to other units
    for (let toUnit of Object.keys(inCms)) {
        if (fromUnit == toUnit)
            converter[fromUnit][toUnit] = 1;
        else
            converter[fromUnit][toUnit] = inCms[fromUnit] / inCms[toUnit];
    }
}

console.log(converter);

let conversionFactor; // multiplier to convert input value to output value

// selecting dom elements
const fromSelect = document.querySelector('#from');
const toSelect = document.querySelector('#to');
const inputField = document.querySelector('#input-value');
const outputField = document.querySelector('#output-value');

// populating from and to selector form fields
for (let lu of lengthUnits) {
    const option = document.createElement('option');
    option.innerText = lu;
    fromSelect.appendChild(option);
}
fromSelect.options[0].selected = true;

for (let lu of lengthUnits) {
    const option = document.createElement('option');
    option.innerHTML = lu;
    toSelect.appendChild(option);
}
toSelect.options[0].selected = true;

conversionFactor = converter[fromSelect.value][toSelect.value];

fromSelect.addEventListener('change', () => {
    conversionFactor = converter[fromSelect.value][toSelect.value];
    if (inputField.value)
        outputField.value = inputField.value * conversionFactor;
});

toSelect.addEventListener('change', () => {
    conversionFactor = converter[fromSelect.value][toSelect.value];
    if (inputField.value)
        outputField.value = inputField.value * conversionFactor;
});

inputField.addEventListener('input', (e) => {
    let inputValue = e.target.value;
    let outputValue = inputValue * conversionFactor;
    if (outputValue)
        outputField.value = outputValue;
    else
        outputField.value = "";
});         