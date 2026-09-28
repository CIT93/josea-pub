console.log('Hello from app.js! Your JavaScript is connected and running!');

// Week 5.1: Now save entries to localStorage after submission.
import * as formHandler from './form-handler.js';
import * as calculator from './calculator.js';
import * as resultsDisplay from './results-display.js';
import * as storage from './storage.js';
import * as tableRenderer from './table-renderer.js';
// We will modify the handleFormSubmit function to trigger the table update after a new entry.
// We will modify the init function to render the table immediately on page load with any loaded data.

// Declare a 'const' array to hold all submitted carbon footprint entries in memory.
// We use 'const' because the 'carbonFootprintEntries' variable will always refer to the same array, even though the array's contents will change (items added).
const carbonFootprintEntries = []; // Array literal - Global variable


// References the main carbon footprint form in the page.
const carbonFootprintForm = document.getElementById('carbonFootprintForm');

// References the household members input inside the form.
const householdMembersInput = carbonFootprintForm.querySelector('#householdMembers');

// References the button used to clear the form.
const clearFormButton = document.getElementById('clearFormButton');

// Get reference to Clear All Data button
const clearAllDataButton = document.getElementById('clearAllDataButton');

// State variables for in-line confirmation of "Clear All Data" button.
let isConfirmingClearAll = false; // Tracks if the button is in a "confirming" state.
let clearAllTimeoutId = null; // Stores the ID returned by setTimeout, so we can cancel it.

// Resets the "Clear All Data" button to its original text and appearance.
const resetClearAllButton = function() {
    // Clears any pending confirmation timeout.
    console.log(clearAllTimeoutId);
    if (clearAllTimeoutId) {
        // If a timeout is active (meaning the button is in a confirming state), clear it.
        clearTimeout(clearAllTimeoutId);
    }
    // Reset the confirmation state
    isConfirmingClearAll = false;
    // Restore original button text and remove any special styling class.
    clearAllDataButton.textContent = 'Clear All Data';
    clearAllDataButton.classList.remove('danger-button');
    clearAllDataButton.classList.remove('confirm-state');
    // Re-add danger-button if it was removed (it's part of initial styling)
    clearAllDataButton.classList.add('danger-button');
}

// Resets all UI-related confirmation states across the application.
const resetAllUIStates = function() {
    // This function is called when major actions (like form submit, clear, delete) occur, ensuring a clean UI state.
    // add to any function that updates DOM
    // This will be expanded in later weeks to include table row confirmations
    resetClearAllButton();
};

// Handles the form submission and reads the entered household count.
const handleFormSubmit = function (event) {
    event.preventDefault();
    const formData = formHandler.getFormInputs();
    // console.log(formData);
    const calculatedResults = calculator.calculateFootprint(formData);

    // Combine the input data with the calculated results into a single entry object.
    // Date.now() gives milliseconds since Jan 1, 1970. .toISOString() formats it nicely.
    // Use the spread operator '...' to quickly copy all properties from formData
    // Copy all properties from calculatedResults
    // Add a timestamp for when this entry was created.
    // Date.now() gives milliseconds since Jan 1, 1970. .toISOString() formats it nicely.
    const newEntry = {
        ...formData,
        ...calculatedResults,
        // Now using storage.generateUniqueId() for our newEntry object literal
        // This is a quick and simple way to get a generally unique ID based on a high-resolution numeric timestamp
        id: storage.generateUniqueId(),
        timestamp: new Date().toISOString()
    };
    // Add the new entry to our 'carbonFootprintEntries' array.
    carbonFootprintEntries.push(newEntry);
    // Log the full array!
    console.log(carbonFootprintEntries);

    // Save the entire 'carbonFootprintEntries' array to localStorage using our storage module.
    storage.saveEntries(carbonFootprintEntries);

    // console.log(calculatedResults);
    resultsDisplay.displayResult(calculatedResults);
    // Render the table with the updated list of entries.
    tableRenderer.renderTable(carbonFootprintEntries, {
        onDelete: handleDeleteEntry,
        onEdit: handleEditEntry
    });
    resetAllUIStates();
};

// New function to perform the actual clearing of all saved data.
const performClearAllData = function() {
    // Setting length to 0 efficiently clears the array while keeping its const reference.
    carbonFootprintEntries.length = 0;
    console.log("In-memory array cleared:", carbonFootprintEntries);
    storage.clearAllEntries();
    // Re-render table (will show "No entries")
    tableRenderer.renderTable(carbonFootprintEntries, {
        onDelete: handleDeleteEntry,
        onEdit: handleEditEntry
    });
    // Clear the form inputs
    formHandler.clearForm();
    // Hide the results section
    resultsDisplay.hideResults();
    resetAllUIStates();
};

// Resets the form state and restores the default household input value.
const handleClearForm = function () {
    formHandler.clearForm();
    resultsDisplay.hideResults();
    console.log('Clear Form button clicked!');
    resetAllUIStates();
};

// Handles the "Delete" action for a specific entry.
const handleDeleteEntry = function(id) {
    console.log(`Delete button clicked for entry with ID: ${id} functionality added in week 7`);
    // 1. Find the index of the entry to delete in our in-memory array.
    const indexToDelete = carbonFootprintEntries.findIndex(function(entry) {
        return entry.id === id;
    });
    if (indexToDelete !== -1) {
        // 2. Remove the entry from the in-memory array using splice().
        carbonFootprintEntries.splice(indexToDelete, 1);
        console.log(`Entry has been deleted from in-memory array.`);
        // 3. Save the modified (smaller) array back to localStorage.
        storage.saveEntries(carbonFootprintEntries);
        // 4. Re-render the table to reflect the deletion.
        tableRenderer.renderTable(carbonFootprintEntries, {
            onDelete: handleDeleteEntry,
            onEdit: handleEditEntry
        });
        // 5. If the array is now empty, hide the results and clear the form.
        if (carbonFootprintEntries.length === 0) {
            resultsDisplay.hideResults();
            formHandler.clearForm();
        }
        resetAllUIStates();
    } else {
        console.log(`Didn't find index`);
        resetAllUIStates();
    }
};

// Handles the "Edit" button click for a specific entry.
const handleEditEntry = function(id) {
    console.log(`Edit button clicked for entry with ID: ${id} functionality added in week 7`);

    resetAllUIStates();
};

// Sets up the app's event listeners after the DOM is ready.
const init = function () {
    console.log('App initialized: DOM is ready! Try submitting the form or clearing it.');

    carbonFootprintForm.addEventListener('submit', handleFormSubmit);
    clearFormButton.addEventListener('click', handleClearForm);
    resultsDisplay.hideResults();
    // On startup, attempt to load any previously saved entries from localStorage.
    const loadedEntries = storage.loadEntries();
    if (loadedEntries.length > 0) {
      // If data was loaded, add all entries from loadedEntries into our main
      // carbonFootprintEntries array using the spread operator (...). 
      carbonFootprintEntries.push(...loadedEntries);
      console.log('Entries loaded from localStorage:');
    } else {
        console.log('No entries found in localStorage.');
    }
    tableRenderer.renderTable(carbonFootprintEntries, {
        onDelete: handleDeleteEntry,
        onEdit: handleEditEntry
    });
    // init function - Event listener for "Clear All Data"
    clearAllDataButton.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevents this click from potentially triggering other global click listeners.
        if (isConfirmingClearAll) {
        // Second click: User confirms, so perform the action.
        performClearAllData();
        } else {
            // First click: Ask for confirmation by changing button text and state. 
            isConfirmingClearAll = true;
            clearAllDataButton.textContent = 'Are you sure? Click again to confirm.';
            // Add a class to change its appearance (defined in style.css).
            clearAllDataButton.classList.add('confirm-state');
            // Set a timeout to automatically revert the button state if the user doesn't click again.
            clearAllTimeoutId = setTimeout(function() {
                resetClearAllButton();
                console.log('Clear All Data confirmation timed out.');
            }, 3000); // 3 seconds
        }
    });
    // Global click listener to reset the "Clear All Data" button state
    // if the user clicks anywhere else on the page while confirmation is pending.
    // Only reset if we are in a confirming state AND the click was outside the button itself.
    document.addEventListener('click', function(event) {
        console.log(event.target);
        if (isConfirmingClearAll && event.target !== clearAllDataButton) {
            resetClearAllButton();   
        }
    });
};
document.addEventListener('DOMContentLoaded', init);