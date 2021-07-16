const rleHandler = {
  inputbox: document.getElementById('input-rle'),
};

const echoTextContent = (event) => {
  const targetElement = event.target;
  const destElementId = targetElement.dataset.destinationId;
  if (!destElementId) {
    return;
  }
  document.getElementById(destElementId).textContent = targetElement.value;
};

rleHandler.inputbox.addEventListener('input', echoTextContent);
