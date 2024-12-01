# Hooked on Loops
### Overview
Hooked on Loops is an eCommerce website dedicated to selling handmade crochet items, created by my mom. What started as a playful request from her to make a website for her crocheted scrunchies turned into my Assignment 1 website. The site features a collection of crochet items such as scrunchies, keychains, and bouquets, all lovingly crafted by her. The website offers a simple, user-friendly platform where customers can browse and purchase unique crochet products, highlighting the charm of handmade goods.

## Design Process
The design of Hooked on Loops centers around simplicity, warmth, and creating a welcoming experience for visitors. Since the website represents a home-based crochet business, it was important to convey a personal, handmade touch. The warm color scheme was specifically chosen to create a cozy and inviting atmosphere, helping visitors feel the warmth and care put into each crochet item. This design choice reflects the handmade nature of the products and creates an overall friendly, approachable vibe for users.

The layout and structure of the site were planned using Figma, where I created wireframes to ensure a smooth and intuitive user experience. The color palette features soft, warm tones, including shades of cream, soft pinks, and earthy colors, aligning with the handmade aesthetic of the brand.

### User Stories:
* As a shopper, I want to browse various crochet items so that I can find the perfect product to buy.

* As a customer, I want to view product details, such as descriptions and images, so that I can make informed purchasing decisions.

* As a user, I want to be able to add products to my cart and proceed to checkout.

* As a shopper, I want a simple checkout experience, so that I can easily complete my purchase.

### Design Tools:
Figma: Used to create wireframes and design mockups for the website’s layout and interface.
Figma Link: https://www.figma.com/design/eX4sD1qJYqJKKcQuaBmqMZ/FED_S10267129G_XuanTong_Assg1_wireframe?node-id=0-1&t=R1lZLri8Vv20FXWT-1

## Features
### Existing Features:
* Product Gallery - Displays different crochet products, including scrunchies, keychains, and bouquets. Users can browse through these items and select their preferences.

* Product Pages - Each product has its own page containing descriptions, images, and pricing to help customers make informed decisions.

* Shopping Cart - Users can add products to the shopping cart and review their selections before proceeding to checkout.

* Contact Page - A simple page that allows users to contact the business for inquiries or support.

### Features Left to Implement:
* Credit Card Payment Option - Add an option for users to enter credit card details during checkout to provide more flexibility in payment, in addition to the existing PayNow/PayLah options.

* Navigation Path - A navigation path (alternative to breadcrumbs) will be added at the top of the product and checkout pages to help users understand their location within the site and easily navigate back.

* Animation - Add animations that make elements slide in from the side when users scroll down or interact with the page. For example, when users scroll to a new section, elements could smoothly slide in from the left or right. This effect can be implemented using CSS animations combined with JavaScript to detect when elements enter the viewport. These animations will enhance the user interface and make the website feel more interactive.

## Technologies Used
* HTML:
  * Used to structure the content of the website, creating the foundational layout.
* CSS:
  * Applied styles to the website to ensure that it looks visually appealing and is responsive across different devices.
* JavaScript:
  * Implemented to handle interactive elements such as the shopping cart, product gallery, and checkout summary updates.

## Testing
1. **Shopping Cart**:
   * Ensures the cart updates when items are added, and users can proceed to checkout. The number of items is displayed as a notification above the cart.

   * When a product is added, a notification appears, and the screen scrolls up to the notification for immediate cart visibility.

2. **Product Pages**:
   * **Verify Product Image Carousel**: Click on the carousel arrows to navigate through images. The carousel should transition smoothly between images with a clear slide animation.

   * **Verify Dynamic Product Gallery**: Ensure the gallery loads with products displaying the correct images, descriptions, and prices. The gallery should update dynamically with applied filters or search.

   * **Verify Dynamic Product Details Page**: Click on products to navigate to the details page. Information such as description, images, and price should dynamically change based on the selected product.

   * **Responsive Design**: Test the product pages on various screen sizes (mobile - iPhone 14 Pro Max, desktop - 14-inch). All elements should adjust correctly using flexboxes for different devices.

3. **Cross-Browser Compatibility**:
   * Ensured consistent performance across Chrome, Firefox, and Safari, with all elements rendering correctly.


### Known Issues:
* As there is no database or user authentication system, user accounts are not available.

* The checkout process is functional but not fully operational, as it does not support advanced payment methods such as credit card details. Additionally, it does not track whether the payment is processed or whether all shipping details are filled out. These are future enhancements.

* The "Add to Cart" notification is not working fully properly on certain mobile screen sizes, as it may get cut off slightly in some cases.

* Checkout page can still be accessed even when cart is empty.

* The checkout page is not fully functional, with limitations in handling payment processing and order confirmation due to the lack of a secure database.

## Credits
### Content
* Product descriptions were written by ChatGPT based on each product.

### Media
* Product images for scrunchies were taken by me.
* Logo was made using canva by me.
* Icons used in the website are from Font Awesome.
* Images for keychains and bouquets were sourced from online:
  * flower-power (keychain): https://images.app.goo.gl/fCpdYz5V8ssgk6PTA
  * mellow-yellow (bouquet): https://i.pinimg.com/564x/b3/c2/e8/b3c2e86891b6ebeee44e2b1c12b300b5.jpg
  * crochet-gif: https://images.app.goo.gl/gLqPdYScdnopyNjKA
  * story-image: https://images.app.goo.gl/bDWn8TvvbLPXwQ3L8

### Acknowledgements
* This project was inspired by my mom’s new interest in crochet, and the playful request she made for me to create a website for her crocheted products. 
* ChatGPT for providing guidance and suggestions throughout the development process.
* The layout and design were also inspired by the ecommerce shop [rissaartt.shop](https://rissaartt.shop/shop-all/).
