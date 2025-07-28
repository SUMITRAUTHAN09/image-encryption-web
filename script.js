function encryptImage() {
  const fileInput = document.getElementById("imageInput");
  const keyInput = document.getElementById("keyInput");
  const downloadLink = document.getElementById("downloadLink");

  if (!fileInput.files[0] || !keyInput.value) {
    alert("Please select an image and enter a key!");
    return;
  }

  const reader = new FileReader();
  const key = parseInt(keyInput.value);

  reader.onload = function (event) {
    const arrayBuffer = event.target.result;
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < uint8Array.length; i++) {
      uint8Array[i] ^= key; // XOR operation
    }

    const blob = new Blob([uint8Array], { type: "image/jpeg" });
    const url = URL.createObjectURL(blob);

    downloadLink.href = url;
    downloadLink.download = "encrypted_image.jpg";
    downloadLink.style.display = "inline-block";
    downloadLink.textContent = "⬇️ Download Encrypted Image";
  };

  reader.readAsArrayBuffer(fileInput.files[0]);
}
