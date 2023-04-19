const catalogueOfProducts = [
  {
    id: 1,
    name: `Men's Cotton in Conversion Midweight Rugby Shirt`,
    material: "Organic",
    price: 120,
    rating: "5.0",
    isLiked: false,
    img: "images/catalog/productId1.svg",
  },
  {
    id: 2,
    name: `Clean Climb Sweatshirt`,
    material: "Recucled",
    price: 75,
    rating: "5.0",
    isLiked: false,
    img: "images/catalog/productId2.svg",
  },
  {
    id: 3,
    name: `Modern light clothes`,
    material: "Dress modern",
    price: 212.99,
    rating: "5.0",
    isLiked: false,
    img: "images/catalog/productId3.svg",
  },
  {
    id: 4,
    name: `Modern light clothes`,
    material: "Dress modern",
    price: 212.99,
    rating: "5.0",
    isLiked: false,
    img: "images/catalog/productId4.svg",
  },
  {
    id: 5,
    name: `Modern light clothes`,
    material: "Recycled",
    price: 340,
    rating: "5.0",
    isLiked: false,
    img: "images/catalog/productId5.svg",
  },
  {
    id: 6,
    name: `Powder Town HeadBand`,
    material: "Recycled",
    price: 40,
    rating: "5.0",
    isLiked: false,
    img: "images/catalog/productId6.svg",
  },
]
const activePage = {}
const cartList = []
const products = JSON.parse(localStorage.getItem("products"))
const productPage = JSON.parse(localStorage.getItem("productPage"))
const cart = JSON.parse(localStorage.getItem("cart"))
const catalogueContainer = document.querySelector(".catalogueContainer")
const searchOfProducts = document.querySelector(".searchInput")

//каталог
const showCatalogue = (container) => {
  products.forEach((el) => {
    const { name, material, price, rating, img } = el
    container.innerHTML += `
    <div class="product">
      <a>
        <img alt="productPicture" class="productImg" src="${img}" />
      </a>
      <button class="heart"></button>
      <p class="productsDescription">${name}</p>
      <p>${material}</p>
      <div class="numericalData">
        <span class="price">&#8364; ${price}</span>
        <div class="rating">
        <img alt="iconStar" src="images/catalog/star.svg"/> ${rating}
        </div>
      </div>
    </div>`
  })
}
if (products) {
  showCatalogue(catalogueContainer)
}
const productList = document.querySelectorAll(".product")
const buttonsLike = document.querySelectorAll(".heart")
const productTitleImg = document.querySelectorAll(".productImg")

//инпут
const getValue = (event) => {
  let target = event.target
  filter(target.value)
}

const filter = (value) => {
  let regex = new RegExp(value, "i")
  products.filter((item, index) =>
    item.name.match(regex)
      ? changeDisplayBlock(Array.from(productList)[index])
      : changeDisplayNone(Array.from(productList)[index])
  )
}

const changeDisplayNone = (el) => {
  el.style.display = "none"
}
const changeDisplayBlock = (el) => {
  el.style.display = "flex"
}

const handleClickButtonLike = (event) => {
  let target = event.target
  if (!target.classList.contains("heart")) return
  const index = Array.from(buttonsLike).indexOf(target)
  products[index].isLiked = !products[index].isLiked
  target.style.backgroundImage = `url(${
    products[index].isLiked ? "images/general/heartWhite.svg" : "images/general/heartBlack.svg"
  })`
  localStorage.setItem("products", JSON.stringify(products))
}

const startValueOfButtonsLike = () => {
  Array.from(buttonsLike).map((btn, index) => {
    if (products[index].isLiked) {
      btn.style.backgroundImage = `url("images/general/heartWhite.svg")`
    }
  })
}

const handOverData = (event) => {
  let target = event.target
  if (!target.classList.contains("productImg")) return
  const index = Array.from(productTitleImg).indexOf(target)
  productPage.id = products[index].id
  productPage.material = products[index].material
  productPage.name = products[index].name
  productPage.price = products[index].price
  productPage.isLiked = products[index].isLiked
  productPage.quantity = 1
  productPage.img = products[index].img
  localStorage.setItem("productPage", JSON.stringify(productPage))
  document.location.href = "pages/product.html"
}

if (!products) {
  localStorage.setItem("products", JSON.stringify(catalogueOfProducts))
  location.reload()
} else {
  startValueOfButtonsLike()
  searchOfProducts.addEventListener("input", getValue)
  catalogueContainer.addEventListener("click", handleClickButtonLike)
  catalogueContainer.addEventListener("click", handOverData)
}

if (!productPage) {
  localStorage.setItem("productPage", JSON.stringify(activePage))
}

if (!cart) {
  localStorage.setItem("cart", JSON.stringify(cartList))
}
