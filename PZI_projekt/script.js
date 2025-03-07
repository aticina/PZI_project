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
      
      //at max we have data.length options, this is to remove issue of options multipling each time we click the bar
      if(document.getElementById("location").children.length < data.length){
        for(let countryWeAreOn = 0; countryWeAreOn < data.length ; countryWeAreOn++){
        const selectLocation = document.getElementById("location");
        const optionLocation = document.createElement("option");

        //if there is no city, show country only, FORMAT: "city, country"
        if (data[countryWeAreOn].city == null){
          optionLocation.innerHTML = `${data[countryWeAreOn].country}`.toUpperCase();
        }
        else {
          optionLocation.innerHTML = `${data[countryWeAreOn].city}, ${data[countryWeAreOn].country}`.toUpperCase();
        }
        
        selectLocation.appendChild(optionLocation);
        }
      }
      
    }
    //filter search bar,reuses some code from form regarding location
    const filterSelectLocation = document.getElementById("filter-location");
    filterSelectLocation.addEventListener("click",dropdownLocationForFilter);
    function dropdownLocationForFilter(){
      if(document.getElementById("filter-location").children.length < data.length){
        for(let countryWeAreOn = 0; countryWeAreOn < data.length ; countryWeAreOn++){
        const selectLocation = document.getElementById("filter-location");
        const optionLocation = document.createElement("option");
        
        //if there is no city, show country only, FORMAT: "city, country"
        if (data[countryWeAreOn].city == null){
          optionLocation.innerHTML = `${data[countryWeAreOn].country}`.toUpperCase();
        }
        else {
          optionLocation.innerHTML = `${data[countryWeAreOn].city}, ${data[countryWeAreOn].country}`.toUpperCase();
        }

        selectLocation.appendChild(optionLocation);
        }
      }
      
      
    }

    const filterButton = document.getElementById("filter-button");
    filterButton.addEventListener("click", filterFunction);
    function filterFunction(){
      const filterInput = document.querySelector(".filter-input").value;
      const allEvents = document.querySelector("#events-container").children;

      for(let i=0; i<allEvents.length; i++){

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

function onLoadFunction(){

  //load in cards from localStorage
  
  //we get information about how many cards are inside of storage that we need to put on page as soon as it loads

  for(let i=0; i<Object.keys(localStorage).length; i++){

    const arrayOfKeys = Object.keys(localStorage);

    //let's get events/objects one by one as we loop, 1)get object 2)turn it from string into object
    const eventFromLocalStorage = JSON.parse(localStorage.getItem(arrayOfKeys[i]));
    
    const eventCardTemplate = document.getElementById("event-template");
    const eventCard = eventCardTemplate.content.cloneNode(true);

    eventCard.querySelector(".event").setAttribute("id", arrayOfKeys[i] );

    const eventCardImage = eventCard.querySelector("img");
    eventCardImage.setAttribute("src", eventFromLocalStorage.storeImageURL);
    
    const eventCardTitle = eventCard.querySelector(".event-title");
    eventCardTitle.textContent = eventFromLocalStorage.storeTitle;

    const eventCardDescription = eventCard.querySelector(".event-description");
    eventCardDescription.textContent = eventFromLocalStorage.storeDescription;

    const eventCardLocation = eventCard.querySelector(".event-location");
    eventCardLocation.textContent = eventFromLocalStorage.storeLocation;

    const eventCardDuration = eventCard.querySelector(".event-duration");
    eventCardDuration.textContent = `${eventFromLocalStorage.storeStartDate} - ${eventFromLocalStorage.storeEndDate}`;

    document.getElementById("events-container").append(eventCard);
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

//function that gets info from form and calls a function that makes a new card and adds it to flexbox
const submitButton = document.getElementById("submit");
submitButton.addEventListener("click",getFormInfo);
function getFormInfo(){

  const title = document.getElementById("title").value;
  const imageURL = document.getElementById("image").value;
  const description = document.getElementById("description").value;
  const select = document.querySelector("#location").value;
  const startDate = document.getElementById("start-date-input").value;
  const endDate = document.getElementById("end-date-input").value;
  newCard(title,imageURL,description,select,startDate,endDate);
  //alert(title + imageURL + description + select + startDate + endDate);

}

function newCard(title,imageURL,description,select,startDate,endDate){
  
  //reaching for template element for card
  const eventCardTemplate = document.getElementById("event-template");
  //accessing template's content(it has elements inside itself) and copying it to create an element we want(we want card with img and some text, we defined it in template)
  const eventCard = eventCardTemplate.content.cloneNode(true);

  const lastCardInCollection = document.querySelector("#events-container").lastElementChild;

  //if there is no children in collection we will get null and in that case id should be 0, otherwise it is id of last child++
  /*some retired code
  let newID = 0;
  if (localStorage.getItem("0") === null){
    newID = 0;
  }
  else if(lastCardInCollection !== null && localStorage.getItem(newID) === null){
    newID = parseInt(lastCardInCollection.getAttribute("id")) + 1;
  }
  else{
    while(localStorage.getItem(newID) !== null){
      newID = newID +1;
    }
  }*/
  
  let newID = 0; //if there are no kids ID is 0
  if (lastCardInCollection === null){
    newID = 0;
  }
  else{//if there are kids, check for each id if its free, if not, increase id++ and check again and so on till you find free id to use on new card
    while(localStorage.getItem(newID) !== null){
      newID = newID + 1;
    }
  }
  
  //setting id for card
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
  eventCardDuration.textContent = `${startDate} ~ ${endDate}`;
  //appending newly created card to flexbox where all other cards are
  document.getElementById("events-container").append(eventCard);

  //saving card as an id:object pair in localStorage
  localStorage.setItem(newID, JSON.stringify({ storeTitle: title, storeImageURL: imageURL, storeDescription: description, storeLocation: select, storeStartDate: startDate, storeEndDate: endDate }));
  /*local storgae stuff that does not work yet
  const eventCardTemplate = document.getElementById("event-template");
  const eventCard = eventCardTemplate.content.cloneNode(true);
  alert(localStorage.getItem("title"))
  eventCard.querySelector(".event-title").innerHTML = localStorage.getItem("title");
  document.getElementById("events-container").append(eventCard);*/
}

//Delete card from both the screen and localStorage
const eventContainer = document.getElementById("events-container");
eventContainer.addEventListener("click", function(e) {
  if(e.target.tagName === "I"){
    e.target.parentElement.remove();
    const keyOfEntryToRemoveFromLocalStorage = e.target.parentElement.getAttribute("id");
    localStorage.removeItem(keyOfEntryToRemoveFromLocalStorage);
  }
  
}, false);


//DATEPICKER source/help: colleague
//ThisYear varies based on current Date, but it is always current, example today it is 2025
const ThisYear = new Date().getFullYear();
//-II- bbut for month, index 2 aka March
const ThisMonth = new Date().getMonth();
//-II- for date, 7
const ThisDay = new Date().getDate();

//setting default state of calendar in terms of selected date, initially we only set year and month
let SelectedStartYear = ThisYear; 
let SelectedStartMonth = ThisMonth;
let SelectedEndYear = ThisYear; 
let SelectedEndMonth = ThisMonth;
let SelectedStartDate = null;
let SelectedEndDate = null;

//here we are getting access to some html elements we need
//for that SMALL FIELD WITH YEAR, BOTH FOR START AND END DATE above calendar page, shows current year, can be changed
const YearSelect = document.getElementsByClassName("YearSelect");
//SMALL FIELD WITH YEAR, ONLY START DATE
const StartYear = document.getElementById("StartYearSelect");
//SMALL FIELD WITH MONTH, ONLY START DATE
const StartMonth = document.getElementById("StartMonthSelect");
//SMALL FIELD WITH YEAR, ONLY END DATE
const EndYear = document.getElementById("EndYearSelect");
//SMALL FIELD WITH MONTH, ONLY END DATE
const EndMonth = document.getElementById("EndMonthSelect");


//.prototype gives new method to date object, method name addDays, it is defined here too
//GOAL?
Date.prototype.addDays = function(days) {
    let date = new Date(this.valueOf());
    //.setDate sets date(as name says), .getDate gets date of month from date variable and then we increase it by number in days argument
    date.setDate(date.getDate() + days);
    return date;
}

//this code here dictates how calendar changes according to user changing month or year or both from current to past or future time, it changes one variable and propagates change through CreateMonthDateTable
//when user changes SMALL FIELD WITH YEAR it triggers the function that redoes the calendar to change according to new year
StartYear.addEventListener("change", () => {
    SelectedStartYear = StartYear.value; //SelectedStartYear is current year 2025, but user can change it via this event
    CreateMonthDateTable(SelectedStartYear, SelectedStartMonth, "EventStartDateBody", true);
  });

StartMonth.addEventListener("change", () => {
    SelectedStartMonth = StartMonth.value;
    CreateMonthDateTable(SelectedStartYear, SelectedStartMonth, "EventStartDateBody", true);
  });

//.target returns element on which event happened, which is not really needed since we already accessed those elements with .getElementById
EndYear.addEventListener("change", (e) => {
    SelectedEndYear = e.target.value;
    CreateMonthDateTable(SelectedEndYear, SelectedEndMonth, "EventEndDateBody", false);
  });

EndMonth.addEventListener("change", (e) => {
    SelectedEndMonth = e.target.value;
    CreateMonthDateTable(SelectedEndYear, SelectedEndMonth, "EventEndDateBody", false);
  });

//generates years for SMALL FIELD WITH YEAR
function GenerateYears() {
    let i = 0;
    let Years = "";
    while (i < 10){
      //this generates current + 9 future years
        Years += "<option value='" + String(ThisYear + i) + "'>" + String(ThisYear + i) + "</option>\n";

        i++;
    }
    StartYear.innerHTML = Years;
    EndYear.innerHTML = Years;
}

//"main" functionality, creates calendar page/view based on arguments passed to it
function CreateMonthDateTable(Year, Month, Id, Start) {
    let MonthDateTable = "\n<tr>\n";
    //SelectedDate depends on arguments we give to the function
    let SelectedDate = new Date(Year, Month);

    let WeekDayNumber = 1; //Monday
    while(SelectedDate.getMonth() == Month) { //while date is in choosen month we loop aka keep making date fields


        while(SelectedDate.getDay() != WeekDayNumber) {
          //we are putting - for days from previous month, and changing day of a week mon-sun
            MonthDateTable += "<td>-</td>\n";

            WeekDayNumber += 1;

            if (WeekDayNumber > 6) {
                WeekDayNumber = 0;
            }

        }
        if(Start) {//if we are working with start-date
            if((SelectedDate.getDate() == ThisDay) && (SelectedDate.getMonth() == ThisMonth) && (SelectedDate.getFullYear() == ThisYear)) {
                MonthDateTable += "<td class='startdays today' id='s" + SelectedDate.getDate() + "' onclick='SetStartDate(" + SelectedDate.getDate() + ")'>" + SelectedDate.getDate() + "</td>\n";
            }
            else {
                MonthDateTable += "<td class='startdays' id='s" + SelectedDate.getDate() + "' onclick='SetStartDate(" + SelectedDate.getDate() + ")'>" + SelectedDate.getDate() + "</td>\n";
            }
        }
        else {//if we are working with end-date, today or not makes the differnece
            if((SelectedDate.getDate() == ThisDay) && (SelectedDate.getMonth() == ThisMonth) && (SelectedDate.getFullYear() == ThisYear)) {
                MonthDateTable += "<td class='enddays today' id='e" + SelectedDate.getDate() + "' onclick='SetEndDate(" + SelectedDate.getDate() + ")'>" + SelectedDate.getDate() + "</td>\n";
            }
            else {
                MonthDateTable += "<td class='enddays' id='e" + SelectedDate.getDate() + "' onclick='SetEndDate(" + SelectedDate.getDate() + ")'>" + SelectedDate.getDate() + "</td>\n";
            }
        }
        SelectedDate = SelectedDate.addDays(1);
        WeekDayNumber += 1;
        if (WeekDayNumber > 6) {
            WeekDayNumber = 0;
        }

        if (WeekDayNumber == 1) {
            MonthDateTable += "</tr>\n<tr>";
        }
    }

    MonthDateTable += "</tr>";

    //Id differentiates between start and end date section
    document.getElementById(Id).innerHTML = MonthDateTable;
}

//FROM HERE
function SetStartDate(SelectedDate) {
    
    if(SelectedDate != "-") {
        if(SelectedEndDate != null && SelectedEndDate < new Date(SelectedStartYear, SelectedStartMonth, SelectedDate)) {
            alert("Greška. Datum završetka je prije datuma početka.");
        }
        else {
            SelectedStartDate = new Date(SelectedStartYear, SelectedStartMonth, SelectedDate);
            Array.from(document.getElementsByClassName("startdays")).forEach(function(day) {
                day.classList.remove('selected');
            });
            document.getElementById("s" + SelectedDate).classList.add('selected');
            
        }
        
    }
    document.getElementById("start-date-input").value = SelectedStartDate.toLocaleDateString({year:"number", month:"2-digit", date:"2-digit"});
}

function SetEndDate(SelectedDate) {
    if(SelectedDate != "-") {
        if(SelectedStartDate != null && new Date(SelectedEndYear, SelectedEndMonth, SelectedDate) < SelectedStartDate) {
            alert("Greška. Datum završetka je prije datuma početka.");
        }
        else {
            SelectedEndDate = new Date(SelectedEndYear, SelectedEndMonth, SelectedDate);
            Array.from(document.getElementsByClassName("enddays")).forEach(function(day) {
                day.classList.remove('selected');
            });
            document.getElementById("e" + SelectedDate).classList.add('selected'); 
            
        }

    }
    document.getElementById("end-date-input").value = SelectedEndDate.toLocaleDateString({year:"number", month:"2-digit", date:"2-digit"});
    console.log(SelectedEndDate.toLocaleDateString({year:"number", month:"2-digit", date:"2-digit"}));
}


//init
function SetInitialValues() {
    document.getElementById("StartMonthSelect").value = ThisMonth;
    document.getElementById("StartYearSelect").value = ThisYear;
    document.getElementById("EndMonthSelect").value = ThisMonth;
    document.getElementById("EndYearSelect").value = ThisYear;
    SelectedStartDate = null;
    SelectedEndDate = null;
    Array.from(document.getElementsByClassName("startdays")).forEach(function(day) {
        day.classList.remove('selected');
    });
    Array.from(document.getElementsByClassName("enddays")).forEach(function(day) {
        day.classList.remove('selected');
    });
}

//main
GenerateYears();
CreateMonthDateTable(SelectedStartYear, SelectedStartMonth, "EventStartDateBody", true);
CreateMonthDateTable(SelectedStartYear, SelectedStartMonth, "EventEndDateBody", false);
SetInitialValues();

/*
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
*/
/*
//START DATE
const startDatepicker = document.querySelector(".start-datepicker"); //div that contains bulk of datepicker, initially hidden, so everything except label and input field are in this
const startDateInputElement = document.querySelector(".start-date-input");//gets input element aka square we write in
startDateInputElement.addEventListener("click", () => { startDatepicker.hidden = false; });//when user clicks input field, div.start-datepicker gets unhidden
//element.hidden = false/true, this sets value of hidden attribute, if it's true then element is hidden, if its false then its unhidden
//MAYBE make it so when start is unhidden, end goes into hidding and other way around too?


const startCancelButton = document.querySelector(".start-cancel");
startCancelButton.addEventListener("click", () => { startDatepicker.hidden = true }); //closes startDatepicker aka hides it 


let startSelectedDate = new Date(); //this is current date aka today by definition of new Date(), but it will likely change to be whatever users sets it as cause
// it is the date apply gets from input field
let startYear = startSelectedDate.getFullYear();
let startMonth = startSelectedDate.getMonth();


const startApplyButton = document.querySelector(".start-apply");
startApplyButton.addEventListener("click", () => { 
  
  startDateInputElement.value = startSelectedDate.toLocaleDateString({ year:"numeric", month:"2-digit",day:"2-digit" });
  console.log(startDateInputElement.value);//I think value is string cause input type=text
  //startDatepicker.hidden = false;
 }); //IT PUTS DATE IN INPUT FIELD IN STRING FORM, it defaults at current date cause startSelectedDate=new date()
  //it takes value from imput field via startDateInputElement.value and turns it into string form & closes/hides satrtdatepicker same way close button does
  //first value it reads is an empty string cause nothing was in the field


//we need this funtion for startDisplayDates
//month selector and year toggle when using prev and next buttons
const startYearInput = document.querySelector(".start-year-input"); //gets eleemnt that should show current year
const startMonthInput = document.querySelector(".start-month-input"); //gets element that should show current month


const startDates = document.querySelector(".start-dates");//gets div with nothing inside, after ??? gets button elements inside, each one is one date in calendar
//fills dic.start-dates, makes date fields, each is a button
function startDisplayDates(){

  startUpdateYearAndMonth();//it returns nothing, just sets up that current month and year fields that are above date buttons
  //prob does not need to be in here, just needs to be called right before to we can correctlly display current calendar page

  startDates.innerHTML=""; //we are accessing div.start-dates innerHTML, initially it is empty

  //for last week of prev month
  const startLastDateOfPrevMonth = new Date(startYear,startMonth,0); //year and month are gotten from current datt from startSelcedtedDate variable,
  // THIS IS SPECIFIC CRAFTED DATE, NOT CURRENT ONE, we need it to make that first line in caledar that is actually
  //last days of previous month, they are muted/dull compared to toher dates
  for(let i = 0; i <= startLastDateOfPrevMonth.getDay(); i++){
    const startText = startLastDateOfPrevMonth.getDate() - startLastDateOfPrevMonth.getDay() + i;//calculating what number to put in a button/date field
    const startButton = startCreateButton(startText,true,false); //CALLS ANOTHER FUNCTION TO MAKE BUTTON/DATE
    //so we are sending a number, TRUE to make all these buttons.DISABLED(for that geryish/dull,unusable quality and looks),FALSE cause not one of these will be CURRENT/TODAY DATE
    startDates.appendChild(startButton); //when we get made date/button it gets appended to div.start-dates container
  }

  //for current month(whole), it "knows" when to use 30 or 31
  const startLastDateOfMonth = new Date(startYear,startMonth+1,0); //once again, speficic crafted date using current year and month from startSelectedDate
  for(let i = 1; i <= startLastDateOfMonth.getDate(); i++){

    const startIsToday = startSelectedDate.getDate() === i && startSelectedDate.getFullYear() === year && startSelectedDate.getMonth() === month;
    //calculates current date using startDelectedDate=new Date() which gives current date, with this and i it will mark one of dates as today 
    //to mark it is will set startIsToday = TRUE, otherwise it is FALSE, this goes to CREATEBUTTON function that needs this info
    const startButton = startCreateButton(i,false,startIsToday); //2nd argument is FALSE so not one button will be disabled, all will be ABLED
    //creates button that we will append to all other dates/buttons, but first!
    //each button gets their own eventlistener to react when they are clicked on
    startButton.addEventListener("click",startHandleDateClick); //this does not actiavte them right away

    startDates.appendChild(startButton);
  }

  //for fisrt week of next month
  const startFirstDateOfNextMonth = new Date(year,month+1,1);
  for(let i = startFirstDateOfNextMonth.getDay(); i < 7; i++){
    const startText = startFirstDateOfNextMonth.getDate() - startFirstDateOfNextMonth.getDay() + i;
    const startButton = startCreateButton(startText,true,false);
    //we want thes button disabeled too so we are sending TRUE as 2nd arg, FALSE for 3rd cause none of these will be today/current
    startDates.appendChild(startButton);
  }
}

//NEEDED FOR STARTDISPLAYDATES() cause it makes every button able to get clicked on
function startHandleDateClick(e){
  const startButton = e.target; //targets one of buttons, one that's clicked
  //remove selected state from previously selected
  const startSelectedButton = startDates.querySelector(".start-selected"); //startSelectedButton is the button that's marked as selected
  startSelectedButton && startSelectedButton.classList.remove("start-selected"); //it's no longer selected
  //add selected class to selected date/buton
  startButton.classList.add("start-selected"); //new one we clicked becomes selected
  startSelectedDate = new Date(startYear,startMonth,parseInt(startButton.textContent));//once clicked we change this current date into something else
}

startDisplayDates(); //call it so it works

//FUNTION THAT CREATES DATES/BUTTONS, needed for startDisplayDates()
function startCreateButton(startText,startIsDisabled = false ,startIsToday = false ){
  //receives NUMBER to put on a button/date, receives bool values or takes default ones for startIsDisabled that gives bool value to determine if button should be disabled
  //startIsToday is also bool
  const startButton = document.createElement("BUTTON");
  startButton.setAttribute("type","button"); //this should be defualt for all buttons so I'll add it cause so is advised
  startButton.textContent = startText; //sets NUMBER on BUTTON
  startButton.disabled = startIsDisabled; //if true button will be disabled aka will get duller,greyish finish and we won't be able to click it, it is a button, but NOT USABLE
  //by default of this function buttons are NOT DISABLED
  startButton.classList.toggle("start-today",startIsToday); //by default we DON'T MARK BUTTON AS TODAY'S DATE, "start-today is class hta make sbutton black"
  //mysterious 2nd argument for toggle is force, if TRUE it will only add new class, if FALSE it will only remove it
  return startButton;//returns button that will be added to div.start-dates container
}

function startUpdateYearAndMonth(){ //this function sets current month and year correctlly based on two variables-startMonth and startYear
  //both variables are let and defined above this function, they use startSelectedDate = new Date() aka current date as means of getting their info
  startMonthInput.selectedIndex = startMonth;
  startYearInput.value = startYear;
}





//field to change months
startMonthInput.addEventListener("change", () => { //listens to an element
  startMonth = startMonthInput.selectedIndex; //changes month from current to what user selects
  startDisplayDates(); //triggers displaydates cause they need refreshing
});

//field to change year
startYearInput.addEventListener("change", () => {
  startYear = startYearInput.value;
  startDisplayDates();
});


//previous and next functionality
const startPrevButton = startDatepicker.querySelector(".start-prev");
const startNextButton = startDatepicker.querySelector(".start-next");

startNextButton.addEventListener("click", () => {
  if(startMonth === 11){
    startYear++;
  }
  startMonth = (startMonth + 1) % 12;
  startDisplayDates();
});

startPrevButton.addEventListener("click", () => {
  if(startMonth === 0){
    startYear--;
  }
  startMonth = (startMonth - 1 + 12) % 12;
  startDisplayDates();
});

  
//END DATE
const endDatepicker = document.querySelector(".end-datepicker");
const endDateInput = document.querySelector(".end-date-input");
endDateInput.addEventListener("click", () => { endDatepicker.hidden = false; });

const endCancelButton = document.querySelector(".end-cancel");
endCancelButton.addEventListener("click", () => { endDatepicker.hidden = true });

const endApplyButton = document.querySelector(".end-apply");
endApplyButton.addEventListener("click", () => { 
  //show date in input window
  endDateInput.value = endSelectedDate.toLocaleDateString({ year:"numeric", month:"2-digit",day:"2-digit" });
  endDatepicker.hidden = true })

  const endDates = document.querySelector(".end-dates");
  let endSelectedDate = new Date();
  let endYear = endSelectedDate.getFullYear();
  let endMonth = endSelectedDate.getMonth();

  function handleDateClick(e){
    const endButton = e.target;
    //remove selected state from previously selected
    const endSelected = endDates.querySelector(".end-selected");
    endSelected && endSelected.classList.remove("end-selected");
    //add selected class to selected date/buton
    endButton.classList.add("end-selected");
    endSelectedDate = new Date(endYear,endMonth,parseInt(endButton.textContent));
  }

  
  //month selector and year toggle when using prev and next buttons
  const endYearInput = document.querySelector(".end-year-input");
  const endMonthInput = document.querySelector(".end-month-input");

  function updateYearAndMonth(){
    endMonthInput.selectedIndex = endMonth;
    endYearInput.value = endYear;
  }

  //makes all dates that need to be visible, visible and in right order
  function displayDates(){
    updateYearAndMonth(); 
    //clear content
    endDates.innerHTML="";
    //for last week of prev month
    const endLastDateOfPrevMonth = new Date(endYear,month,0);
    for(let i = 0; i <= endLastDateOfPrevMonth.getDay(); i++){
      const endText = endLastDateOfPrevMonth.getDate() - endLastDateOfPrevMonth.getDay() + i;
      const endButton = createButton(endText,true,false);
      endDates.appendChild(endButton);
    }

    //for current month(whole), it "knows" when to use 30 or 31
    const endLastDateOfMonth = new Date(endYear,endMonth+1,0);
    for(let i = 1; i <= endLastDateOfMonth.getDate(); i++){

      //marking today's date visually
      const endIsToday = endSelectedDate.getDate() === i && endSelectedDate.getFullYear() === endYear && endSelectedDate.getMonth() === endMonth;

      const endButton = createButton(i,false,endIsToday);
      
      endButton.addEventListener("click",handleDateClick);

      endDates.appendChild(endButton);
    }

    //for fisrt week of next month
    const endFirstDateOfNextMonth = new Date(endYear,endMonth+1,1);
    for(let i = endFirstDateOfNextMonth.getDay(); i < 7; i++){
      const endText = endFirstDateOfNextMonth.getDate() - endFirstDateOfNextMonth.getDay() + i;
      const endButton = createButton(endText,true,false);
      endDates.appendChild(endButton);
    }
  }

  function createButton(text,isDisabled = false ,isToday = false ){
    const endButton = document.createElement("button");
    endButton.textContent = text;
    endButton.disabled = isDisabled;
    endButton.classList.toggle("end-today",isToday);
    return endButton;
  }

  displayDates();

  //previous and next functionality
  const endPrevButton = endDatepicker.querySelector(".end-prev");
  const endNextButton = endDatepicker.querySelector(".end-next");

  endNextButton.addEventListener("click", () => {
    if(endMonth === 11){
      endYear++;
    }
    endMonth = (endMonth + 1) % 12;
    displayDates();
  })

  endPrevButton.addEventListener("click", () => {
    if(endMonth === 0){
      endYear--;
    }
    endMonth = (endMonth - 1 + 12) % 12;
    displayDates();
  })

  //changing month changes looks of entire calendar
  endMonthInput.addEventListener("change", () => {
    endMonth = endMonthInput.selectedIndex;
    displayDates();
  })

  //changing year changes entier calendar displayed, like it should to make sense
  endYearInput.addEventListener("change", () => {
    endYear = endYearInput.value;
    displayDates();
  })*/