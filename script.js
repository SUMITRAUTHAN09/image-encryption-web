async function openAndEncrypt() {
  const keyInput = document.getElementById("keyInput");
  const message = document.getElementById("message");
  const key = parseInt(keyInput.value);

  if (isNaN(key)) {
    alert("Please enter a valid numeric key.");
    return;
  }

  try {
    // Ask the user to select a file (e.g., image)
    const [fileHandle] = await window.showOpenFilePicker({
      types: [{
        description: "Images",
        accept: { "image/*": [".png", ".jpg", ".jpeg", ".bmp", ".webp"] }
      }],
      multiple: false
    });

    // Get the file content
    const file = await fileHandle.getFile();
    const arrayBuffer = await file.arrayBuffer();
    const byteArray = new Uint8Array(arrayBuffer);

    // XOR encryption/decryption using the key (same logic as your Java code)
    for (let i = 0; i < byteArray.length; i++) {
      byteArray[i] = byteArray[i] ^ key;
    }

    // Write the encrypted/decrypted data back to the same file
    const writable = await fileHandle.createWritable();
    await writable.write(byteArray);
    await writable.close();

    message.innerText = "✅ Image encrypted/decrypted successfully.";
  } catch (error) {
    console.error("Error:", error);
    message.innerText = "❌ Operation failed or was cancelled.";
  }
}
