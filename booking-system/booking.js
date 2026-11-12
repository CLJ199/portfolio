// Booking functionality
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const bookTitle = document.getElementById('bookTitle').value.trim();
    const bookingMessage = document.getElementById('bookingMessage');

    if (bookTitle === '') {
        bookingMessage.textContent = '❌ Please enter a book title or number';
        bookingMessage.className = 'error';
        return;
    }

    const username = localStorage.getItem('loggedInUser');
    const today = new Date();
    const returnDate = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000); // 14 days later

    // Create book object
    const newBook = {
        title: bookTitle,
        student: username,
        dateBooked: today.toLocaleDateString(),
        returnDate: returnDate.toLocaleDateString()
    };

    // Store in localStorage
    let allBooks = JSON.parse(localStorage.getItem('allBooks')) || [];
    allBooks.push(newBook);
    localStorage.setItem('allBooks', JSON.stringify(allBooks));

    // Success message
    bookingMessage.textContent = '✅ Book "' + bookTitle + '" booked successfully! Return date: ' + returnDate.toLocaleDateString();
    bookingMessage.className = 'success';

    // Clear input
    document.getElementById('bookTitle').value = '';

    // Reload user books
    const username2 = localStorage.getItem('loggedInUser');
    loadUserBooks(username2);

    // Clear message after 4 seconds
    setTimeout(() => bookingMessage.textContent = '', 4000);
});

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('isLoggedIn');
    location.reload();
});