export function sortBeveragesInSection(section) {
    // Ordina le bevande nella sezione
    section.beverages.sort((a, b) => a.name.localeCompare(b.name));
  }
  
  export function getUnitText(unit, quantity) {
    // Restituisci il testo dell'unità corretto in base alla quantità
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
  
  // Altre funzioni di utilità, se necessarie
  