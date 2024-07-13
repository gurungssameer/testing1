document.addEventListener("DOMContentLoaded", function() {
    const paragraph = "Discover the ultimate in comfort and luxury at our hotel. Whether you're here for business or pleasure, we ensure your stay is unforgettable. Enjoy top-notch amenities, exceptional service, and a prime location. Your perfect escape awaits! 🌟";

    let paragraphIndex = 0;
    let isDeleting = false;
    let speed = 100;

    function typeEffect() {
        if (paragraphIndex < paragraph.length && !isDeleting) {
            document.getElementById('auto-type-paragraph').innerHTML = paragraph.substring(0, paragraphIndex + 1);
            paragraphIndex++;
            setTimeout(typeEffect, speed);
        } else if (paragraphIndex === paragraph.length && !isDeleting) {
            isDeleting = true;
            setTimeout(deleteEffect, 2000);
        }
    }

    function deleteEffect() {
        if (paragraphIndex > 0 && isDeleting) {
            document.getElementById('auto-type-paragraph').innerHTML = paragraph.substring(0, paragraphIndex - 1);
            paragraphIndex--;
            setTimeout(deleteEffect, speed);
        } else if (paragraphIndex === 0 && isDeleting) {
            isDeleting = false;
            setTimeout(typeEffect, 1000);
        }
    }

    typeEffect();

    // Show/hide nav bar on scroll
    let lastScrollTop = 0;
    const nav = document.querySelector('nav');

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        if (currentScroll > lastScrollTop) {
            // Down scroll
            nav.style.top = "-80px"; // Hide nav
        } else {
            // Up scroll
            nav.style.top = "0"; // Show nav
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For mobile or negative scrolling
    });
});

function navigate() {
    window.open("https://www.google.com/maps/place/Boudhha,+Kathmandu+44600", "_blank");
}

  // nav bar 
  function toggleMenu() {
    const menu = document.querySelector('nav ul');
    menu.classList.toggle('active');
}




// scripts.js

const modal = document.getElementById('fullscreen-modal');
const modalImg = document.getElementById('fullscreen-img');
const captionText = document.getElementById('fullscreen-caption');
const closeModal = document.querySelector('.modal-close');
const prevButton = document.querySelector('.modal-prev');
const nextButton = document.querySelector('.modal-next');

// Array of image sources and captions
const images = [
  { src: 'bg.jpg', caption: 'Early Beginnings: Our hotel started as a small inn in the early 1900s, providing a cozy and welcoming environment for travelers.' },
  { src: 'about.png', caption: 'Expansion and Growth: In the 1950s, we expanded our facilities and introduced new services to better meet the needs of our guests.' },
  { src: 'bg.jpg', caption: 'Modern Era: In the 2000s, we underwent major renovations to offer modern amenities while preserving our historic charm.' },
  { src: 'about.png', caption: 'Today and Beyond: We continue to grow and evolve, striving to provide exceptional experiences for every guest.' },
  { src: 'bg.jpg', caption: 'Modern Era: In the 2000s, we underwent major renovations to offer modern amenities while preserving our historic charm.' },
  { src: 'about.png', caption: 'Today and Beyond: We continue to grow and evolve, striving to provide exceptional experiences for every guest.' }


];

// Function to open the modal
function openModal(index) {
  modal.style.display = 'block';
  modalImg.src = images[index].src;
  captionText.textContent = images[index].caption;
  currentIndex = index;
}

// Add event listeners to fullscreen buttons
document.querySelectorAll('.fullscreen-btn').forEach(button => {
  button.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default link behavior
    const index = parseInt(button.getAttribute('data-index'), 10);
    openModal(index);
  });
});

// Close the modal when clicking on the close button
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Navigate to the previous image
prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  openModal(currentIndex);
});

// Navigate to the next image
nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  openModal(currentIndex);
});

// Close the modal when clicking outside of the image
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// Initialize currentIndex
let currentIndex = 0;
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');
const chatbotReload = document.getElementById('chatbot-reload');
const chatbotSuggestions = document.getElementById('chatbot-suggestions');
const suggestionButtons = document.querySelectorAll('.suggestion');

const responses = {
  'hello': 'Hi there! How can I assist you today?',
  'how are you?': 'I am just a bot, but I am here to help you!',
  'what is your name?': 'I am a friendly chatbot created to assist you.',
  'bye': 'Goodbye! Have a great day!',
  'where are you located?': 'We are located at Solumthumdo. <a href="https://www.google.com/maps/place/Boudhha,+Kathmandu+44600" target="_blank">View on map</a>',
  'tell me about the hotel': 'Our hotel offers a blend of modern amenities and historic charm, providing exceptional experiences for all guests.',
  'what are the room prices?': 'Our room prices start at $100 per night, depending on the room type and season.',
  'what food options do you offer?': 'We offer a variety of food options including local delicacies, continental dishes, and vegetarian options.',
  'default': 'I am sorry, I do not understand that. Can you please rephrase?'
};

function addMessage(message, type) {
  const messageElement = document.createElement('div');
  messageElement.className = `chatbot-message ${type}`;
  messageElement.innerHTML = message; // Use innerHTML to support HTML content in responses
  chatbotMessages.appendChild(messageElement);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function getResponse(input) {
  const lowerCaseInput = input.toLowerCase();
  return responses[lowerCaseInput] || responses['default'];
}

function handleMessage(input) {
  if (input) {
    addMessage(input, 'user');
    const botResponse = getResponse(input);
    setTimeout(() => addMessage(botResponse, 'bot'), 500);
    chatbotInput.value = '';
  }
}

chatbotSend.addEventListener('click', () => {
  const userInput = chatbotInput.value.trim();
  handleMessage(userInput);
});

chatbotInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    chatbotSend.click();
  }
});

chatbotReload.addEventListener('click', () => {
  chatbotMessages.innerHTML = '';
  chatbotInput.value = '';
});

// Show suggestions on input focus or click
chatbotInput.addEventListener('focus', () => {
  chatbotSuggestions.classList.add('visible');
  chatbotSuggestions.classList.remove('hidden');
});

chatbotInput.addEventListener('click', () => {
  chatbotSuggestions.classList.add('visible');
  chatbotSuggestions.classList.remove('hidden');
});

// Hide suggestions on input blur after a short delay to allow click events on suggestions
chatbotInput.addEventListener('blur', () => {
  setTimeout(() => {
    chatbotSuggestions.classList.add('hidden');
    chatbotSuggestions.classList.remove('visible');
  }, 100);
});

suggestionButtons.forEach(suggestion => {
  suggestion.addEventListener('click', (event) => {
    const suggestionText = event.target.textContent.trim();
    console.log(`Suggestion clicked: ${suggestionText}`); // Debugging
    handleMessage(suggestionText);
  });
});

// Add a handler for suggestion buttons to prevent blur event from hiding the suggestions
chatbotSuggestions.addEventListener('mousedown', (event) => {
  event.preventDefault();
});



















/*************** booking  javascript *************/
document.getElementById('bookingForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = new FormData(this);

  fetch(this.action, {
      method: 'POST',
      headers: {
          'Accept': 'application/json'
      },
      body: formData
  })
  .then(response => {
      if (response.ok) {
          showAlert('Booking successful!', 'success');
          this.reset();
      } else {
          response.json().then(data => {
              if (data.errors) {
                  showAlert(data.errors.map(error => error.message).join(", "), 'error');
              } else {
                  showAlert('Booking failed. Please try again.', 'error');
              }
          });
      }
  })
  .catch(error => {
      console.error('Error:', error);
      showAlert('Booking failed. Please try again.', 'error');
  });
});

function showAlert(message, type) {
  const alertBox = document.createElement('div');
  alertBox.className = `alert ${type}`;
  alertBox.textContent = message;
  document.body.appendChild(alertBox);
  setTimeout(() => {
      alertBox.remove();
  }, 3000);
}
