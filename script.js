// Product data (can also come from an API or JSON file)
const products = {
  "s-green-pea": {
    id: "s-green-pea",
    name: "green pea",
    subname: "scrunchie",
    price: 6.00,
    description: "A beautiful green pea scrunchie made from soft cotton fabric, perfect for your hair accessories collection.",
    category: ["shop-all", "scrunchies", "bestsellers"],
    images: ["scrunchies/green-pea.jpg", "scrunchies/green-pea2.jpg", "scrunchies/green-pea3.jpg"]
  },
  "s-sunlit-meadow": {
    id: "s-sunlit-meadow",
    name: "sunlit meadow",
    subname: "scrunchie",
    price: 7.00,
    description: "A beautiful sunlit meadow scrunchie made from soft cotton fabric, perfect for your hair accessories collection.",
    category: ["shop-all", "scrunchies", "bestsellers"],
    images: ["scrunchies/sunlit-meadow.jpg", "scrunchies/sunlit-meadow2.jpg", "scrunchies/sunlit-meadow3.jpg"]
  },
  "s-lavender-mist": {
    id: "s-lavender-mist",
    name: "lavender mist",
    subname: "scrunchie",
    price: 6.00,
    description: "A beautiful lavender mist scrunchie made from soft cotton fabric, perfect for your hair accessories collection.",
    category: ["shop-all", "scrunchies"],
    images: ["scrunchies/lavender-mist.jpg", "scrunchies/lavender-mist2.jpg", "scrunchies/lavender-mist3.jpg"]
  },
  "s-marshmallow": {
    id: "s-marshmallow",
    name: "marshmallow",
    subname: "scrunchie",
    price: 6.00,
    description: "A beautiful marshmallow scrunchie made from soft cotton fabric, perfect for your hair accessories collection.",
    category: ["shop-all", "scrunchies"],
    images: ["scrunchies/marshmallow.jpg", "scrunchies/marshmallow-2.jpg", "scrunchies/marshmallow-3.jpg"]
  },
  "s-cotton-candy": {
    id: "s-cotton-candy",
    name: "cotton candy",
    subname: "scrunchie",
    price: 8.00,
    description: "A beautiful cotton candy scrunchie made from soft cotton fabric, perfect for your hair accessories collection.",
    category: ["shop-all", "scrunchies", "bestsellers"],
    images: ["scrunchies/cotton-candy.jpg", "scrunchies/cotton-candy.jpg", "scrunchies/cotton-candy.jpg"]
  },
  "k-flower-power": {
    id: "k-flower-power",
    name: "flower power",
    subname: "keychain",
    price: 15.00,
    description: "A beautiful flower power keychain made from soft cotton fabric, perfect for your keychain collection.",
    category: ["shop-all", "keychains", "bestsellers"],
    images: ["keychains/flower-power.jpg", "keychains/flower-power.jpg", "keychains/flower-power.jpg"]
  },
  "b-mellow-yellow": {
    id: "b-mellow-yellow",
    name: "mellow yellow",
    subname: "bouquet",
    price: 54.00,
    description: "A beautiful mellow yellow bag made from soft cotton fabric, perfect for your bag collection.",
    category: ["shop-all", "bouquets", "bestsellers"],
    images: ["bouquets/mellow-yellow.jpg", "bouquets/mellow-yellow.jpg", "bouquets/mellow-yellow.jpg"]
  },
};

// Globals
let currentIndex = 0;
let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  const category = urlParams.get("category"); // Get the category from URL
  updateCartNotification();

  // Render the product list if on the product-list page
  if (category) {
    renderProductList(category); // Call the function to render products based on category
  }

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

  // Only render checkout summary if on checkout page
  if (document.getElementById("checkout-summary")) {
    renderCheckoutSummary();
  }
});


// f: helper for DOM manipulation
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

// f: render products list
function renderProductList(category, filteredProducts = null) {
  const container = document.getElementById("product-list-container"); // Main container
  const formattedCategory = category.replace(/-/g, ' ');  // Replace all dashes with spaces
  // clear container for re-rendering
  container.innerHTML = '';

  // heading
  const sectionHeading = document.createElement('h2');
  sectionHeading.textContent = formattedCategory;
  sectionHeading.classList.add('heading-container');
  // Create the anchor element
  const headingLink = document.createElement('a');
  headingLink.href = `product-list.html?category=${category}`; // Set the link to the appropriate page
  // Append the heading to the anchor
  headingLink.appendChild(sectionHeading);
  // Append the anchor to the container
  container.appendChild(headingLink);


  // create + append the filter dropdown
  const filterContainer = document.createElement('div');
  filterContainer.classList.add('filter-container');

  const priceFilterDropdown = document.createElement('select');
  priceFilterDropdown.classList.add('price-filter-dropdown');
  priceFilterDropdown.id = 'priceFilter';

  // dropdown options
  const options = [
    { value: 'default', text: 'sort by price' },
    { value: 'low-to-high', text: 'lowest to highest' },
    { value: 'high-to-low', text: 'highest to lowest' }
  ];

  // add options to the dropdown
  options.forEach(optionData => {
    const option = document.createElement('option');
    option.value = optionData.value;
    option.textContent = optionData.text;
    priceFilterDropdown.appendChild(option);
  });

  // add event listener for price filtering
  priceFilterDropdown.addEventListener('change', () => {
    const filterValue = priceFilterDropdown.value;
    filterProductsByPrice(filterValue, category);
  });

  filterContainer.appendChild(priceFilterDropdown);
  container.appendChild(filterContainer);


  // Create a container for products
  const productsContainer = document.createElement('div');
  productsContainer.classList.add('products-container');
  container.appendChild(productsContainer);

  // Determine which products to render
  const selectedProducts = filteredProducts || [];
  if (!filteredProducts) {
    // Loop through all products
    Object.keys(products).forEach(key => {
      const product = products[key];

      // check if the category array contains the selected category
      if (product.category.includes(category)) {
        selectedProducts.push(product);
      }
    });
  }

  // display a message if no products are found
  if (selectedProducts.length === 0) {
    const noProductsMessage = document.createElement('p');
    noProductsMessage.textContent = 'No products found.';
    productsContainer.appendChild(noProductsMessage);
    return;
  }

  // Render the selected products
  selectedProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    const productLink = document.createElement('a');
    productLink.href = `product.html?id=${product.id}`;
    productLink.classList.add('product-link');

    const productImageContainer = document.createElement('div');
    productImageContainer.classList.add('product-image-container');
    const productImage = document.createElement('img');
    productImage.src = product.images[0];
    productImage.alt = product.name;
    productImage.classList.add('product-image');
    productImageContainer.appendChild(productImage);

    const productName = document.createElement('p');
    productName.classList.add('product-name');
    productName.textContent = product.name;

    const productSubname = document.createElement('p');
    productSubname.classList.add('product-subname');
    productSubname.textContent = product.subname;

    const productPrice = document.createElement('p');
    productPrice.classList.add('product-price');
    productPrice.textContent = `S$${product.price.toFixed(2)}`;

    productLink.appendChild(productImageContainer);
    productLink.appendChild(productName);
    productLink.appendChild(productSubname);
    productLink.appendChild(productPrice);
    productCard.appendChild(productLink);

    productsContainer.appendChild(productCard);
  });
}

// f: render cart items
function renderCartItems() {
  const cartItemsContainer = document.getElementById("cart-items");

  // Check if the cart container exists
  if (!cartItemsContainer) {
    console.error("Cart container not found!");
    return;
  }

  cartItemsContainer.innerHTML = ""; // Clear existing items

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>your cart is empty.</p>";
    updateCartTotal();
    return;
  }

  cart.forEach((item, index) => {
    const cartItemDiv = document.createElement("div");
    cartItemDiv.classList.add("cart-item");

    // Product Image
    const productImage = document.createElement("img");
    productImage.classList.add("cart-product-image");
    productImage.src = item.images && item.images.length > 0 ? item.images[0] : "scrunchies/cotton-candy.jpg";
    productImage.alt = item.images && item.images.length > 0 ? item.name : "No image available";

    // Product Details 
    const productDetails = document.createElement("div");
    productDetails.classList.add("cart-product-details");

    const productName = document.createElement("h3");
    productName.textContent = item.name;

    const productSubname = document.createElement("p");
    productSubname.classList.add("product-subname");
    productSubname.textContent = item.subname;

    const productPrice = document.createElement("p");
    productPrice.classList.add("cart-product-price");
    productPrice.textContent = `S$${item.price.toFixed(2)}`;

    productDetails.appendChild(productName);
    productDetails.appendChild(productSubname);
    productDetails.appendChild(productPrice);

    // Quantity Controls
    const quantityControls = document.createElement("div");
    quantityControls.classList.add("quantity-controls");

    const decrementButton = document.createElement("button");
    decrementButton.textContent = "-";
    decrementButton.classList.add("decrement");

    const quantityDisplay = document.createElement("span");
    quantityDisplay.textContent = item.quantity;
    quantityDisplay.classList.add("quantity-display");

    const incrementButton = document.createElement("button");
    incrementButton.textContent = "+";
    incrementButton.classList.add("increment");


    quantityControls.appendChild(decrementButton);
    quantityControls.appendChild(quantityDisplay);
    quantityControls.appendChild(incrementButton);

    // Remove Button
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");

    // Add Font Awesome icon
    const icon = document.createElement("i");
    icon.classList.add("fas", "fa-times"); // Font Awesome cross icon
    removeButton.appendChild(icon);


    // Append everything to the cart item div
    cartItemDiv.appendChild(productImage);
    cartItemDiv.appendChild(productDetails);
    cartItemDiv.appendChild(quantityControls);
    cartItemDiv.appendChild(removeButton);
    cartItemsContainer.appendChild(cartItemDiv);

    // Event Listeners for Quantity Adjustment
    incrementButton.addEventListener("click", () => {
      item.quantity++;
      quantityDisplay.textContent = item.quantity;
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartNotification();
      updateCartTotal();
    });

    decrementButton.addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity--;
        quantityDisplay.textContent = item.quantity;
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartNotification();
        updateCartTotal();
      }
    });

    // Remove Button Logic
    removeButton.addEventListener("click", () => {
      cart.splice(index, 1); // Remove the item from the cart
      localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
      updateCartNotification();
      renderCartItems(); // Re-render cart items
      updateCartTotal(); // Update totals
    });
  });

  updateCartTotal(); // Ensure the total is updated after rendering
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

// f: render checkout page
function renderCheckoutSummary() {
  const cartItemsContainer = document.getElementById("checkout-items");
  if (!cartItemsContainer) {
    console.error("Cart container not found!");
    return;
  }

  cartItemsContainer.innerHTML = ""; // Clear existing items

  cart.forEach(item => {
    const cartItemDiv = document.createElement("div");
    cartItemDiv.classList.add("checkout-item");

    // Product Image
    const productImage = document.createElement("img");
    productImage.src = item.images && item.images.length > 0 ? item.images[0] : "scrunchies/cute one.jpg";
    productImage.alt = item.images && item.images.length > 0 ? item.name : "No image available";

    // Product Details
    const productDetails = document.createElement("div");
    productDetails.classList.add("checkout-details");

    const productName = document.createElement("p");
    productName.textContent = `${item.name}`;
    productName.classList.add("checkout-product-name");

    const productQuantity = document.createElement("p");
    productQuantity.textContent = `qty : ${item.quantity}`;
    productQuantity.classList.add("product-subname");

    const productPrice = document.createElement("p");
    productPrice.textContent = `S$${(item.price * item.quantity).toFixed(2)}`;
    productPrice.classList.add("checkout-product-price");

    productDetails.appendChild(productName);
    productDetails.appendChild(productQuantity);
    productDetails.appendChild(productPrice);

    // Append elements to cart item
    cartItemDiv.appendChild(productImage);
    cartItemDiv.appendChild(productDetails);
    cartItemsContainer.appendChild(cartItemDiv);
  });

  updateCheckoutTotal();
}

// f: setup cart functions
function setupCartFunctions(product) {
  const addToCartButton = document.getElementById("add-to-cart");
  const incrementButton = document.getElementById("increment");
  const decrementButton = document.getElementById("decrement");
  const quantityDisplay = document.getElementById("quantity");

  if (!incrementButton || !decrementButton || !quantityDisplay) {
    console.error("Quantity buttons or display not found.");
    return;
  }

  // Initialize quantity button logic
  const getQuantity = setupQuantityButtons(incrementButton, decrementButton, quantityDisplay);

  if (addToCartButton) {
    addToCartButton.addEventListener("click", () => {
      const quantity = getQuantity(); // Get the current quantity
      console.log("Adding to cart:", product.id, quantity);
      addToCart(product.id, quantity);
      showCartNotification(product, quantity);
    });
  } else {
    console.error("Add to Cart button not found.");
  }
}

// f: add to cart
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
    updateCartNotification();
    console.log("cart updated", cart);

  } else {
    console.error("Product not found with ID:", productId);
  }
}

// f: update cart total price summary
function updateCartTotal() {
  const subtotalElement = document.getElementById("subtotal");
  const discountElement = document.getElementById("discount");
  const totalElement = document.getElementById("total");

  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price * item.quantity;
  });

  const discount = 0; // Adjust this based on promo code logic
  const total = subtotal - discount;

  subtotalElement.textContent = `S$${subtotal.toFixed(2)}`;
  discountElement.textContent = `S$${discount.toFixed(2)}`;
  totalElement.textContent = `S$${total.toFixed(2)}`;
}

// f: update checkout total price summary
function updateCheckoutTotal() {
  let subtotal = 0;
  cart.forEach(item => {
    subtotal += item.price * item.quantity;
  });

  const shipping = 5.00; // Shipping cost (could be dynamic)
  const total = subtotal + shipping;

  document.getElementById("subtotal").textContent = `S$${subtotal.toFixed(2)}`;
  document.getElementById("shipping").textContent = `S$${shipping.toFixed(2)}`;
  document.getElementById("total").textContent = `S$${total.toFixed(2)}`;
}

// f: quantity update
function setupQuantityButtons(incrementButton, decrementButton, quantityDisplay, initialQuantity = 1) {
  let quantity = initialQuantity;

  const updateQuantityDisplay = () => {
    quantityDisplay.textContent = quantity;
  };

  incrementButton.addEventListener("click", () => {
    quantity++;
    updateQuantityDisplay();
  });

  decrementButton.addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      updateQuantityDisplay();
    }
  });

  updateQuantityDisplay(); // Initialize display
  return () => quantity; // Return a function to get the current quantity
}

// f: update the cart notification
function updateCartNotification() {

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0); // Calculate the total number of items in the cart
  const cartNotification = document.getElementById("cart-notification");
  const cartCountElement = document.getElementById("cart-count");

  cartCountElement.textContent = cartCount; // Update the count in the notification

  // show notification if cart is not empty
  if (cartCount > 0) {
    cartNotification.classList.add("visible");
  } else {
    cartNotification.classList.remove("visible");
  }
}

// f: show notification in product.html
function showCartNotification(product, quantity) {
  const notification = document.querySelector(".notification");
  const body = document.body;
  const notificationContainer = document.querySelector(".notification-container");  // To find the notification container

  if (notification.classList.contains("visible")) {
    notification.classList.remove("visible");
  }

  document.getElementById("notification-name").textContent = `"${product.name}" x${quantity}`;
  notification.classList.add("visible");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  setTimeout(() => {
    notification.classList.remove("visible");
    body.classList.remove("notification-visible"); // Remove the space after notification disappears
  }, 4000);
}

// f: carousel setup
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

// f: change slide sliding effect for carousel
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

// Filter function to handle sorting
function filterProductsByPrice(order, category) {
  const selectedProducts = Object.keys(products).map(key => products[key])
    .filter(product => product.category.includes(category) || product.category === category);

  // Sort products based on selected order
  if (order === 'low-to-high') {
    selectedProducts.sort((a, b) => a.price - b.price);
  } else if (order === 'high-to-low') {
    selectedProducts.sort((a, b) => b.price - a.price);
  }

  // Re-render the products with the sorted order
  renderProductList(category, selectedProducts);
}

console.log("script.js loaded");