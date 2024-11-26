// Product data (this can also come from an API or JSON file)
const products = {
  "green-pea": {
      name: "green pea",
      subname: "scrunchie",
      price: "S$6.00",
      description: "A beautiful green pea scrunchie made from soft cotton fabric, perfect for your hair accessories collection.",
      category: "scrunchies",
      images: ["scrunchies/green pea.jpg", "scrunchies/green pea 2.jpg", "scrunchies/green pea 3.jpg"]
  },
  "sunlit-meadow": {
      name: "sunlit meadow",
      subname: "scrunchie",
      price: "S$7.00",
      description: "A beautiful sunlit meadow scrunchie made from soft cotton fabric, perfect for your hair accessories collection.",
      category: "scrunchies",
      images: ["scrunchies/sunlit meadow.jpg", "scrunchies/sunlit meadow 2.jpg", "scrunchies/sunlit meadow 3.jpg"]
  },
  "lavender-mist": {
      name: "lavender mist",
      subname: "scrunchie",
      price: "S$6.00",
      description: "A beautiful lavender mist scrunchie made from soft cotton fabric, perfect for your hair accessories collection.",
      category: "scrunchies",
      images: ["scrunchies/lavender mist.jpg", "scrunchies/lavender mist 2.jpg", "scrunchies/lavender mist 3.jpg"]
  },
  "marshmallow": {
      name: "marshmallow",
      subname: "scrunchie",
      price: "S$6.00",
      description: "A beautiful marshmallow scrunchie made from soft cotton fabric, perfect for your hair accessories collection.",
      category: "scrunchies",
      images: ["scrunchies/marshmallow.jpg", "scrunchies/marshmallow 2.jpg", "scrunchies/marshmallow 3.jpg"]
  }
};

// Get the product ID from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

let currentIndex = 0;
let cart = getCartData();

// If product exists, load the details
if (productId && products[productId]) {
  const product = products[productId];
  
  // Update the page with product info
  updateProductInfo(product);
  
  // Initialize image carousel
  initCarousel(product.images);
  
  // Add event listeners for Add to Cart, Quantity buttons
  initCartFunctions(product);
  
} else {
  console.error("Product not found");
}

// Update breadcrumbs and product info on the page
function updateProductInfo(product) {
  document.getElementById("breadcrumb-category").textContent = product.category;
  document.getElementById("breadcrumb-category").href = `${product.category}.html`;
  document.getElementById("breadcrumb-product").textContent = product.name;
  
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-subname").textContent = product.subname;
  document.getElementById("product-price").textContent = product.price;
  document.getElementById("product-description").textContent = product.description;
}

// Initialize the carousel with product images
function initCarousel(images) {
  const carouselImages = document.getElementById("carousel-images");
  const carouselThumbnails = document.getElementById("carousel-thumbnails");
  
  images.forEach((src, index) => {
      const img = createElement("img", { src, alt: "Product Image", style: { display: index === 0 ? 'block' : 'none' } });
      carouselImages.appendChild(img);
      
      const thumbnail = createElement("img", { src, alt: `Thumbnail`, classList: ['thumbnail'] });
      thumbnail.addEventListener("click", () => setSlide(index));
      carouselThumbnails.appendChild(thumbnail);
  });
}

// Create an element and set its properties
function createElement(tag, { src, alt, style, classList, textContent } = {}) {
  const element = document.createElement(tag);
  if (src) element.src = src;
  if (alt) element.alt = alt;
  if (style) Object.assign(element.style, style);
  if (classList) element.classList.add(...classList);
  if (textContent) element.textContent = textContent;
  return element;
}

// Set the current slide based on index
function setSlide(index) {
  const images = document.querySelectorAll("#carousel-images img");
  const thumbnails = document.querySelectorAll(".thumbnail");
  
  images.forEach(img => img.style.display = 'none');
  images[index].style.display = 'block';
  
  thumbnails.forEach(thumb => thumb.classList.remove("active-thumbnail"));
  thumbnails[index].classList.add("active-thumbnail");
  
  currentIndex = index;
}

// Handle the slide navigation
function nextSlide() {
  const images = document.querySelectorAll("#carousel-images img");
  setSlide((currentIndex + 1) % images.length);
}

function prevSlide() {
  const images = document.querySelectorAll("#carousel-images img");
  setSlide((currentIndex - 1 + images.length) % images.length);
}

// Initialize Add to Cart functionality
function initCartFunctions(product) {
  const addToCartButton = document.getElementById("add-to-cart");
  addToCartButton.addEventListener("click", () => addToCart(product));

  // Quantity buttons
  const quantityDisplay = document.querySelector(".quantity");
  const decrementButton = document.querySelectorAll(".quantity-button")[0];
  const incrementButton = document.querySelectorAll(".quantity-button")[1];

  let quantity = parseInt(quantityDisplay.textContent, 10);

  decrementButton.addEventListener("click", () => updateQuantity(quantityDisplay, --quantity));
  incrementButton.addEventListener("click", () => updateQuantity(quantityDisplay, ++quantity));
}

// Update the cart data and display notification
function addToCart(product) {
  const quantity = parseInt(document.querySelector(".quantity").textContent, 10);
  const cartItem = { id: productId, name: product.name, price: parseFloat(product.price.replace("S$", "")), quantity };
  
  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) existingItem.quantity += quantity;
  else cart.push(cartItem);
  
  saveCartData(cart);
  showNotification(product, quantity);
}

// Save cart to localStorage
function saveCartData(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Retrieve cart from localStorage
function getCartData() {
  const cartData = localStorage.getItem("cart");
  return cartData ? JSON.parse(cartData) : [];
}

// Show notification after adding to cart
function showNotification(product, quantity) {
  const notification = document.querySelector(".notification");
  document.getElementById("notification-name").textContent = `"${product.name}" x${quantity}`;
  notification.classList.add("visible");
  
  setTimeout(() => notification.classList.remove("visible"), 3000);
}

// Update quantity on the page
function updateQuantity(display, quantity) {
  if (quantity < 1) return; // Prevent quantity from going below 1
  display.textContent = quantity;
}
