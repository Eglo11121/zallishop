let cart = {};

function updateCart() {
    const list = document.getElementById("cart-list");
    const totalEl = document.getElementById("total");
    const countEl = document.getElementById("cart-count");

    list.innerHTML = "";
    let total = 0;
    let count = 0;

    for (let name in cart) {
        const item = cart[name];
        const li = document.createElement("li");
        li.textContent = `${name} x ${item.qty} = ${item.qty * item.price} €`;
        list.appendChild(li);

        total += item.qty * item.price;
        count += item.qty;
    }

    totalEl.textContent = total;
    countEl.textContent = count;
}

document.querySelectorAll(".product").forEach(product => {
    const name = product.dataset.name;
    const price = Number(product.dataset.price);
    const qtyEl = product.querySelector(".qty");

    product.querySelector(".plus").onclick = () => {
        if (!cart[name]) cart[name] = { price, qty: 0 };
        cart[name].qty++;
        qtyEl.textContent = cart[name].qty;
        updateCart();
    };

    product.querySelector(".minus").onclick = () => {
        if (cart[name]) {
            cart[name].qty--;
            if (cart[name].qty <= 0) delete cart[name];
            qtyEl.textContent = cart[name]?.qty || 0;
            updateCart();
        }
    };
});

document.getElementById("pay-btn").onclick = () => {
    if (Object.keys(cart).length === 0) {
        document.getElementById("msg").textContent = "Shporta është bosh!";
        return;
    }
    document.getElementById("msg").textContent =
        "✅ Pagesa DEMO u krye me sukses! Faleminderit nga ZalliShop.";
    cart = {};
    document.querySelectorAll(".qty").forEach(q => q.textContent = 0);
    updateCart();
};
