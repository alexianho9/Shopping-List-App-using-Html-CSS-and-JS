/*
document.getElementById('shopping-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission


    // gET INPUT VALUE 

    const itemInput = document.getElementById('item-input');
    const itemText = itemInput.value.trim();


    if (itemText === '') return; //ignores an empty input

    // Create List item (li) as it was not created in html

    const li = document.createElement('li');
    li.innerHTML = `
    
        <span> ${itemText}</span>
        <button>Delete</button>    
    `;

    // Toggle completed on click 

    li.querySelector('span').addEventListener('click', function() {
        li.classList.toggle('completed');
    });

    // Dlete item on button click
    li.querySelector('button').addEventListener('click', function() {
        li.remove();
    });

    // aDD TO LIST AND CLEAR INPUT 

    document.getElementById('shopping-list').appendChild(li);
    itemInput.value = '';

    // Focus input on page load 

    document.getElementById('item-input').focus();
});

*/


// Part 2

/* Enhancements Ideas 
LocalStorage: Save the list so it persists on page refresh.
Add localStorage.setItem when adding items and load them on page load.

Edit Items: Add an "Edit" button to modify items.

Categories: Group items (e.g., "Groceries," "Electronics").

Validation: Prevent duplicate items.

*/


/*
// Load items from LocalStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedItems = JSON.parse(localStorage.getItem('shoppingList')) || [];
    const shoppingList = document.getElementById('shopping-list');

    savedItems.forEach(item => {
        createListItem(item.text, item.completed);
    });

    // Focus input on load
    document.getElementById('item-input').focus();
});

// Handle form submission
document.getElementById('shopping-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission

    // Get input value
    const itemInput = document.getElementById('item-input');
    const itemText = itemInput.value.trim();

    if (itemText === '') return; // Ignore empty input

    // Create and add item
    createListItem(itemText, false);

    // Clear input
    itemInput.value = '';
});

// Function to create a list item and add event listeners
function createListItem(text, completed = false) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${text}</span>
        <button>Delete</button>
    `;

    if (completed) {
        li.classList.add('completed');
    }

    // Toggle completed state
    li.querySelector('span').addEventListener('click', function() {
        li.classList.toggle('completed');
        saveItems();
    });

    // Delete item
    li.querySelector('button').addEventListener('click', function() {
        li.remove();
        saveItems();
    });

    // Add to DOM
    document.getElementById('shopping-list').appendChild(li);

    // Save to LocalStorage
    saveItems();
}

// Function to save all items to LocalStorage
function saveItems() {
    const items = Array.from(document.querySelectorAll('#shopping-list li')).map(li => ({
        text: li.querySelector('span').textContent,
        completed: li.classList.contains('completed')
    }));
    localStorage.setItem('shoppingList', JSON.stringify(items));
}


*/

// Part 3

document.addEventListener('DOMContentLoaded', function() {
    const savedItems = JSON.parse(localStorage.getItem('shoppingList')) || [];
    const shoppingList = document.getElementById('shopping-list');

    savedItems.forEach(item => {
        createListItem(item.text, item.category, item.completed);
    });

    document.getElementById('item-input').focus();
});

document.getElementById('shopping-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const itemInput = document.getElementById('item-input');
    const categorySelect = document.getElementById('category-select');
    const itemText = itemInput.value.trim();
    const category = categorySelect.value;

    if (itemText === '' || isDuplicate(itemText)) {
        if (isDuplicate(itemText)) alert('Item already exists!');
        return;
    }

    createListItem(itemText, category, false);
    itemInput.value = '';
});

// Check for duplicate items
function isDuplicate(text) {
    const items = Array.from(document.querySelectorAll('#shopping-list .item-text'));
    return items.some(item => item.textContent.toLowerCase() === text.toLowerCase());
}

// Create a list item
function createListItem(text, category, completed = false) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span class="item-text">${text}</span>
        <span class="category">[${category}]</span>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
    `;

    if (completed) {
        li.classList.add('completed');
    }

    // Toggle completed state
    li.querySelector('.item-text').addEventListener('click', function() {
        li.classList.toggle('completed');
        saveItems();
    });

    // Edit item
    li.querySelector('.edit').addEventListener('click', function() {
        const newText = prompt('Edit item:', text);
        if (newText && newText.trim() !== '' && !isDuplicate(newText.trim())) {
            li.querySelector('.item-text').textContent = newText.trim();
            saveItems();
        } else if (isDuplicate(newText.trim())) {
            alert('Item already exists!');
        }
    });

    // Delete item
    li.querySelector('.delete').addEventListener('click', function() {
        li.remove();
        saveItems();
    });

    document.getElementById('shopping-list').appendChild(li);
    saveItems();
}

// Save items to LocalStorage
function saveItems() {
    const items = Array.from(document.querySelectorAll('#shopping-list li')).map(li => ({
        text: li.querySelector('.item-text').textContent,
        category: li.querySelector('.category').textContent.slice(1, -1), // Remove brackets
        completed: li.classList.contains('completed')
    }));
    localStorage.setItem('shoppingList', JSON.stringify(items));
}