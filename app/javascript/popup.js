document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById('popup');
  const albumPhotos = document.getElementById('album-photos');
  const closePopup = document.querySelector('.close-popup');

  closePopup.addEventListener('click', () => closePopupWindow());

  document.querySelectorAll('.view-album-photos').forEach(link => {
      link.addEventListener('click', e => {
      e.preventDefault();
      const albumId = link.getAttribute('data-album-id');
      fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
          .then(response => response.json())
          .then(data => {
          albumPhotos.innerHTML = data.map(photo => `<li><img src="${photo.thumbnailUrl}" alt="${photo.title}" /></li>`).join('');
          })
          .catch(error => console.error(error));

      popup.style.display = 'block';
      document.body.style.overflow = 'hidden';
      });
  });

  document.addEventListener('mousedown', e => {
      if (!popup.contains(e.target) && e.target !== popup) closePopupWindow();
  });

  function closePopupWindow() {
      popup.style.display = 'none';
      albumPhotos.innerHTML = '';
      document.body.style.overflow = 'auto';
  }
});