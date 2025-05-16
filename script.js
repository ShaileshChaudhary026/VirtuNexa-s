document.getElementById('preferenceForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const genre = document.getElementById('genre').value;

  const response = await fetch('/recommend', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ genre })
  });

  const books = await response.json();
  const container = document.getElementById('recommendations');
  container.innerHTML = '<h2>Recommended Books</h2>';

  if (books.length === 0) {
    container.innerHTML += '<p>No recommendations found.</p>';
  }

  books.forEach(book => {
    container.innerHTML += `
      <div class="book">
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Genre:</strong> ${book.genre}</p>
        <p><strong>Rating:</strong> ${book.rating}</p>
        <p>${book.review}</p>
      </div>
    `;
  });
});
