document.addEventListener('DOMContentLoaded', () => {
  const categoryButtons = document.querySelectorAll('.list2 li');
  const productsDiv = document.getElementById('products');
  let allProducts = [];

  fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(data => {
      allProducts = data;
      renderProducts(allProducts);
    });

  // 🔹 Filter buttons
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;

      const filtered =
        category === 'all'
          ? allProducts
          : allProducts.filter(p => p.category === category);

      renderProducts(filtered);

      categoryButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });
  });

  // 🔹 Click event (product detail) — event delegation
  productsDiv.addEventListener('click', e => {
    const card = e.target.closest('.product');
    if (!card) return;

    const id = card.dataset.id;
    window.location.href = `productdetail.html?id=${id}`;
  });

  function renderProducts(products) {
    productsDiv.innerHTML = "";
    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "product";
      card.dataset.id = product.id;
      card.innerHTML = `
        <div class="img-box">
          <img src="${product.image}">
          <button class="buy-btn">Buy Now</button>
        </div>
        <h4>${product.title}</h4>
        <p>$${product.price}</p>
      `;
      productsDiv.appendChild(card);
    });
  }
});
