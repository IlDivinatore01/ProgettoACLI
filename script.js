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
      const units = document.querySelectorAll(".unit");
  
      for (let i = 0; i < quantities.length; i++) {
        const quantity = parseInt(quantities[i].value.trim());
        const beverageInput = document.querySelector(`#beverage${i + 1}`);
        const unit = units[i].value;
  
        if (!isNaN(quantity) && quantity >= 0 && beverageInput) {
          const beverageName = beverageInput.value.trim();
          const unitText = getUnitText(unit, quantity);
          text += `${beverageName}: ${quantity} ${unitText}\n`;
        }
      }
  
      const dynamicQuantityInputs = document.querySelectorAll("#dynamic-fields .quantity");
      const dynamicBeverageInputs = document.querySelectorAll("#dynamic-fields .beverage");
      const dynamicUnits = document.querySelectorAll("#dynamic-fields .unit");
  
      dynamicQuantityInputs.forEach(function (dynamicQuantityInput, index) {
        const quantity = parseInt(dynamicQuantityInput.value.trim());
        const beverageInput = dynamicBeverageInputs[index];
        const unit = dynamicUnits[index].value;
  
        if (!isNaN(quantity) && quantity >= 0 && beverageInput) {
          const beverageName = beverageInput.value.trim();
          const unitText = getUnitText(unit, quantity);
          text += `${beverageName}: ${quantity} ${unitText}\n`;
        }
      });
  
      if (text) {
        result.classList.remove("hidden");
        output.textContent = text;
      } else {
        result.classList.add("hidden");
      }
    });
  
    function getUnitText(unit, quantity) {
      if (quantity === 1) {
        return unit;
      } else {
        if (unit === "scatola") {
          return "scatole";
        } else if (unit === "bottiglia") {
          return "bottiglie";
        } else if (unit === "pacco") {
          return "pacchi";
        }
      }
    }
  
    addBeverageButton.addEventListener("click", function () {
      const newFieldGroup = document.createElement("div");
      newFieldGroup.classList.add("form-group");
  
      const newInputGroup = document.createElement("div");
      newInputGroup.classList.add("input-group");
  
      const newBeverageInput = document.createElement("input");
      newBeverageInput.type = "text";
      newBeverageInput.classList.add("beverage");
      newBeverageInput.placeholder = "Nome Bevanda";
  
      const newQuantityInput = document.createElement("input");
      newQuantityInput.type = "number";
      newQuantityInput.classList.add("quantity");
      newQuantityInput.placeholder = "Quantità";
  
      const newUnitSelect = document.createElement("select");
      newUnitSelect.classList.add("unit");
      const optionBottiglia = document.createElement("option");
      optionBottiglia.value = "bottiglia";
      optionBottiglia.textContent = "Bottiglia";
      const optionScatola = document.createElement("option");
      optionScatola.value = "scatola";
      optionScatola.textContent = "Scatola";
      const optionPacco = document.createElement("option");
      optionPacco.value = "pacco";
      optionPacco.textContent = "Pacco";
      newUnitSelect.appendChild(optionBottiglia);
      newUnitSelect.appendChild(optionScatola);
      newUnitSelect.appendChild(optionPacco);
  
      const removeFieldButton = document.createElement("button");
      removeFieldButton.textContent = "Rimuovi Campo";
      removeFieldButton.addEventListener("click", function () {
        dynamicFields.removeChild(newFieldGroup);
      });
  
      newInputGroup.appendChild(newBeverageInput);
      newInputGroup.appendChild(newQuantityInput);
      newInputGroup.appendChild(newUnitSelect);
      newFieldGroup.appendChild(newInputGroup);
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
  