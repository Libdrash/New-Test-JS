const cart = JSON.parse(localStorage.getItem("cart"))
const productsCartContainer = document.querySelector(".cartContainer")
const quantityProductInCart = document.querySelector("h3")
const subTotal = document.querySelector(".subTotal")
const totalBeforeFee = document.querySelector(".totalBeforeFee")
const totalAfterFee = document.querySelector(".totalAfterFee")
const buttonPay = document.querySelector(".cart__buttonPay")
const payForThePurchcase = []
const pay = JSON.parse(localStorage.getItem("pay"))
let totalCostStart = 0

const showCart = (container) => {
  cart.forEach((elem) => {
    const { img, name, material, price, quantity } = elem
    container.innerHTML += `<div class="productInCart">
        <img alt="productPicture" src="../${img}" />
        <div>
            <p class="productName">${name}</p>
            <p class="material">${material}</p>
            <span>&#8364; ${price}</span>
        </div>
        <div class="cartCalculate">
            <button class="minus minusPlusValue" type="button" onclick="this.nextElementSibling.stepDown()">&ndash;</button>
            <input class="quantity" type="number" min="0" value="${quantity}" />
            <button class="plus minusPlusValue" type="button" onclick="this.previousElementSibling.stepUp()">&#43;</button>
        </div>
    </div>`
  })
}
if (cart) {
  showCart(productsCartContainer)
}
const productInCart = document.querySelectorAll(".productInCart")
const quantityInputs = document.querySelectorAll(".quantity")
const plus = document.querySelectorAll(".plus")
const minus = document.querySelectorAll(".minus")
const minusPlusValue = document.querySelectorAll(".minusPlusValue")

const derivationData = () => {
  quantityProductInCart.textContent = `Cart: ${productInCart.length}`
  subTotal.textContent = `Sub Total (${productInCart.length} items)`
}

const handleCartProductQuantity = (event) => {
  let target = event.target
  if (!target.classList.contains("minusPlusValue")) return
  if (target.classList.contains("minus")) {
    const index = Array.from(minus).indexOf(target)
    cart[index].quantity = +quantityInputs[index].value
    if (cart[index].quantity === 0) {
      cart.splice(index, 1)
      location.reload()
      for (let i = 0; i < cart.length; i++) {
        localStorage.setItem("item" + i, cart[i])
      }
    }
  } else if (target.classList.contains("plus")) {
    const index = Array.from(plus).indexOf(target)
    cart[index].quantity = +quantityInputs[index].value
  }
  localStorage.setItem("cart", JSON.stringify(cart))
}

const costProcessOnStart = () => {
  for (let i = 0; i < cart.length; i++) {
    const product = cart[i]
    const { quantity, price } = product
    const cost = quantity * price
    totalCostStart += cost
  }
}
const costProcessOnTime = () => {
  let totalCost = 0
  for (let i = 0; i < cart.length; i++) {
    const product = cart[i]
    const { quantity, price } = product
    const cost = quantity * price
    totalCost += cost
    totalBeforeFee.textContent = totalCost.toFixed(2)
    totalAfterFee.textContent = totalCost.toFixed(2)
  }
}

const payCart = (index) => {
  pay.push(...cart)
  localStorage.setItem("pay", JSON.stringify(pay))
  if (pay.length === 0) return
  cart.splice(index)
  localStorage.setItem("cart", JSON.stringify(cart))
  location.reload()
  alert("Thank You!")
}

if (cart) {
  derivationData()
  productsCartContainer.addEventListener("click", handleCartProductQuantity)
  productsCartContainer.addEventListener("click", costProcessOnTime)
  costProcessOnStart()
  totalBeforeFee.textContent = totalCostStart.toFixed(2)
  totalAfterFee.textContent = totalCostStart.toFixed(2)
  buttonPay.addEventListener("click", payCart)
} else {
  window.location.href = "../index.html"
}
if (!pay) {
  localStorage.setItem("pay", JSON.stringify(payForThePurchcase))
}
