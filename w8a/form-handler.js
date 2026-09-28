// --- Part 3: Implement the form-handler.js module ---
// form-handler.js


// This module handles getting input values from the form and clearing it.
// Simplified: Only focuses on Household Size input for now.

// Step - Copy needed references include comments
// References the main carbon footprint form in the page.
const carbonFootprintForm = document.getElementById('carbonFootprintForm');

// How we "might" reference the radio buttons?
// References the household members input inside the form.
const householdMembersInput = carbonFootprintForm.querySelector('#householdMembers');

// Home Size reference
const homeSquareFootageInput = carbonFootprintForm.querySelector('#homeSquareFootage');

// Apartment Checkbox reference
const isApartmentInput = carbonFootprintForm.querySelector('#isApartment');

// Food Choices reference (radio buttons - we need to query for all with the same 'name')
// this returns a node list, which is array "like"
// An Array is a list of items array[index]
const dietTypeRadios = carbonFootprintForm.querySelectorAll('input[name="dietType"]');
const foodPackagingRadios = carbonFootprintForm.querySelectorAll('input[name="foodPackaging"]');

// @param {NodeList} radioButtons - A NodeList (like an array) of radio button elements.
// @returns {string} The 'value' attribute of the selected radio button.

// Write a function to handle this and return the value
const getSelectedRadioValue = function (radioButtons) {
    // Loop over the node list to find the radio button checked (clicked)
    // Dry - Don't Repeat Yourself
    // for...of to loop over node list (array like)
    for (const radio of radioButtons) {
        // Code to be executed for each value
        if (radio.checked) {
            console.log(`${radio.value} has the attribute of ${radio.checked}`);
            return radio.value;
        }
    }
    return '';
};


//--- Part 1: Code clearForm and getFormInput
// Collects all relevant input values from the form for Household Size, Home Size, and Food Choices.
// @returns {Object} An object containing all the collected input values.
export const getFormInputs = function () {
    console.log('Get Form Inputs');

    // Read the 'value' from number inputs and convert to numbers
    // Read the 'checked' property for checkboxes.

    // Declare a locally scoped valued for square footage
    // const homeSquareFootage = parseInt(homeSquareFootageInput.value) || 0;
    // Declare a locally scoped value for isApartment
    // const isApartment = isApartmentInput.checked;
    // return houseHoldMember to app.js handleFormSubmit function

    // Refactor return to be an object literal
    // const objLiteral = {
    //     householdMembers: parseInt(householdMembersInput.value) || 1,
    //     homeSquareFootage: parseInt(homeSquareFootageInput.value) || 0,
    //     isApartment: isApartmentInput.checked
    // }
    const selectDietType = getSelectedRadioValue(dietTypeRadios);


    return {
        householdMembers: parseInt(householdMembersInput.value) || 1,
        homeSquareFootage: parseInt(homeSquareFootageInput.value) || 0,
        isApartment: isApartmentInput.checked,
        dietType: getSelectedRadioValue(dietTypeRadios),
        foodPackaging: getSelectedRadioValue(foodPackagingRadios)
    };
    
};

// Clears all input fields in the form and resets default selections.
export const clearForm = function () {
    // Step - Move code to clear form into module
    carbonFootprintForm.reset();
    householdMembersInput.value = 1;
    homeSquareFootageInput.value = 0;
    dietTypeRadios[0].checked;
    foodPackagingRadios[0].checked;
    console.log('Clear Form');
};