window.addEventListener("DOMContentLoaded", (event) => {
  const licenseForm = document.getElementById("drivers-license-form");
  const licenseCardFields = document.querySelectorAll(".license__info");
  const submitButton = document.querySelector(".form__submit");

  // ** Phase 1B: Update license with event delegation and event.target ** 
  licenseForm.addEventListener("input", (event) => {
    // iterate over the license card fields and
    // match their ids to event.target.id
    licenseCardFields.forEach((field) => {
      if (field.id.includes(event.target.id)) {
        field.innerHTML = event.target.value;
      };
    });
  });

  // ** Phase 2: Add focus and blur events to form inputs **
  licenseForm.addEventListener("focus", (event) => {
    event.target.style.backgroundColor = "lightgreen";
  }, true);
  // change back to initial state on blur
  licenseForm.addEventListener("blur", (event) => {
    event.target.style.backgroundColor = "";
  }, true);

  // ** Phase 3: Check that license numbers match **
  licenseForm.addEventListener("submit", (event) => {
    // get the values of the license number field and confirm field
    const licenseNumber = document.getElementById('license-num').value;
    const licenseNumberConfirm = document.getElementById('license-num-confirm').value;
    // if the values are not equal, alert the user
    // otherwise, submit the form
    if (licenseNumber !== licenseNumberConfirm) {
      // prevent the default submission behavior
      event.preventDefault();
      alert("License numbers must match!");
    } else {
      alert("The form was submitted!");
     updateClickCount();
    };
  });

   // ** Phase 4: Update submit button click count **
  submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    submitButton.innerHTML = `${event.detail}`;
  });
 
});