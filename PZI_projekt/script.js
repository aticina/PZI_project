async function fetchData() { 
    try { 
      const apiUrl = 'https://api.example.com/data'; // URL of the resource 
      const options = { 
        method: 'GET', // HTTP request method 
        headers: { 
          'Content-Type': 'application/json', 
          // You can add more headers as needed 
        }, 
        // Additional options, such as body for POST requests 
      }; 
      const response = await fetch(apiUrl, options); 
      if (!response.ok) { 
        throw new Error('Network response was not ok'); 
      } 
      const data = await response.json(); 
      return data; 
    } catch (error) { 
      console.error('Error:', error); 
    } 
}

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