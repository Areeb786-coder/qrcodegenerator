document.addEventListener("DOMContentLoaded", function () {
    const qrType = document.getElementById("qr-type");
    const inputFields = document.getElementById("input-fields");
    const generateBtn = document.getElementById("generate-btn");
    const clearBtn = document.getElementById("clear-btn");
    const downloadBtn = document.getElementById("download-btn");
    const qrCodeContainer = document.getElementById("qr-code-container");
    const qrSizeInput = document.getElementById("qr-size");
  
    let qrCodeInstance = null;
  
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth"
        });
      });
    });
  
    // Function to update input fields based on QR type
    function updateInputFields() {
      const type = qrType.value;
      let html = "";
  
      if (type === "website") {
        html = `<input type="url" id="website-url" placeholder="Enter Website URL" required>`;
      } else if (type === "facebook" || type === "twitter" || type === "instagram" || type === "linkedin") {
        html = `<input type="text" id="social-username" placeholder="Enter Username" required>`;
      } else if (type === "whatsapp") {
        html = `<input type="tel" id="whatsapp-number" placeholder="Enter WhatsApp Number" required>`;
      }
  
      inputFields.innerHTML = html;
    }
  
    // Generate QR Code
    generateBtn.addEventListener("click", function () {
      const type = qrType.value;
      const size = parseInt(qrSizeInput.value);
      let data = "";
  
      if (type === "website") {
        const websiteUrl = document.getElementById("website-url").value;
        if (!websiteUrl) {
          alert("Please enter a valid website URL.");
          return;
        }
        data = websiteUrl;
      } else if (type === "facebook" || type === "twitter" || type === "instagram" || type === "linkedin") {
        const username = document.getElementById("social-username").value;
        if (!username) {
          alert("Please enter a valid username.");
          return;
        }
        data = `https://${type}.com/${username}`;
      } else if (type === "whatsapp") {
        const whatsappNumber = document.getElementById("whatsapp-number").value;
        if (!whatsappNumber) {
          alert("Please enter a valid WhatsApp number.");
          return;
        }
        data = `https://wa.me/${whatsappNumber}`;
      }
  
      // Clear previous QR code
      qrCodeContainer.innerHTML = "";
  
      // Generate new QR code
      qrCodeInstance = new QRCode(qrCodeContainer, {
        text: data,
        width: size,
        height: size,
      });
  
      // Show download button
      downloadBtn.classList.remove("hidden");
    });
  
    // Clear QR Code
    clearBtn.addEventListener("click", function () {
      qrCodeContainer.innerHTML = "";
      downloadBtn.classList.add("hidden");
    });
  
    // Download QR Code
    downloadBtn.addEventListener("click", function () {
      const qrImage = qrCodeContainer.querySelector("img");
      if (qrImage) {
        const link = document.createElement("a");
        link.href = qrImage.src;
        link.download = "qrcode.png";
        link.click();
      }
    });
  
    // Update input fields when QR type changes
    qrType.addEventListener("change", updateInputFields);
  
    // Initialize input fields on page load
    updateInputFields();
  });