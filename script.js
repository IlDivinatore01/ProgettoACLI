document.addEventListener("DOMContentLoaded", function() {

  // Ottieni la data corrente
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", {
      month: "long"
  });
  const currentDay = currentDate.getDate();

  // Funzione per ordinare le bevande in ogni sezione in ordine alfabetico
  function sortBeveragesInSection(section) {
    return section.beverages.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
  }

  // Funzione per aggiungere le bevande predefinite
  function addPredefinedBeverages() {
      const predefinedContainer = document.getElementById("predefined-beverages");

      // Definisci le sezioni con le bevande predefinite
      const predefinedSections = [
        {
          title: "Bevande Gassate",
          beverages: [
            { name: "Coca-Cola" },
            { name: "Pepsi" },
            { name: "Fanta" },
            // Altre bevande gassate
          ],
        },
        {
          title: "Bevande non Gassate",
          beverages: [
            { name: "Acqua", defaultUnit: "scatola" },
            { name: "Tè" },
            { name: "Cedrata" },
            // Altre bevande non gassate
          ],
        },
        // Puoi aggiungere altre sezioni qui
      ];

      // Aggiungi le bevande predefinite suddivise per sezione
      predefinedSections.forEach(function (section) {

        sortBeveragesInSection(section);

        const sectionContainer = document.createElement("div");
        sectionContainer.classList.add("beverage-section");

        const sectionTitle = document.createElement("h2");
        sectionTitle.textContent = section.title;
        sectionContainer.appendChild(sectionTitle);

        const beverageContainer = document.createElement("div");
        beverageContainer.classList.add("form-group");

        section.beverages.forEach(function (beverage) {
          const beverageDiv = document.createElement("div");
          beverageDiv.classList.add("form-group", "beverage-item");
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
          beverageContainer.appendChild(beverageDiv);
        });

        sectionContainer.appendChild(beverageContainer);
        predefinedContainer.appendChild(sectionContainer);
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

  calculateButton.addEventListener("click", function() {
      let text = "";
      const predefinedContainers = document.querySelectorAll('.beverage-section .form-group');
      const dynamicContainers = document.querySelectorAll('#dynamic-fields .form-group');

      // Aggiungi la data all'output con gli stili
      const orderDateElement = document.getElementById("order-date");
      orderDateElement.textContent = `Ordine ${currentDay} ${currentMonth}\n\n`;
      orderDateElement.style.fontWeight = "bold";
      orderDateElement.style.fontSize = "50px"; // Puoi regolare la dimensione del testo a tuo piacimento

      // Imposta l'output dell'ordine
      const output = document.getElementById("output");
      output.textContent = text;

      const addedBeverages = new Set(); // Usiamo un Set per tracciare le bevande già aggiunte

      predefinedContainers.forEach(function(container) {
          const quantity = parseInt(container.querySelector('.quantity').value.trim());
          const unit = container.querySelector('.unit').value;
          const beverageName = container.querySelector('.beverage').value.trim();

          if (!isNaN(quantity) && quantity > 0) {
              const unitText = getUnitText(unit, quantity);
              const beverageText = `${beverageName}: ${quantity} ${unitText}\n`;

              if (!addedBeverages.has(beverageText)) {
                  text += beverageText;
                  addedBeverages.add(beverageText);
              }
          }
      });

      dynamicContainers.forEach(function(container) {
          const quantity = parseInt(container.querySelector('.quantity').value.trim());
          const unit = container.querySelector('.unit').value;
          const beverageName = container.querySelector('.beverage').value.trim();

          if (!isNaN(quantity) && quantity > 0) {
              const unitText = getUnitText(unit, quantity);
              const beverageText = `${beverageName}: ${quantity} ${unitText}\n`;

              if (!addedBeverages.has(beverageText)) {
                  text += beverageText;
                  addedBeverages.add(beverageText);
              }
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

  addBeverageButton.addEventListener("click", function() {
      const newFieldGroup = document.createElement("div");
      newFieldGroup.classList.add("form-group", "beverage-item");

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
      removeFieldButton.addEventListener("click", function() {
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

  copyButton.addEventListener("click", function() {
      // Combina "Ordine + Data" con l'elenco delle bevande
      const orderDate = `Ordine ${currentDay} ${currentMonth}`;
      const textToCopy = `${orderDate}\n${output.textContent}`;

      // Crea un elemento textarea nascosto per copiare il testo
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);

      // Mostra un messaggio di conferma
      alert("Testo copiato negli appunti!");
  });
});



