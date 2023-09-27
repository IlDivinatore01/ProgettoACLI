document.addEventListener("DOMContentLoaded", function () {

const calculateButton = document.getElementById("calculate-button");
const result = document.getElementById("result");
const output = document.getElementById("output");
const copyButton = document.getElementById("copy-button");
const addBeverageButton = document.getElementById("add-beverage");
const dynamicFields = document.getElementById("dynamic-fields");
let dynamicFieldIndex = 1;

calculateButton.addEventListener("click", function () {
    let text = "";
    const quantities = document.querySelectorAll(".quantity");

    for (let i = 0; i < quantities.length; i++) {
        const quantity = quantities[i].value.trim();
        const beverageInput = document.querySelector(`#beverage${i + 1}`);
        
        if (quantity && beverageInput) {
            const beverageName = beverageInput.value.trim();
            const unit = getUnit(beverageName, parseInt(quantity));
            text += `${beverageName}: ${quantity} ${unit}\n`;
        }
    }

    // Aggiungi qui il codice per gestire i campi dinamici
    const dynamicQuantityInputs = document.querySelectorAll("#dynamic-fields .quantity");
    const dynamicBeverageInputs = document.querySelectorAll("#dynamic-fields .beverage");

    dynamicQuantityInputs.forEach(function (dynamicQuantityInput, index) {
        const quantity = dynamicQuantityInput.value.trim();
        const beverageInput = dynamicBeverageInputs[index];
        
        if (quantity && beverageInput) {
            const beverageName = beverageInput.value.trim();
            const unit = getUnit(beverageName, parseInt(quantity));
            text += `${beverageName}: ${quantity} ${unit}\n`;
        }
    });

    if (text) {
        result.classList.remove("hidden");
        output.textContent = text;
    } else {
        result.classList.add("hidden");
    }
});

// Funzione per ottenere l'unità corretta basata sul nome della bevanda
function getUnit(beverageName, quantity) {
    if (beverageName.toLowerCase() === "coca-cola") {
        return quantity === 1 ? "bottiglia" : "bottiglie";
    } else if (beverageName.toLowerCase() === "pepsi") {
        return quantity === 1 ? "scatola" : "scatole";
    } else {
        return quantity === 1 ? "unità" : "unità"; // Puoi personalizzare per altre bevande
    }
}



addBeverageButton.addEventListener("click", function () {
    const newFieldGroup = document.createElement("div");
    newFieldGroup.classList.add("form-group");

    const newBeverageLabel = document.createElement("label");
    newBeverageLabel.textContent = `Bevanda ${dynamicFieldIndex + 2}:`;

    const newBeverageInput = document.createElement("input");
    newBeverageInput.type = "text";
    newBeverageInput.classList.add("beverage");
    newBeverageInput.placeholder = "Nome Bevanda";

    const newQuantityInput = document.createElement("input");
    newQuantityInput.type = "number";
    newQuantityInput.classList.add("quantity");
    newQuantityInput.placeholder = "Quantità";

    const removeFieldButton = document.createElement("button");
    removeFieldButton.textContent = "Rimuovi Campo";
    removeFieldButton.addEventListener("click", function () {
        // Codice per rimuovere questo gruppo di campi dinamici
        dynamicFields.removeChild(newFieldGroup);
    });


    newFieldGroup.appendChild(newBeverageLabel);
    newFieldGroup.appendChild(newBeverageInput);
    newFieldGroup.appendChild(newQuantityInput);
    newFieldGroup.appendChild(removeFieldButton);

    dynamicFields.appendChild(newFieldGroup);
    dynamicFieldIndex++;
});

copyButton.addEventListener("click", function () {
    const textToCopy = output.textContent;
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    alert("Testo copiato negli appunti!");
});

});


