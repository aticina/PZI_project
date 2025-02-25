
async function fetchData(){
  //try and catch for safety
  try{
    const response = await fetch("https://raw.githubusercontent.com/samayo/country-json/refs/heads/master/src/country-by-capital-city.json");
    if(!response.ok){
      throw new Error("Something went wrong, couldn't fetch data!");
    }
    //data is an array of objects [{country:,city:}, ...], json helps with formating
    const data = await response.json();
    console.log(data);
  }
  catch(error){
    console.error(error);
  }
}
//calling function to set it into action
fetchData();

//when button AddNewEvent is clicked, this function hides the button and reveals the form for inputing event information
function showFormForNewEvent(){
    const addEventButton = document.getElementById("add-event-button");
    const formForNewEvent = document.getElementById("add-event-form-wrapper");
    if (formForNewEvent.classList.contains("invisible")){
        formForNewEvent.classList.remove("invisible");
        addEventButton.classList.add("invisible");
    }
     
}

//when user clicks submit it reverses effect of clicking on AddNewEvent button, toggles classes DOESN'T COLLECT OR WORK WITH DATA, PURELY AESTHETIC IN FUNCTION
function hideFormForNewEvent(){
    const addEventButton = document.getElementById("add-event-button");
    const formForNewEvent = document.getElementById("add-event-form-wrapper");
    if (!(formForNewEvent.classList.contains("invisible"))){
        formForNewEvent.classList.add("invisible");
        addEventButton.classList.remove("invisible");
    }
    
}

//const eventCard = document.createElement("p");
//eventCard.innerHTML = "IAMHEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE";
//const eventsContainer = document.getElementById("events-container");
//eventsContainer.appendChild(eventCard);

function novo(){
    //reaching for template element for card
    const eventCardTemplate = document.getElementById("event-template");
    //accessing template's content(it has elements inside itself) and copying it to create an element we want(we want card with img and some text, we defined it in template)
    const eventCard = eventCardTemplate.content.cloneNode(true);
    //accessing and changing image inside of newly created card
    const eventCardImage = eventCard.querySelector("img");
    eventCardImage.setAttribute("src","images/the-dream.jpg");
    //accessing and changing textual data of newly created card
    const eventCardTitle = eventCard.querySelector(".event-title");
    eventCardTitle.textContent = "TITLE";
    //appending newly created card to flexbox where all other cards are
    document.getElementById("events-container").append(eventCard);
}