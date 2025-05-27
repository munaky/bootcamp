document.getElementById('image').addEventListener('change', (e) => {
    const image = document.getElementById('image');
    document.getElementById('image-preview').src = URL.createObjectURL(image.files[0])
});