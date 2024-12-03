document.getElementById('encodeButton').addEventListener('click', () => {
    const fileInput = document.getElementById('fileInput').files[0];
    const output = document.getElementById('output');

    if (!fileInput) return alert('Please select an image to encode.');

    const reader = new FileReader();
    reader.onload = () => {
        const img = new Image();
        img.onload = () => {
            // Convert to HD as JPEG
            const hdDataUrl = convertToHD(img);
            output.value = hdDataUrl;
        };
        img.src = reader.result;
    };
    reader.readAsDataURL(fileInput);
});

document.getElementById('decodeButton').addEventListener('click', () => {
    const base64String = document.getElementById('output').value;
    const preview = document.getElementById('preview');

    if (!base64String) return alert('Please provide a Base64 string to decode.');

    preview.innerHTML = `<img src="${base64String}" alt="Decoded Image">`;
});

function convertToHD(img) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    // Set HD resolution dimensions
    const hdWidth = img.width * 2; // 2x scaling for HD
    const hdHeight = img.height * 2;

    canvas.width = hdWidth;
    canvas.height = hdHeight;

    // Draw the image with HD resolution
    context.drawImage(img, 0, 0, hdWidth, hdHeight);

    // Return the Base64 string in JPEG format
    return canvas.toDataURL('image/jpeg', 0.9); // Adjust quality (0.1 to 1.0, where 1.0 is highest)
}