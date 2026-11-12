// Login functionality
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const loginMessage = document.getElementById('loginMessage');

    // Simple validation (In production, validate against a backend)
    if (username === '' || password === '') {
        loginMessage.textContent = '❌ Please enter both username and password';
        loginMessage.className = 'error';
        return;
    }

    // Simulate successful login (Replace with actual authentication)
    if (password.length >= 4) {
        // Store login info in localStorage
        localStorage.setItem('loggedInUser', username);
        localStorage.setItem('isLoggedIn', 'true');

        loginMessage.textContent = '✅ Login successful! Welcome, ' + username;
        loginMessage.className = 'success';

        // Disable login form
        document.getElementById('loginForm').style.display = 'none';

        // Show booking section
        document.getElementById('bookingSection').style.display = 'block';
        document.getElementById('personalCollection').style.display = 'block';
        document.getElementById('studentName').textContent = username;

        // Enable book-out button
        document.getElementById('bookOutBtn').disabled = false;

        // Load user's books
        loadUserBooks(username);

        // Auto-redirect to login after page refresh
        window.addEventListener('beforeunload', function() {
            // This will trigger on page refresh
        });

    } else {
        loginMessage.textContent = '❌ Invalid credentials';
        loginMessage.className = 'error';
    }
});

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function loadUserBooks(username) {
    // Retrieve books from localStorage
    const allBooks = JSON.parse(localStorage.getItem('allBooks')) || [];
    const userBooks = allBooks.filter(book => book.student === username);

    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    if (userBooks.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="4" style="text-align:center;">No books currently booked</td></tr>';
        return;
    }

    userBooks.forEach((book, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${escapeHtml(book.title)}</td>
            <td>${book.dateBooked}</td>
            <td>${book.returnDate}</td>
            <td><button class="btn-return" onclick="returnBook(${index})">Return</button></td>
        `;
        tableBody.appendChild(row);
    });
}

function returnBook(index) {
    const allBooks = JSON.parse(localStorage.getItem('allBooks')) || [];
    allBooks.splice(index, 1);
    localStorage.setItem('allBooks', JSON.stringify(allBooks));

    const username = localStorage.getItem('loggedInUser');
    loadUserBooks(username);

    const bookingMessage = document.getElementById('bookingMessage');
    bookingMessage.textContent = '✅ Book returned successfully!';
    bookingMessage.className = 'success';
    setTimeout(() => bookingMessage.textContent = '', 3000);
}

// Check if user is already logged in on page load
window.addEventListener('load', function() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        const username = localStorage.getItem('loggedInUser');
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('bookingSection').style.display = 'block';
        document.getElementById('personalCollection').style.display = 'block';
        document.getElementById('studentName').textContent = username;
        loadUserBooks(username);
    }
});