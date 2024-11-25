// Product data (this can also come from an API or JSON file)
const products = {
    "green-pea": {
      name: "green pea",
      subname: "scrunchie",
      price: "S$6.00",
      description: "a beautiful green pea scrunchie made from soft cotton fabric, perfect for your hair accessories collection.",
      category: "scrunchies",
      images: [
        "scrunchies/green pea.jpg",
        "scrunchies/green pea 2.jpg",
        "scrunchies/green pea 3.jpg"
      ],
    },

    "sunlit-meadow": {
        name: "sunlit meadow",
        subname: "scrunchie",
        price: "S$7.00",
        description: "a beautiful sunlit meadow scrunchie made from soft cotton fabric, perfect for your hair accessories collection.",
        category: "scrunchies",
        images: [
            "scrunchies/sunlit meadow.jpg",
            "scrunchies/sunlit meadow 2.jpg",
            "scrunchies/sunlit meadow 3.jpg"
        ],
    },

    "lavender-mist": {
        name: "lavender mist",
        subname: "scrunchie",
        price: "S$6.00",
        description: "a beautiful lavender mist scrunchie made from soft cotton fabric, perfect for your hair accessories collection.",
        category: "scrunchies",
        images: [
            "scrunchies/lavender mist.jpg",
            "scrunchies/lavender mist 2.jpg",
            "scrunchies/lavender mist 3.jpg"
        ],
    },
     
    "marshmallow": {
        name: "marshmallow",
        subname: "scrunchie",
        price: "S$6.00",
        description: "a beautiful marshmallow scrunchie made from soft cotton fabric, perfect for your hair accessories collection.",
        category: "scrunchies",
        images: [
            "scrunchies/marshmallow.jpg",
            "scrunchies/marshmallow 2.jpg",
            "scrunchies/marshmallow 3.jpg"
        ],
    }

  };
  
  // url (e.g., ?id=green-pea)
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  
  let currentIndex = 0;

  if (productId && products[productId]) {
    const product = products[productId];
  
    // update breadcrumbs
    document.getElementById("breadcrumb-category").textContent = product.category;
    document.getElementById("breadcrumb-category").href = `${product.category}.html`;
    document.getElementById("breadcrumb-product").textContent = product.name;
  
    // update notification
    document.getElementById("notification-name").textContent = product.name;
  
    // update product info
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-subname").textContent = product.subname;
    document.getElementById("product-price").textContent = product.price;
    document.getElementById("product-description").textContent = product.description;
  
    // update carousel images & thumbnails
    const carouselImages = document.getElementById("carousel-images");
    const carouselThumbnails = document.getElementById("carousel-thumbnails");
  
    product.images.forEach((src, index) => {
      // Create main carousel image
      const img = document.createElement("img");
      img.src = src;
      img.alt = product.name;
      img.style.display = index === 0 ? 'block' : 'none'; // Show only the first image initially
      carouselImages.appendChild(img);
  
      // Create thumbnail image
      const thumbnail = document.createElement("img");
      thumbnail.src = src;
      thumbnail.alt = `Thumbnail for ${product.name}`;
      thumbnail.classList.add("thumbnail");
      thumbnail.addEventListener("click", () => setSlide(index)); // Add click event to set the image
      carouselThumbnails.appendChild(thumbnail);
    });
  
    // Function to update the main image based on the thumbnail click
    function setSlide(index) {
      const images = document.querySelectorAll("#carousel-images img");
      const thumbnails = document.querySelectorAll(".carousel-thumbnails img");
      
      // Hide all images
      images.forEach(img => img.style.display = 'none');
      // Show the selected image
      images[index].style.display = 'block';
  
      // Remove 'active-thumbnail' class from all thumbnails
      thumbnails.forEach(thumb => thumb.classList.remove("active-thumbnail"));
      // Add 'active-thumbnail' class to the selected thumbnail
      thumbnails[index].classList.add("active-thumbnail");
  
      currentIndex = index; // Update the currentIndex
    }
  
    // Next slide functionality
    window.nextSlide = function () {
      const images = document.querySelectorAll("#carousel-images img");
      images[currentIndex].style.display = 'none'; // Hide the current image
      currentIndex = (currentIndex + 1) % images.length; // Move to the next image (loop back to 0)
      images[currentIndex].style.display = 'block'; // Show the new current image
  
      // Update thumbnail active state
      setSlide(currentIndex);
    };
  
    // Previous slide functionality
    window.prevSlide = function () {
      const images = document.querySelectorAll("#carousel-images img");
      images[currentIndex].style.display = 'none'; // Hide the current image
      currentIndex = (currentIndex - 1 + images.length) % images.length; // Move to the previous image (loop back to the last)
      images[currentIndex].style.display = 'block'; // Show the new current image
  
      // Update thumbnail active state
      setSlide(currentIndex);
    };
    
    

  } else {
    console.error("Product not found");
  }
  


// Ensure the notification is hidden when the page first loads
window.onload = function () {
    document.querySelector(".notification").style.display = "none";  // Hide the notification
};

// Function to add an item to the cart and show the notification
function addTocart() {
    const productName = "marshmallow"; // Get the product name dynamically if needed

    // Show the notification and update the product name
    const notification = document.querySelector(".notification");
    const notificationName = document.getElementById("notification-name");
    notificationName.textContent = `"${productName}"`;  // Set the product name dynamically

    // Show notification
    notification.style.display = "flex";

    // Hide the notification after 5 seconds
    setTimeout(function () {
        notification.style.display = "none";
    }, 5000);
}


