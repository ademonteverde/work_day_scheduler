

$(function () {

  
    // TODO: Add code to display the current date in the header of the page.
    let today = dayjs();
    $('#currentDay').text("Today is " + today.format('dddd, MMMM D YYYY'));


  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  
  const saveButtons = document.querySelectorAll(".saveBtn");
  
  saveButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      let div = button.closest(".time-block");
      let textarea = div.querySelector(".description");
      let id = div.id;
      let text = textarea.value;
      localStorage.setItem(id, text);

      // Display a confirmation message when local storage is updated
      showLocalStorageUpdatedMessage(text);
    });
  });

  // Function to display a confirmation message
  function showLocalStorageUpdatedMessage(text) {
    const message = document.getElementById("updateMessage");
    
    // Create a span element for styling the text in red
    const redText = document.createElement("span");
    redText.textContent = "local storage";
    redText.style.color = "red"; // Apply the red color
    
    // Add the redText span to the message element
    message.textContent = `"${text}" saved in `;
    message.appendChild(redText); // Append the redText span
    
    // Automatically hide the message after 3 seconds (adjust as needed)
    setTimeout(function () {
      message.textContent = "";
    }, 3000);
  }
  

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  function setColor() {
    let timeBlocks = document.querySelectorAll(".time-block");

    timeBlocks.forEach(function (timeBlock) {
      let hour = parseInt(timeBlock.id.split("-")[1]);
      let currentHour = parseInt(dayjs().format("H"));

      if (hour < currentHour) {
        timeBlock.classList.add("past");
        timeBlock.classList.remove("present", "future");
      } else if (hour === currentHour) {
        timeBlock.classList.add("present");
        timeBlock.classList.remove("past", "future");
      } else {
        timeBlock.classList.add("future");
        timeBlock.classList.remove("past", "present");
      }
    });
  }
  setColor();

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  let timeBlocks = document.querySelectorAll(".time-block");

  timeBlocks.forEach(function (div) {
    let id = div.id;
    let textarea = div.querySelector(".description");
    let savedText = localStorage.getItem(id);
    if (savedText) {
      textarea.value = savedText;
    }
  });


});
