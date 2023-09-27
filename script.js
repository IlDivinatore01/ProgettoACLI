document.addEventListener("DOMContentLoaded", function () {
    // Funzione per aggiungere le bevande predefinite
    function addPredefinedBeverages() {
      const predefinedContainer = document.getElementById("predefined-beverages");
  
      const predefinedBeverages = [
        { name: "Coca-Cola" },
        { name: "Pepsi" },
        { name: "Fanta" },
        { name: "Acqua", defaultUnit: "scatola"},
        { name: "Tè" },
        // Aggiungi altre bevande predefinite qui
      ];
  
      predefinedBeverages.forEach(function (beverage, index) {
        const beverageDiv = document.createElement("div");
        beverageDiv.classList.add("form-group");
        beverageDiv.innerHTML = `
          <div class="input-group">
            <input type="text" class="beverage form-control" value="${beverage.name}" readonly>
            <input type="number" class="quantity form-control" placeholder="Quantità">
            <select class="unit form-control">
            <option value="bottiglia" ${beverage.defaultUnit === "bottiglia" ? 'selected' : ''}>Bottiglia</option>
            <option value="scatola" ${beverage.defaultUnit === "scatola" ? 'selected' : ''}>Scatola</option>
            <option value="pacco" ${beverage.defaultUnit === "pacco" ? 'selected' : ''}>Pacco</option>
            </select>
          </div>
        `;
        predefinedContainer.appendChild(beverageDiv);
      });
    }
  
    addPredefinedBeverages();
  
    const calculateButton = document.getElementById("calculate-button");
    const result = document.getElementById("result");
    const output = document.getElementById("output");
    const copyButton = document.getElementById("copy-button");
    const addBeverageButton = document.getElementById("add-beverage");
    const dynamicFields = document.getElementById("dynamic-fields");
    let dynamicFieldIndex = 1;
  
    calculateButton.addEventListener("click", function () {
      let text = "";
      const predefinedContainers = document.querySelectorAll('#predefined-beverages .form-group');
      const dynamicContainers = document.querySelectorAll('#dynamic-fields .form-group');
  
      predefinedContainers.forEach(function (container) {
        const quantity = parseInt(container.querySelector('.quantity').value.trim());
        const unit = container.querySelector('.unit').value;
        const beverageName = container.querySelector('.beverage').value.trim();
  
        if (!isNaN(quantity) && quantity > 0) {
          const unitText = getUnitText(unit, quantity);
          text += `${beverageName}: ${quantity} ${unitText}\n`;
        }
      });
  
      dynamicContainers.forEach(function (container) {
        const quantity = parseInt(container.querySelector('.quantity').value.trim());
        const unit = container.querySelector('.unit').value;
        const beverageName = container.querySelector('.beverage').value.trim();
  
        if (!isNaN(quantity) && quantity > 0) {
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
  