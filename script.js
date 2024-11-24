// Script for managing breadcrumb clicks or adding more functionality, if needed
/*document.addEventListener('DOMContentLoaded', () => {
    const breadcrumbLinks = document.querySelectorAll('.breadcrumb a');
    
    breadcrumbLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevents the default action of the link (going to the next page)
            alert('Navigating to: ' + this.textContent);
        });
    });
});
*/
document.addEventListener('DOMContentLoaded', function() {
    const breadcrumbLinks = document.querySelectorAll('.breadcrumb a');
    
    breadcrumbLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default link action
            
            // Actual navigation logic
            const href = this.getAttribute('href');
            window.location.href = href; // This will navigate to the page defined in the link's href
        });
    });
});
