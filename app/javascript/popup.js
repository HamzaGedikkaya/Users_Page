document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup");
  const albumPhotosList = document.getElementById("album-photos");
  const closePopup = document.querySelector(".close-popup");

  function openPopup(albumId) {
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
      .then(response => response.json())
      .then(data => {
        albumPhotosList.innerHTML = data.map(photo => `
          <li class="photo-item">
            <img src="${photo.thumbnailUrl}" alt="${photo.title}">
            <p>${photo.title}</p>
          </li>
        `).join('');
        popup.style.display = "block";
      })
      .catch(error => console.error(error));
  }

  function closePopupWindow() {
    popup.style.display = "none";
  }

  document.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('view-album-photos')) {
      e.preventDefault();
      const albumId = target.getAttribute('data-album-id');
      openPopup(albumId);
    } else if (target === closePopup || !popup.contains(target)) {
      closePopupWindow();
    }
  });
});