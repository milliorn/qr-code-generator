const generateForm = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");

/* Button submit */
const onGenerateSubmit = (e) => {
  e.preventDefault();

  clearUI();

  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;

  /* Validate and execute */
  if (url === "") {
    alert("Please enter URL");
  } else {
    showSpinner();
    /* Show spinner */
    setTimeout(() => {
      hideSpinner();
      generateQRCode(url, size);

      /* Generate the save button when qr code image src is ready */
      setTimeout(() => {
        /* Get save url */
        const saveUrl = qr.querySelector("img").src;
        /* Create save button */
        createSaveBtn(saveUrl);
      }, 200);
    }, Math.floor(Math.random() * 3000));
  }
};

/* Generate QR code */
const generateQRCode = (url, size) => {
  const qrcode = new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
  });
};

/* Clear QR code and save button */
const clearUI = () => {
  qr.innerHTML = "";
  const saveBtn = document.getElementById("save-link");
  if (saveBtn) {
    saveBtn.remove();
  }
};

/* Show spinner */
const showSpinner = () => {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "block";
};

/* Hide spinner */
const hideSpinner = () => {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "none";
};

/* Create save button to download QR code as image */
const createSaveBtn = (saveUrl) => {
  const link = document.createElement("a");
  link.id = "save-link";
  link.href = saveUrl;
  link.download = "qrcode";
  link.innerHTML = "Save Image";
  document.getElementById("generated").appendChild(link);
};

hideSpinner();

generateForm.addEventListener("submit", onGenerateSubmit);
