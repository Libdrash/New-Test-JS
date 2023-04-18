const catalogueOfProducts = [
  {
    id: 1,
    name: `Men's Cotton in Conversion Midweight Rugby Shirt`,
    material: "Organic",
    price: 120,
    rating: "5.0",
    isLiked: false,
    img: "../../New-Test-JS/images/catalog/productId1.svg",
  },
  {
    id: 2,
    name: `Clean Climb Sweatshirt`,
    material: "Recucled",
    price: 75,
    rating: "5.0",
    isLiked: false,
    img: "../../New-Test-JS/images/catalog/productId2.svg",
  },
  {
    id: 3,
    name: `Modern light clothes`,
    material: "Dress modern",
    price: 212.99,
    rating: "5.0",
    isLiked: false,
    img: "../../New-Test-JS/images/catalog/productId3.svg",
  },
  {
    id: 4,
    name: `Modern light clothes`,
    material: "Dress modern",
    price: 212.99,
    rating: "5.0",
    isLiked: false,
    img: "../../New-Test-JS/images/catalog/productId4.svg",
  },
  {
    id: 5,
    name: `Modern light clothes`,
    material: "Recycled",
    price: 340,
    rating: "5.0",
    isLiked: false,
    img: "../../New-Test-JS/images/catalog/productId5.svg",
  },
  {
    id: 6,
    name: `Powder Town HeadBand`,
    material: "Recycled",
    price: 40,
    rating: "5.0",
    isLiked: false,
    img: "../../New-Test-JS/images/catalog/productId6.svg",
  },
]
//Объявления
const products = JSON.parse(localStorage.getItem("products"))
const catalogueContainer = document.querySelector(".catalogueContainer")

//Функции
const showCatalogue = (container) => {
  products.forEach((el) => {
    const { name, material, price, rating, img } = el
    container.innerHTML += `
    <div class="product">
      <a>
        <img alt="productPicture" id="productsImg" src="${img}" />
      </a>
      <button class="heart"></button>
      <p class="productsDescription">${name}</p>
      <p>${material}</p>
      <div class="numericalData">
        <span class="price">&#8364; ${price}</span>
        <div class="rating">
        <img alt="iconStar" src="../../New-Test-JS/images/catalog/star.svg"/> ${rating}
        </div>
      </div>
    </div>`
  })
}
const productList = document.querySelectorAll(".product")
console.log(productList)
const searchOfProducts = document.querySelector(".searchInput")
console.log(searchOfProducts)
// productList = Array.from(productList)
// console.log(productList)
//инпут

const getValue = (event) => {
  let target = event.target
  filter(target.value)
}
searchOfProducts.addEventListener("input", getValue)

const filter = (value) => {
  let regex = new RegExp(value, "i")
  products.filter((item, index) =>
    item.name.match(regex) ? changeDisplayBlock(productList[index]) : changeDisplayNone(productList[index])
  )
}
const changeDisplayNone = (el) => {
  console.log(el)
  el.style.display = "none"
}
const changeDisplayBlock = (el) => {
  el.style.display = "flex"
}

//Проверки и запуск
if (!products) {
  localStorage.setItem("products", JSON.stringify(catalogueOfProducts))
  location.reload()
}
if (products) {
  showCatalogue(catalogueContainer)
}
