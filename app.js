// Global Constants
const API_KEY = 'nOjzgnRK5wSxGHruvjd3HVSux7Zxk46H'
const LIMIT = 10;
const RATING = "g";

// Query Selectors
let gifForm = document.querySelector("form");
let gifArea = document.querySelector("#gif-area");
let showMoreButton = document.querySelector("#show-more-button");

// Variables
let searchUrl = "";
let searchTerm = "";
let pageNum = 0;
let offset = 0;

// Source for title: https://gist.github.com/CodeMyUI/6b138258eb7a1f02f7488a30ab70c609
jQuery(document).ready(function(){
    $('h1').mousemove(function(e){
      var rXP = (e.pageX - this.offsetLeft-$(this).width()/2);
      var rYP = (e.pageY - this.offsetTop-$(this).height()/2);
      $('h1').css('text-shadow', +rYP/10+'px '+rXP/80+'px rgba(227,6,19,.8), '+rYP/8+'px '+rXP/60+'px rgba(255,237,0,1), '+rXP/70+'px '+rYP/12+'px rgba(0,159,227,.7)');
    });
 });

// Event listener for the gifForm
// Activates on submit (when button is pressed or user hits enter)
gifForm.addEventListener("submit", handleFormSubmit);
showMoreButton.addEventListener("click", showMore);

// Handle form submit - 
function handleFormSubmit(e) {
    // Prevent page from reloading
    e.preventDefault();

    if (!showMoreButton.classList.contains("hidden")) {
        showMoreButton.classList.add("hidden");
    }

    // Clear existing gifs
    gifArea.innerHTML = "";

    // Store search term
    searchTerm = e.target.searchTerm.value;

    // Call function which will call api and then display gifs
    getGifs(e);

    // Replace search term in textbox back to empty string
    gifForm.target.searchTerm.value = "";
}

// Get results function - retrieves gif results from API
async function getGifs(e) {
    // Create the http request url
    searchUrl = "http://api.giphy.com/v1/gifs/search?api_key=" + API_KEY + "&q=" +
    searchTerm + "&limit=" + LIMIT + "&rating=" + RATING + "&offset=" + offset;
    console.log("url", searchUrl);
    
    // Fetch the response and response data
    let response = await fetch(searchUrl);
    let responseData = await response.json();

    console.log("responsedata", responseData);
    // Call the display gifs function
    displayGifs(responseData);

}

// Displays gifs - takes in the response data and uses it to display gifs on page
function displayGifs(gifData) {
    console.log("gifdata", gifData);

    // Loop through each gif in the gif data and add image of gif to html
    gifData.data.forEach(arg => {
        gifArea.innerHTML += `
            <img class="gif-images" src=${arg.images.fixed_height.url} />
        `
    });

    showMoreButton.classList.remove("hidden");
}

function showMore(e) {
    pageNum++;
    offset = pageNum * LIMIT;

    showMoreButton.classList.add("hidden");

    getGifs(e);

}

