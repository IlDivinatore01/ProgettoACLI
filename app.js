import { sortBeveragesInSection, getUnitText } from './utils.js';

export function initialize() {
  // Inizializzazione del codice dell'applicazione, inclusi i gestori degli eventi
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentDay = currentDate.getDate();

  const predefinedContainers = document.querySelectorAll('.beverage-section .form-group');
  let sections;

  // Gestore per l'evento di input nella barra di ricerca
  function handleSearchInput() {
    const searchInput = document.getElementById("search-input");
    console.log("Evento input chiamato");
    const searchQuery = searchInput.value.trim().toLowerCase();

    predefinedContainers.forEach(container => {
      const beverages = container.querySelectorAll('.beverage');
      let found = false;
      const section = container.closest('.beverage-section');

      beverages.forEach(beverage => {
        const beverageName = beverage.value.toLowerCase();
        const beverageDiv = beverage.closest('.form-group');

        if (beverageName.includes(searchQuery)) {
          beverageDiv.style.display = "block";
          found = true;
        } else {
          beverageDiv.style.display = "none";
        }
      });

      if (found) {
        section.style.display = "block";
      } else {
        section.style.display = "none";
      }
    });
  }

  // Gestore per il clic sul pulsante di calcolo
  function handleCalculateClick() {
    console.log("handleCalculateClick() avviato");
    let text = "";
    const addedBeverages = new Set();
    const dynamicContainers = document.querySelectorAll('#dynamic-fields .form-group');

    const orderDateElement = document.getElementById("order-date");
    orderDateElement.textContent = `Ordine ${currentDay} ${currentMonth}\n\n`;
    orderDateElement.style.fontWeight = "bold";
    orderDateElement.style.fontSize = "50px";

    const output = document.getElementById("output");
    output.textContent = text;

    console.log("Numero di predefinedContainers:", predefinedContainers.length);

    predefinedContainers.forEach(container => {
      const quantity = parseInt(container.querySelector('.quantity').value.trim());
      const unit = container.querySelector('.unit').value;
      const beverageName = container.querySelector('.beverage').value.trim();

      console.log(container); // Stampa l'elemento HTML selezionato
      console.log(quantity, unit, beverageName)

      if (!isNaN(quantity) && quantity > 0) {
        const unitText = getUnitText(unit, quantity);
        const beverageText = `${beverageName}: ${quantity} ${unitText}\n`;

        if (!addedBeverages.has(beverageText)) {
          text += beverageText;
          addedBeverages.add(beverageText);
        }
        console.log("handleCalculateClick() completato");
      }
    });

    dynamicContainers.forEach(container => {
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
  }

  // Gestore per il clic sul pulsante di copia
  function handleCopyClick() {
    const orderDate = `Ordine ${currentDay} ${currentMonth}`;
    const textToCopy = `${orderDate}\n${output.textContent}`;

    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    alert("Testo copiato negli appunti!");
  }

  // Gestore per il clic sul pulsante "Aggiungi Bevanda"
  function handleAddBeverageClick() {
    const newFieldGroup = document.createElement("div");
    newFieldGroup.classList.add("form-group", "beverage-item");

    const newInputGroup = document.createElement("div");
    newInputGroup.classList.add("input-group");

    const newBeverageInput = createInputElement("text", "Nome Bevanda", "beverage");
    const newQuantityInput = createInputElement("number", "Quantità", "quantity");
    const newUnitSelect = createUnitSelectElement();

    const removeFieldButton = document.createElement("button");
    removeFieldButton.textContent = "Rimuovi Campo";
    removeFieldButton.addEventListener("click", () => dynamicFields.removeChild(newFieldGroup));

    newInputGroup.appendChild(newBeverageInput);
    newInputGroup.appendChild(newQuantityInput);
    newInputGroup.appendChild(newUnitSelect);
    newFieldGroup.appendChild(newInputGroup);
    newFieldGroup.appendChild(removeFieldButton);

    dynamicFields.appendChild(newFieldGroup);
    dynamicFieldIndex++;
  }

  // Creazione di un elemento di input
  function createInputElement(type, placeholder, className) {
    const input = document.createElement("input");
    input.type = type;
    input.classList.add(className);
    input.placeholder = placeholder;
    return input;
  }

  // Creazione di un elemento select per le unità
  function createUnitSelectElement() {
    const select = document.createElement("select");
    select.classList.add("unit");

    const units = ["Bottiglia", "Scatola", "Pacco"];

    units.forEach(unit => {
      const option = document.createElement("option");
      option.value = unit.toLowerCase();
      option.textContent = unit;
      select.appendChild(option);
    });

    return select;
  }

  // Altre funzioni di inizializzazione e gestione degli eventi

  const searchInput = document.getElementById("search-input");
  const calculateButton = document.getElementById("calculate-button");
  const result = document.getElementById("result");
  const output = document.getElementById("output");
  const copyButton = document.getElementById("copy-button");
  const addBeverageButton = document.getElementById("add-beverage");
  const dynamicFields = document.getElementById("dynamic-fields");
  let dynamicFieldIndex = 1;

  searchInput.addEventListener("input", handleSearchInput);
  calculateButton.addEventListener("click", handleCalculateClick);
  copyButton.addEventListener("click", handleCopyClick);
  addBeverageButton.addEventListener("click", handleAddBeverageClick);

  // Carica il file JSON
  fetch('bevande.json')
    .then(response => response.json())
    .then(data => {
      sections = data.sections;
      addPredefinedBeverages();
    })
    .catch(error => {
      console.error('Si è verificato un errore nel caricamento del file JSON:', error);
    });

  function addPredefinedBeverages() {
    const predefinedContainer = document.getElementById("predefined-beverages");

    sections.forEach(section => {
      sortBeveragesInSection(section);

      const sectionContainer = document.createElement("div");
      sectionContainer.classList.add("beverage-section");

      const sectionTitle = document.createElement("h2");
      sectionTitle.textContent = section.title;
      sectionContainer.appendChild(sectionTitle);

      const beverageContainer = document.createElement("div");
      beverageContainer.classList.add("form-group");

      section.beverages.forEach(beverage => {
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
    
 // Alla fine della funzione, verifica quali bevande predefinite sono presenti
 const predefinedBeverages = predefinedContainer.querySelectorAll('.beverage');

 console.log("Numero di bevande predefinite:", predefinedBeverages.length);
 console.log("Bevande predefinite presenti:");
 predefinedBeverages.forEach(beverage => {
   console.log(beverage.value);
 });

  }
}


