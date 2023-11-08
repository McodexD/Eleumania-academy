// Wait for the DOM to finish loading before running scripts
document.addEventListener('DOMContentLoaded', function() {
  // Get the mobile menu button and navigation menu
  var mobileMenuButton = document.querySelector('#mobile-menu-button');
  var mainNavigation = document.querySelector('#main-navigation');

  // When the mobile menu button is clicked, toggle the "active" class on the navigation menu
  mobileMenuButton.addEventListener('click', function() {
    mainNavigation.classList.toggle('active');
  });

  // Get the contact form and form fields
  var contactForm = document.querySelector('#contact-form');
  var nameField = document.querySelector('#name');
  var emailField = document.querySelector('#email');
  var messageField = document.querySelector('#message');
  var sendButton = document.querySelector('#send-button');

  // When the send button is clicked, validate the form and send the data via AJAX
  sendButton.addEventListener('click', function(event) {
    event.preventDefault();

    // Validate the name field
    if (nameField.value.trim() === '') {
      alert('Please enter your name.');
      nameField.focus();
      return false;
    }

    // Validate the email field
    if (emailField.value.trim() === '') {
      alert('Please enter your email address.');
      emailField.focus();
      return false;
    } else if (!/^\S+@\S+\.\S+$/.test(emailField.value.trim())) {
      alert('Please enter a valid email address.');
      emailField.focus();
      return false;
    }

    // Validate the message field
    if (messageField.value.trim() === '') {
      alert('Please enter a message.');
      messageField.focus();
      return false;
    }

    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Define the callback function for when the request is complete
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        alert('Your message has been sent!');
        contactForm.reset();
      }
    };

    // Open a new POST request to the server-side script
    xhr.open('POST', 'contact-form-handler.php');

    // Set the request headers
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    // Encode the form data as URL-encoded key-value pairs
    var formData = 'name=' + encodeURIComponent(nameField.value) +
                   '&email=' + encodeURIComponent(emailField.value) +
                   '&message=' + encodeURIComponent(messageField.value);

    // Send the request with the encoded form data
    xhr.send(formData);
  });
});
