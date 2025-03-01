//calling function to set it into action
fetchData();

async function fetchData(){
  //try and catch for safety
  try{
    const response = await fetch("https://raw.githubusercontent.com/samayo/country-json/refs/heads/master/src/country-by-capital-city.json");
    if(!response.ok){
      throw new Error("Something went wrong, couldn't fetch data!");
    }
    //data is an array of objects [{country:,city:}, ...], json helps with formating
    const data = await response.json();
    console.log(data.length);
    
    //ALL CODE THAT NEEDS DATA HAS TO BE INSIDE OF TRY

    //enable dropdown for location
    const selectLocation = document.getElementById("location");
    selectLocation.addEventListener("click",dropdownLocation);
    function dropdownLocation(){
      for(let countryWeAreOn = 0; countryWeAreOn < data.length ; countryWeAreOn++){
        const selectLocation = document.getElementById("location");
        const optionLocation = document.createElement("option");
        optionLocation.innerHTML = `${data[countryWeAreOn].city} , ${data[countryWeAreOn].country}`.toUpperCase();
        selectLocation.appendChild(optionLocation);
      }
    }
    //filter search bar,reuses some code from form regarding location
    const filterSelectLocation = document.getElementById("filter-location");
    filterSelectLocation.addEventListener("click",dropdownLocationForFilter);
    function dropdownLocationForFilter(){
      for(let countryWeAreOn = 0; countryWeAreOn < data.length ; countryWeAreOn++){
        const selectLocation = document.getElementById("filter-location");
        const optionLocation = document.createElement("option");
        optionLocation.innerHTML = `${data[countryWeAreOn].city} , ${data[countryWeAreOn].country}`.toUpperCase();
        selectLocation.appendChild(optionLocation);
      }
    }

    const filterButton = document.getElementById("filter-button");
    filterButton.addEventListener("click", filterFunction);
    function filterFunction(){
      const filterInput = document.querySelector(".filter-input").value;
      alert(filterInput);
      const allEvents = document.querySelector("#events-container").children;

      for(let i=0; i<allEvents.length; i++){
        //alert(allEvents[i].getAttribute("id"));
        //alert(allEvents[i].querySelector("div.event-location").textContent.toUpperCase());

        if(filterInput == ""){
          //nothing happends if person accidentally clicks filter button withoout selecting anything
        }
        else if(filterInput != allEvents[i].querySelector("div.event-location").textContent.toUpperCase()){
          allEvents[i].classList.add("invisible");
        }
      }

    }

    const removeFilterButton = document.getElementById("remove-filter-button");
    removeFilterButton.addEventListener("click", () => {

      const allEvents = document.querySelector("#events-container").children;

      for(let i=0; i<allEvents.length; i++){

        if(allEvents[i].classList.contains("invisible")){

          allEvents[i].classList.remove("invisible");

        }
      }

    });
    
  
  }
  catch(error){
    console.error(error);
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

//function that gets info from form (EXCEPT DATE) and calls a function that makes a new card and adds it to flexbox
const submitButton = document.getElementById("n");
submitButton.addEventListener("click",getFormInfo);
function getFormInfo(){

  const title = document.getElementById("title").value;
  const imageURL = document.getElementById("image").value;
  const description = document.getElementById("description").value;
  const select = document.querySelector("#location").value;
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;
  newCard(title,imageURL,description,select,startDate,endDate);
  alert(title + imageURL + description + select + startDate + endDate);
  

  /*let's try this but with localStorage, we save data from form on loaclStorage and then in newCard we get info from localStroage
  localStorage.setItem("title", document.getElementById("title").value);
  newCard();*/

}

function newCard(title,imageURL,description,select,startDate,endDate){
  
  //reaching for template element for card
  const eventCardTemplate = document.getElementById("event-template");
  //accessing template's content(it has elements inside itself) and copying it to create an element we want(we want card with img and some text, we defined it in template)
  const eventCard = eventCardTemplate.content.cloneNode(true);
  //setting card id
  //first find last card in collection, its id is what we are after
  const lastCardInCollection = document.querySelector("#events-container").lastElementChild;
  //if there is no children in collection we will get null and in that case id should be 0, otherwise it is id of last child++
  let newID = 0;
  if(lastCardInCollection !== null){
    newID = parseInt(lastCardInCollection.getAttribute("id")) + 1;
  }
  //now that we know id of last card in collection we can make id for new card that will be appened on the end of collection
  eventCard.querySelector(".event").setAttribute("id", newID );


  //accessing and changing image inside of newly created card
  const eventCardImage = eventCard.querySelector("img");
  eventCardImage.setAttribute("src",imageURL);
  //accessing and changing textual data of newly created card
  const eventCardTitle = eventCard.querySelector(".event-title");
  eventCardTitle.textContent = title;
  const eventCardDescription = eventCard.querySelector(".event-description");
  eventCardDescription.textContent = description;
  const eventCardLocation = eventCard.querySelector(".event-location");
  eventCardLocation.textContent = select;
  const eventCardDuration = eventCard.querySelector(".event-duration");
  eventCardDuration.textContent = `${startDate} - ${endDate}`;
  //appending newly created card to flexbox where all other cards are
  document.getElementById("events-container").append(eventCard);

  /*local storgae stuff that does not work yet
  const eventCardTemplate = document.getElementById("event-template");
  const eventCard = eventCardTemplate.content.cloneNode(true);
  alert(localStorage.getItem("title"))
  eventCard.querySelector(".event-title").innerHTML = localStorage.getItem("title");
  document.getElementById("events-container").append(eventCard);*/
}

//Delete card
const deleteButton = document.getElementsByClassName("x-icon");
deleteButton.addEventListener("click", (deleteButton) => {
  //this function is entered when one of x-icons is clicked
  //we need to specify which event it belongs to, let's try to reach its parent
  alert("Im in");
  const deleteThisEvent = deleteButton.parentElement;
  alert(deleteThisEvent.value);
});

//DATE START-followed tutorial https://www.youtube.com/watch?v=lDv8YsTgSAs
const datepicker = document.querySelector(".datepicker");
const dateInput = document.querySelector(".date-input");
dateInput.addEventListener("click", () => { datepicker.hidden = false; });

const cancelButton = document.querySelector(".cancel");
cancelButton.addEventListener("click", () => { datepicker.hidden = true });

const applyButton = document.querySelector(".apply");
applyButton.addEventListener("click", () => { 
  //show date in input window
  dateInput.value = selectedDate.toLocaleDateString({ year:"numeric", month:"2-digit",day:"2-digit" });
  datepicker.hidden = true })

  const dates = document.querySelector(".dates");
  let selectedDate = new Date();
  let year = selectedDate.getFullYear();
  let month = selectedDate.getMonth();

  function handleDateClick(e){
    const button = e.target;
    //remove selected state from previously selected
    const selected = dates.querySelector(".selected");
    selected && selected.classList.remove("selected");
    //add selected class to selected date/buton
    button.classList.add("selected");
    selectedDate = new Date(year,month,parseInt(button.textContent));
  }

  
  //month selector and year toggle when using prev and next buttons
  const yearInput = document.querySelector(".year-input");
  const monthInput = document.querySelector(".month-input");

  function updateYearAndMonth(){
    monthInput.selectedIndex = month;
    yearInput.value = year;
  }

  //makes all dates that need to be visible, visible and in right order
  function displayDates(){
    updateYearAndMonth(); 
    //clear content
    dates.innerHTML="";
    //for last week of prev month
    const lastDateOfPrevMonth = new Date(year,month,0);
    for(let i = 0; i <= lastDateOfPrevMonth.getDay(); i++){
      const text = lastDateOfPrevMonth.getDate() - lastDateOfPrevMonth.getDay() + i;
      const button = createButton(text,true,false);
      dates.appendChild(button);
    }

    //for current month(whole), it "knows" when to use 30 or 31
    const lastDateOfMonth = new Date(year,month+1,0);
    for(let i = 1; i <= lastDateOfMonth.getDate(); i++){

      //marking today's date visually
      const isToday = selectedDate.getDate() === i && selectedDate.getFullYear() === year && selectedDate.getMonth() === month;

      const button = createButton(i,false,isToday);
      
      button.addEventListener("click",handleDateClick);

      dates.appendChild(button);
    }

    //for fisrt week of next month
    const firstDateOfNextMonth = new Date(year,month+1,1);
    for(let i = firstDateOfNextMonth.getDay(); i < 7; i++){
      const text = firstDateOfNextMonth.getDate() - firstDateOfNextMonth.getDay() + i;
      const button = createButton(text,true,false);
      dates.appendChild(button);
    }
  }

  function createButton(text,isDisabled = false ,isToday = false ){
    const button = document.createElement("button");
    button.textContent = text;
    button.disabled = isDisabled;
    button.classList.toggle("today",isToday);
    return button;
  }

  displayDates();

  //previous and next functionality
  const prevButton = datepicker.querySelector(".prev");
  const nextButton = datepicker.querySelector(".next");

  nextButton.addEventListener("click", () => {
    if(month === 11){
      year++;
    }
    month = (month + 1) % 12;
    displayDates();
  })

  prevButton.addEventListener("click", () => {
    if(month === 0){
      year--;
    }
    month = (month - 1 + 12) % 12;
    displayDates();
  })

  //changing month changes looks of entire calendar
  monthInput.addEventListener("change", () => {
    month = monthInput.selectedIndex;
    displayDates();
  })

  //changing year changes entier calendar displayed, like it should to make sense
  yearInput.addEventListener("change", () => {
    year = yearInput.value;
    displayDates();
  })

  //Filter function