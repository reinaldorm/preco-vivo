import './raw.css';
import './main.scss';

const motherboard = document.getElementById('motherboard');
const gpu = document.getElementById('gpu');
const cpu = document.getElementById('cpu');

function createProductElement({ titleText, rawPriceText, finalPriceText, linkText, tag }) {
  const productDiv = document.createElement('div');
  const imageUrl = `https://cdn.pcbuildwizard.com/images/products/${tag}-1-m.webp`;
  productDiv.className = 'product';

  const img = document.createElement('img');
  img.src = imageUrl;
  img.className = 'thumb';

  const infoDiv = document.createElement('div');
  infoDiv.className = 'info';

  const title = document.createElement('h2');
  title.className = 'title';
  title.textContent = titleText;

  const priceDiv = document.createElement('div');
  priceDiv.className = 'price';

  const rawPrice = document.createElement('p');
  rawPrice.className = 'raw';
  rawPrice.textContent = 'R$ ' + rawPriceText;

  const finalPrice = document.createElement('p');
  finalPrice.className = 'final';
  finalPrice.textContent = 'R$ ' + finalPriceText;

  const linkElement = document.createElement('a');
  linkElement.className = 'link';
  linkElement.href = linkText;
  linkElement.target = '_blank';
  linkElement.textContent = 'Ir pra loja';

  if (rawPriceText == finalPriceText) rawPrice.hidden = true;

  // Assemble the structure
  priceDiv.appendChild(rawPrice);
  priceDiv.appendChild(finalPrice);
  priceDiv.appendChild(linkElement);

  infoDiv.appendChild(title);
  infoDiv.appendChild(priceDiv);

  productDiv.appendChild(img);
  productDiv.appendChild(infoDiv);

  return productDiv;
}

async function getFilteredMotherboard() {
  const data = await fetch(
    'https://api.pcbuildwizard.com/products/motherboards?merchants=&payment=&formFactors=&sockets=AM5&chipsets=&wifiStandards=&colors=&manufacturers=&mode=1'
  );
  const json = await data.json();

  if (!json) return;

  for (const product of json) {
    const productElement = createProductElement({
      finalPriceText: product.finalPrice,
      rawPriceText: product.installmentPrice | product.cashPrice,
      tag: product.alternativeTag,
      linkText: product.merchantRedirectUrl,
      titleText: product.manufacturer + ' ' + product.name,
    });

    motherboard.appendChild(productElement);
  }
}

async function getFilteredGPU() {
  const data = await fetch(
    'https://api.pcbuildwizard.com/products/video-cards?merchants=&payment=&gpuManufacturers=&chipsets=&colors=&manufacturers=&mode=1'
  );
  const json = await data.json();

  if (!json) return;

  for (const product of json) {
    const productElement = createProductElement({
      finalPriceText: product.cashPrice,
      rawPriceText: product.installmentPrice | product.cashPrice,
      tag: product.alternativeTag,
      linkText: product.merchantRedirectUrl,
      titleText: product.manufacturer + ' ' + product.name,
    });

    gpu.appendChild(productElement);
  }
}

async function getFilteredCPU() {
  const data = await fetch(
    'https://api.pcbuildwizard.com/products/cpus?merchants=&payment=&useProfile=1&fpsTarget=120&sockets=AM5&integratedGpus=&manufacturers=&mode=1'
  );
  const json = await data.json();

  if (!json) return;

  for (const product of json) {
    const productElement = createProductElement({
      finalPriceText: product.cashPrice,
      rawPriceText: product.installmentPrice | product.cashPrice,
      tag: product.alternativeTag,
      linkText: product.merchantRedirectUrl,
      titleText: product.manufacturer + ' ' + product.name,
    });

    cpu.appendChild(productElement);
  }
}

getFilteredMotherboard();
getFilteredGPU();
getFilteredCPU();
