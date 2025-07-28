async function openAndEncrypt() {
  const key = parseInt(document.getElementById("keyInput").value);
  const message = document.getElementById("message");

  if (isNaN(key)) {
    alert("Please enter a valid numeric key.");
    return;
  }

  try {
    // Ask user to pick a file
    const [fileHandle] = await window.showOpenFilePicker({
      types: [{ description: "Images", accept: { "image/*": [".png", ".jpg", ".jpeg"] } }],
      excludeAcceptAllOption: false,
      multiple: false
    });

    const file = await fileHandle.getFile();
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // XOR each byte
    for (let i = 0; i < uint8Array.length; i++) {
      uint8Array[i] ^= key;
    }

    // Create writable stream to overwrite original file
    const writable = await fileHandle.createWritable();
    await writable.write(uint8Array);
    await writable.close();

    message.innerText = "✔ Image encrypted/decrypted successfully!";
  } catch (err) {
    console.error(err);
    message.innerText = "❌ Operation cancelled or failed.";
  }
}
