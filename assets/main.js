function createAlbumReview(title, body) {
    let album = "xxx";
    fetch("https://rythmic-backend.vercel.app/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title, body: body, album: album })
    })
        .then(res => res.json())
        .then(data => console.log("Success:", data))
        .catch(err => console.error("Error:", err));
}
