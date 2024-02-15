//Import challenges function from fetchchallenges.js
import { challenges } from "./fetchChallenges.js";

//Declaring global variables containing html elements
const bookingContainer = document.querySelector(".booking-container");

const bookingButtonOne = document.querySelector(".booking-container__button");

const submitBookingButton = document.querySelector(
    ".booking-container__submit-button"
);

//Function that fetches data from api
async function fetchData(url) {
    const response = await fetch(url);
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error(
            `Something went wrong with the request. Error code: ${response.status} ${response.statusText}`
        );
    }
}
//Declaring empty global variables
let cardId;

let dateApi;

let bookingBtn = document.querySelectorAll(".sidescroll__btn");
//for loop that loops through bookingBtn array length
for (let i = 0; i < bookingBtn.length; i++) {
    // eventlistener that reacts to booking button on each card
    bookingBtn[i].addEventListener("click", () => {
        //If statement that returns function if innertext of button is wrong
        if (bookingBtn[i].innerText === "Take challenge online") {
            return;
        }

        /*Declaring variable as date input then setting the 
        starting value of date select to todays date*/
        const dateInput = document.querySelector(
            ".booking-container__dateInput"
        );
        dateInput.valueAsDate = new Date();

        /*Declaring variable to todays date with correct format, 
        then sets new attribute to dateinput with a minimum date of today.*/
        const today = new Date().toISOString().split("T")[0];
        document.getElementsByName("date")[0].setAttribute("min", today);

        //sets value of cardId to clicked .sideScroll__btn parent id
        cardId = bookingBtn[i].parentElement.id;

        //Changes style of element and adds class
        bookingContainer.style.display = "block";
        bookingContainer.classList.add("grow-in");

        //Changes style of element and removes class
        document.querySelector(".body").style.overflow = "hidden";
        document
            .querySelector(".booking-container__step-one")
            .classList.remove("invisible");

        //Getting the right challenge and id
        const challenge = challenges[i];

        booking.challenge = parseInt(cardId);

        // function for creating participants
        getMaxAndMinParticipants(challenge);
        //function for making the titles correct
        makeTitleForBooking(challenge);
    });
}
//Eventlistener function that reacts to click on "search available times" button
bookingButtonOne.addEventListener("click", async () => {
    //Sets variable value to the users input of .booking-container__dateInput
    let dateValue = document.querySelector(
        ".booking-container__dateInput"
    ).value;

    //Adds and removes classes of elements
    document
        .querySelector(".booking-container__step-one")
        .classList.add("invisible");
    document
        .querySelector(".booking-container__step-two")
        .classList.remove("invisible");

    document.querySelector(".second-step").classList.add("fade-in");
    document
        .querySelector(".booking-container__submit-button")
        .classList.add("fade-in");

    /*Adds variables into url and runs function fetchData then 
    puts return value into dateApi variable*/
    dateApi = await fetchData(
        `https://lernia-sjj-assignments.vercel.app/api/booking/available-times?date=${dateValue}&challenge=${cardId}`
    );

    //giving the date key the correct value.
    booking.date = dateValue;

    createAvailableTimes(dateApi);
});

submitBookingButton.addEventListener("click", async () => {
    // getting the values from the different inputs into the object.
    booking.name = nameInput.value;
    booking.email = emailInput.value;
    booking.participants = parseInt(particiSelect.value);
    booking.time = timeInput.value;
    //Function that checks that the email has the right format before submitting
    function validateEmail(email) {
        const atPos = email.indexOf("@");
        const dotPos = email.lastIndexOf(".");
        return atPos > 0 && dotPos > atPos + 1 && dotPos < email.length - 1;
    }
/*If statement that ensures that the name input and email input 
has correct format, else returns*/
    if (
        emailInput.value == "" ||
        !emailInput.value.includes("@") ||
        !emailInput.value.includes(".") ||
        nameInput.value == "" ||
        booking.time == "" ||
        booking.participants == "" ||
        validateEmail(emailInput.value) == false
    ) {
        return;
    }
//Adds and removes classes of elements
    document
        .querySelector(".booking-container__step-two")
        .classList.add("invisible");
    document
        .querySelector(".booking-container__step-three")
        .classList.remove("invisible");
    document
        .querySelector(".booking-container__step-three")
        .classList.add("fade-in");

    const res = await fetch(
        "https://lernia-sjj-assignments.vercel.app/api/booking/reservations",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(booking),
        }
    );
    const dataBooking = await res.json();
});

//function that close down the modal and enable scroll on the website once again.
function escapeBooking() {
    bookingContainer.style.display = "none";
    document.querySelector(".body").style.overflow = "";

    document
        .querySelector(".booking-container__step-one")
        .classList.add("invisible");
    document
        .querySelector(".booking-container__step-two")
        .classList.add("invisible");
    document
        .querySelector(".booking-container__step-three")
        .classList.add("invisible");

    document
        .querySelectorAll(".booking-container__date")
        .forEach((element) => element.remove());

    document.querySelector(".time").innerHTML = "";
    document.querySelector(".participants").innerHTML = "";

    nameInput.value = "";
    emailInput.value = "";

    booking = {};
}

//Making sure you can close the open modal with the esc button
document.body.addEventListener("keydown", (e) => {
    if (e.key == "Escape") {
        escapeBooking();
    }
});

const nameInput = document.querySelector(".booking-container__name-input");
const emailInput = document.querySelector(".booking-container__e-mail-input");
const particiSelect = document.querySelector(".participants");
const timeInput = document.querySelector(".time");

//creating obj for the booking request
let booking = {};

//Creating a function that creates option for the participant selector.
const createParticipants = function (minPar, maxPar) {
    for (let i = minPar; i <= maxPar; i++) {
        const participantOption = document.createElement("option");
        participantOption.classList.add("partOption");
        participantOption.value = i;
        if(i == 1){
            participantOption.innerText = `${i} Participant`;
            particiSelect.appendChild(participantOption);
        }else{
            participantOption.innerText = `${i} Participants`;
            particiSelect.appendChild(participantOption);
        }
        
        
    }
};

function makeTitleForBooking(obj) {
    const titleOfChallenge = obj.title;
    const titleOfBooking = document.querySelector(".booking-container__title");
    const secondTitle = document.querySelector(".title-two");
    secondTitle.innerText = `Book room ${titleOfChallenge} (step 2)`;
    titleOfBooking.innerText = `Book room ${titleOfChallenge} (step 1)`;
}

//Function that first gets max and min numbers then also creats options with every number in that span for the select.
function getMaxAndMinParticipants(obj) {
    const maxParticipants = obj.maxParticipants;
    const minParticipants = obj.minParticipants;

    createParticipants(minParticipants, maxParticipants);
}

//function that creats the available times
function createAvailableTimes(obj) {
    for (let i = 0; i < obj.slots.length; i++) {
        const timeSelect = document.querySelector(".time");
        const timeOption = document.createElement("option");
        timeOption.classList.add("timeOption");
        timeOption.innerText = obj.slots[i];
        timeSelect.appendChild(timeOption);
    }
}

//function to get the button for exiting
function getEscapeBtn() {
    const xBtn = document.querySelectorAll("#x-symbol");
    return xBtn;
}

//function so that you can leave the modal via x-button
function leaveBookingFunction() {
    const xBtn = getEscapeBtn();

    xBtn.forEach((button) => {
        button.addEventListener("click", () => {
            escapeBooking();
        });
    });
}
leaveBookingFunction();
