function displayFlashMessage(type, message) {
    type = type.toLowerCase();
    let container = document.getElementById('flash-message-container');
    let flashMessage = document.createElement('div');
    flashMessage.setAttribute('data-type', type);
    flashMessage.innerHTML = `<span>${message}</span>`;
    container.appendChild(flashMessage);
}

function createAlbumReview(title, body) {
    let album = "xxx";
    fetch("https://rythmic-backend.vercel.app/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title, body: body, album: album })
    })
    .then(data => {
        displayFlashMessage('success', 'Review Submitted!')
        setTimeout(() => location.reload(), 1000);
    })
    .then(data => console.log("Success:", data))
    .catch(err => console.error("Error:", err));
}
