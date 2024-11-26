// Product data (can also come from an API or JSON file)
const products = {
  "s-green-pea": {
    id: "s-green-pea",
    name: "green pea",
    subname: "scrunchie",
    price: 6.00, 
    description: "A beautiful green pea scrunchie made from soft cotton fabric, perfect for your hair accessories collection.",
    category: "scrunchies",
    images: ["scrunchies/green pea.jpg", "scrunchies/green pea 2.jpg", "scrunchies/green pea 3.jpg"]
  },
  "s-sunlit-meadow": {
    id: "s-sunlit-meadow",
    name: "sunlit meadow",
    subname: "scrunchie",
    price: 7.00,
    description: "A beautiful sunlit meadow scrunchie made from soft cotton fabric, perfect for your hair accessories collection.",
    category: "scrunchies",
    images: ["scrunchies/sunlit meadow.jpg", "scrunchies/sunlit meadow 2.jpg", "scrunchies/sunlit meadow 3.jpg"]
  },
  "s-lavender-mist": {
    id: "s-lavender-mist",
    name: "lavender mist",
    subname: "scrunchie",
    price: 6.00,
    description: "A beautiful lavender mist scrunchie made from soft cotton fabric, perfect for your hair accessories collection.",
    category: "scrunchies",
    images: ["scrunchies/lavender mist.jpg", "scrunchies/lavender mist 2.jpg", "scrunchies/lavender mist 3.jpg"]
  },
  "s-marshmallow": {
    id: "s-marshmallow",
    name: "marshmallow",
    subname: "scrunchie",
    price: 6.00,
    description: "A beautiful marshmallow scrunchie made from soft cotton fabric, perfect for your hair accessories collection.",
    category: "scrunchies",
    images: ["scrunchies/marshmallow.jpg", "scrunchies/marshmallow 2.jpg", "scrunchies/marshmallow 3.jpg"]
  }
};

// Globals
let currentIndex = 0;
let cart = [];

document.addEventListener("DOMContentLoaded", () => {
  // Check for the cart page first
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  console.log("Product ID from URL:", productId); // Debugging to ensure the product ID is correct

  if (productId && products[productId]) {
    // If on a product page, render the product details
    const product = products[productId];
    renderProductDetails(product);
    setupCarousel(product.images);
    setupCartFunctions(product);
  } else if (document.getElementById("product-details")) {
    // Handle product not found for product details page only
    document.getElementById("product-details").innerHTML = "<p>Product not found.</p>";
    console.error("Product not found");
  }

  // Load cart from localStorage and render cart items if on cart page
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log("cart", cart);

  // Only render cart items if on cart page
  if (document.getElementById("cart-items")) {
    renderCartItems();
  }
});

// f: render cart items
function renderCartItems() {
  const cartItemsContainer = document.getElementById("cart-items");

  if (!cartItemsContainer) {
    console.error("Cart container not found!");
    return;
  }
  
  cartItemsContainer.innerHTML = ""; // Clear existing items

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cart.forEach(item => {
    const cartItemDiv = document.createElement("div");
    cartItemDiv.classList.add("cart-items");

    const productImage = document.createElement("img");
    if (item.images && Array.isArray(item.images) && item.images.length > 0) {
      productImage.src = item.images[0]; // Use the first image if available
    } else {
      productImage.src = "default-image.jpg"; // Fallback image if no images available
    }
    productImage.alt = item.name;

    const productDetails = document.createElement("div");
    productDetails.classList.add("product-details");

    const productName = document.createElement("h3");
    productName.textContent = item.name;

    const productSubname = document.createElement("p");
    productSubname.textContent = item.subname;

    const productPrice = document.createElement("p");
    if (item.price !== undefined) {
      productPrice.textContent = `S$${item.price.toFixed(2)}`; // Format the price
    } else {
      console.error("Price is undefined for item", item);
      productPrice.textContent = "S$0.00"; // Default price if missing
    }

    const productQuantity = document.createElement("p");
    productQuantity.textContent = `Quantity: ${item.quantity}`;

    productDetails.appendChild(productName);
    productDetails.appendChild(productSubname);
    productDetails.appendChild(productPrice);
    productDetails.appendChild(productQuantity);

    cartItemDiv.appendChild(productImage);
    cartItemDiv.appendChild(productDetails);
    cartItemsContainer.appendChild(cartItemDiv);
  });

  updateCartTotal(); // Make sure to update the cart total after rendering the items
}



// Function to update the cart total price
function updateCartTotal() {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Update the subtotal, discount (if any), and total price in the DOM
  document.getElementById("subtotal").textContent = `S$${total.toFixed(2)}`;
  
  // Assuming there is a discount functionality, you can add that here
  const discount = 0; // Example: Replace this with actual discount logic
  const totalWithDiscount = total - discount;
  
  document.getElementById("discount").textContent = `S$${discount.toFixed(2)}`;
  document.getElementById("total").textContent = `S$${totalWithDiscount.toFixed(2)}`;
}






// Helper functions for DOM manipulation
function createElement(tag, options = {}) {
  const { src, alt, style, classList, textContent } = options;
  const element = document.createElement(tag);

  if (src) element.src = src;
  if (alt) element.alt = alt;
  if (style) Object.assign(element.style, style);
  if (classList) element.classList.add(...classList);
  if (textContent) element.textContent = textContent;

  return element;
}




// f: render product details
function renderProductDetails(product) {
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-subname").textContent = product.subname;
  document.getElementById("product-price").textContent = `S$${product.price.toFixed(2)}`;
  document.getElementById("product-description").textContent = product.description;

  // show the 1st product image in the carousel as default
  const firstImage = document.createElement("img");
  firstImage.src = product.images[0];
  firstImage.alt = product.name;
  document.getElementById("carousel-images").appendChild(firstImage);
}

// carousel setup
function setupCarousel(images) {
  const carouselImages = document.getElementById("carousel-images");
  const carouselThumbnails = document.getElementById("carousel-thumbnails");

  // clear existing images and thumbnails before adding new ones
  carouselImages.innerHTML = '';
  carouselThumbnails.innerHTML = '';

  images.forEach((src, index) => {
    const img = createElement("img", {
      src,
      alt: `Product Image ${index + 1}`
    });
    carouselImages.appendChild(img);

    const thumbnail = createElement("img", {
      src,
      alt: `Thumbnail ${index + 1}`,
      classList: ["thumbnail"]
    });
    thumbnail.addEventListener("click", () => changeSlide(index));
    carouselThumbnails.appendChild(thumbnail);
  });

  highlightThumbnail(0); // default to the 1st image

  // Event listeners for navigation buttons
  document.querySelector(".prev").addEventListener("click", () => {
    prevSlide(images.length);
  });

  document.querySelector(".next").addEventListener("click", () => {
    nextSlide(images.length);
  });
}

function changeSlide(index) {
  const images = document.querySelectorAll("#carousel-images img");
  const offset = index * -100; // Calculate translation
  document.getElementById("carousel-images").style.transform = `translateX(${offset}%)`;

  highlightThumbnail(index);
  currentIndex = index; // Update the global index
}

function prevSlide(length) {
  currentIndex = (currentIndex - 1 + length) % length; // Wrap around
  changeSlide(currentIndex);
}

function nextSlide(length) {
  currentIndex = (currentIndex + 1) % length; // Wrap around
  changeSlide(currentIndex);
}

function highlightThumbnail(index) {
  const thumbnails = document.querySelectorAll(".thumbnail");
  thumbnails.forEach((thumb) => thumb.classList.remove("active-thumbnail"));
  thumbnails[index].classList.add("active-thumbnail");
}

// f: setup cart functions
function setupCartFunctions(product) {
  const addToCartButton = document.getElementById("add-to-cart");
  const incrementButton = document.getElementById("increment");
  const decrementButton = document.getElementById("decrement");
  const quantityDisplay = document.getElementById("quantity");

  let quantity = 1;
  console.log("Product:", product.id, product);
  // Update quantity display on increment button click
  incrementButton.addEventListener("click", () => {
    quantity++;
    quantityDisplay.textContent = quantity;
  });

  // Update quantity display on decrement button click
  decrementButton.addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      quantityDisplay.textContent = quantity;
    }
  });

  if (addToCartButton) {
    addToCartButton.addEventListener("click", () => {
      console.log("Adding to cart1:", product.id, quantity);
      addToCart(product.id, quantity);
      showCartNotification(product, quantity);
    });
  } else {
    console.error("Add to Cart button not found.");
  }
}

// Function to add products to the cart with a specified quantity
function addToCart(productId, quantity) {
  const product = products[productId];  // Fetch product using productId as key
  
  if (product) {
    const cartItem = {
      ...product,  // Copy product data
      quantity: quantity || 1  // Default quantity is 1 if not specified
    };

    // Check if product already exists in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
      // Update the quantity if the item already exists
      existingItem.quantity += cartItem.quantity;
    } else {
      // Add the product to the cart if it's not in the cart yet
      cart.push(cartItem);
    }

    // Store updated cart in localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("Cart updated", cart);
  } else {
    console.error("Product not found with ID:", productId);
  }
}

// f: show notification in product.html
function showCartNotification(product, quantity) {
  const notification = document.querySelector(".notification");
  document.getElementById("notification-name").textContent = `"${product.name}" x${quantity}`;
  notification.classList.add("visible");

  setTimeout(() => notification.classList.remove("visible"), 3000);
}

console.log("script.js loaded");

