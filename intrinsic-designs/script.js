// Compiled from script.ts (types removed). Fixed: the price was printed as "$$ {estimate}" instead of "$123.45".
const form = document.getElementById("quoteForm");
const estimateOutput = document.getElementById("estimate");

const materialInput = document.getElementById("material");
const infillInput = document.getElementById("infill");
const layerHeightInput = document.getElementById("layerHeight");
const quantityInput = document.getElementById("quantity");
const widthInput = document.getElementById("width");
const heightInput = document.getElementById("height");
const depthInput = document.getElementById("depth");
const finishInput = document.getElementById("finish");

function calculateEstimate() {
  const material = materialInput?.value || "PLA";
  const infill = Number(infillInput?.value || 20);
  const layerHeight = Number(layerHeightInput?.value || 0.2);
  const quantity = Number(quantityInput?.value || 1);
  const width = Number(widthInput?.value || 10);
  const height = Number(heightInput?.value || 10);
  const depth = Number(depthInput?.value || 10);
  const finish = finishInput?.value || "Standard";

  let basePrice = 15;

  const volumeFactor = (width * height * depth) / 100;
  basePrice += volumeFactor;

  const materialRates = {
    PLA: 1,
    PETG: 1.15,
    ABS: 1.2,
    Resin: 1.35,
    TPU: 1.4
  };

  basePrice *= materialRates[material] || 1;

  if (infill > 20) {
    basePrice += (infill - 20) * 0.4;
  }

  if (layerHeight <= 0.12) {
    basePrice += 12;
  } else if (layerHeight <= 0.16) {
    basePrice += 8;
  } else if (layerHeight >= 0.28) {
    basePrice -= 2;
  }

  const finishRates = {
    Standard: 0,
    Sanded: 10,
    Primed: 18,
    Painted: 35
  };

  basePrice += finishRates[finish] || 0;

  return Math.max(basePrice * quantity, 20);
}

function updateEstimate() {
  if (!estimateOutput) return;
  const estimate = calculateEstimate();
  estimateOutput.textContent = `$${estimate.toFixed(2)}`;
}

[
  materialInput,
  infillInput,
  layerHeightInput,
  quantityInput,
  widthInput,
  heightInput,
  depthInput,
  finishInput
].forEach((field) => {
  field?.addEventListener("input", updateEstimate);
  field?.addEventListener("change", updateEstimate);
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const estimate = calculateEstimate().toFixed(2);

  // Demo only: nothing is sent anywhere, and the email address is not stored.
  alert(
    `Thank you, ${name}! This is a demo site, so no request was sent.\n` +
      `Estimated starting price: $${estimate}`
  );

  form.reset();
  updateEstimate();
});

updateEstimate();
