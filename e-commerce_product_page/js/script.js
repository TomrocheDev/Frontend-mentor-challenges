function modifyQuantity(direction) {
    const i = document.getElementById("item-quantity");
    let q = parseInt(document.getElementById("item-quantity").value);

    if (direction === "inc") q++;
    else if (direction === "dec" && q >= 1) q--;

    i.value = q;
}

function clearSession() {
    sessionStorage.clear();
    location.reload();
}

const addItemForm = document.querySelector("form");

// Create cart variable in sessionStorage if it does not exist
if (!sessionStorage["cart"]) sessionStorage.setItem("cart", JSON.stringify([]));

addItemForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const currentCart = JSON.parse(sessionStorage.getItem("cart"));
    const quantity = parseInt(document.getElementById("item-quantity").value);
    const itemObject = { id: 1, title: "Fall Limited Edition Sneakers", pricePerPiece: 125, quantity };

    if (!currentCart.some((item) => item.id === itemObject.id) && quantity !== 0) {
        // Item did not appear in cart
        currentCart.push(itemObject);
        sessionStorage.setItem("cart", JSON.stringify(currentCart));
    } else if (currentCart.some((item) => item.id === itemObject.id) && quantity !== 0) {
        // Item already appeared in cart, but quantity will be modified
        const newQuantity = currentCart.filter((item) => item.id === itemObject.id)[0].quantity + itemObject.quantity;

        currentCart.filter((item) => item.id === itemObject.id)[0].quantity = newQuantity;
        sessionStorage.setItem("cart", JSON.stringify(currentCart));
    }
});

// Render cart list
const cartButton = document.getElementById("open-cart");

cartButton.addEventListener("click", () => {
    const item = JSON.parse(sessionStorage["cart"])[0];
    const modalContainer = document.querySelector(".modal");
    const modalDialog = document.createElement("div");

    modalContainer.innerHTML = "";
    modalDialog.setAttribute("class", "modal-dialog");

    if (item) {
        modalDialog.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title fs-5" id="cart-modalLabel">Cart</h3>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="d-flex justify-content-between gap-3">
                        <div class="item-image">
                            <img src="images/image-product-1-thumbnail.jpg" class="img-fluid" alt="product thumbnail" />
                        </div>
                        <div class="d-flex flex-column justify-content-center">
                            <p class="m-0">Fall Limited Edition Sneakers</p>
                            <p class="m-0">
                                $${item.pricePerPiece.toFixed(2)} x ${item.quantity} <strong class="text-black">
                                $${(item.pricePerPiece * item.quantity).toFixed(2)}</strong>
                            </p>
                        </div>
                        <button id="delete-item" onclick="clearSession();">
                            <i class="bi bi-trash3"></i>
                        </button>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" id="checkout">Checkout</button>
                </div>
            </div>
        </div>
        `;
    } else {
        modalDialog.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title fs-5" id="cart-modalLabel">Cart</h3>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p class='cart-empty'>Your cart is empty</p>
                    </div>
                </div>
            </div>
            `;
    }

    modalContainer.append(modalDialog);
});
