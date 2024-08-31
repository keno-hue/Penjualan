// Inisialisasi keranjang
let cart = [];

// Fungsi untuk memperbarui tampilan keranjang
function updateCart() {
    const cartTableBody = document.querySelector('#cart-table tbody');
    cartTableBody.innerHTML = '';
    let totalPrice = 0;

    cart.forEach((item, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <input type="number" min="1" value="${item.quantity}" class="form-control quantity-input" data-index="${index}">
            </td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
            <td>
                <button class="btn btn-danger btn-sm remove-item" data-index="${index}">Hapus</button>
            </td>
        `;
        cartTableBody.appendChild(row);
        totalPrice += item.price * item.quantity;
    });

    document.getElementById('total-price').innerText = totalPrice.toFixed(2);
}

// Fungsi untuk menambahkan item ke keranjang
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCart();
}

// Event listener untuk tombol "Tambah ke Keranjang"
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        addToCart(name, price);
        alert(`${name} telah ditambahkan ke keranjang!`);
    });
});

// Event listener untuk mengubah jumlah item
document.querySelector('#cart-table tbody').addEventListener('input', (e) => {
    if (e.target.classList.contains('quantity-input')) {
        const index = e.target.getAttribute('data-index');
        const newQuantity = parseInt(e.target.value);
        if (newQuantity > 0) {
            cart[index].quantity = newQuantity;
            updateCart();
        }
    }
});

// Event listener untuk menghapus item
document.querySelector('#cart-table tbody').addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item')) {
        const index = e.target.getAttribute('data-index');
        cart.splice(index, 1);
        updateCart();
    }
});

// Event listener untuk tombol "Checkout"
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Keranjang Anda kosong!');
    } else {
        alert('Terima kasih atas pesanan Anda!');
        cart = [];
        updateCart();
    }
});

// Navigasi Smooth Scroll
document.querySelectorAll('a.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        window.scrollTo({
            top: target.offsetTop - 70,
            behavior: 'smooth'
        });
    });
});
