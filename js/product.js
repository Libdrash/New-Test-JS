const productPage = JSON.parse(localStorage.getItem("productPage"))
const productContainer = document.querySelector(".productContainer ")
const nameOfProduct = document.querySelector("p")
const quantity = document.querySelector("input")
const likeButton = document.querySelector(".like")
const addSum = document.querySelector(".addSum")
const products = JSON.parse(localStorage.getItem("products"))
const plus = document.querySelector(".plus")
const minus = document.querySelector(".minus")
const cart = JSON.parse(localStorage.getItem("cart"))

const setProduct = () => {
  productContainer.style.backgroundImage = `url('../${productPage.img}')`
  nameOfProduct.textContent = productPage.name
  quantity.value = productPage.quantity
  addSum.textContent = `Add | ${(productPage.price * quantity.value).toFixed(2)}`
}

const handleButtonLike = (btn) => {
  if (productPage.isLiked) {
    btn.style.backgroundImage = `url("../images/general/heartWhite.svg")`
  }
  btn.addEventListener("click", () => {
    productPage.isLiked = !productPage.isLiked
    btn.style.backgroundImage = `url(${
      productPage.isLiked ? "../images/general/heartWhite.svg" : "../images/general/heartBlack.svg"
    }`
    localStorage.setItem("productPage", JSON.stringify(productPage))
    const findProduct = products.find((el) => el.id === productPage.id)
    findProduct.isLiked = productPage.isLiked
    localStorage.setItem("products", JSON.stringify(products))
  })
}
const calculateQuantityUpDown = () => {
  productPage.quantity = +quantity.value
  localStorage.setItem("productPage", JSON.stringify(productPage))
  addSum.textContent = `Add | ${(productPage.price * quantity.value).toFixed(2)}`
}
const addProductInCart = () => {
  const found = cart.find((item) => item.id === productPage.id)
  document.location.href = "cart.html"
  switch (found) {
    case undefined:
      cart.push(productPage)
      break
    case found:
      found.quantity += productPage.quantity
      break
  }
  localStorage.setItem("cart", JSON.stringify(cart))
  productPage.quantity = 1
  localStorage.setItem("productPage", JSON.stringify(productPage))
}

addSum.addEventListener("click", addProductInCart)
plus.addEventListener("click", calculateQuantityUpDown)
minus.addEventListener("click", calculateQuantityUpDown)

if (productPage && productPage.id) {
  setProduct()
  handleButtonLike(likeButton)
} else {
  window.location.href = "../index.html"
}
