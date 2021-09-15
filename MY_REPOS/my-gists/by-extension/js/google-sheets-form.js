document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const contactData = new FormData(contactForm);

    const name = contactData.get("name");
    const email = contactData.get("email");
    const message = contactData.get("message");
    const date = new Date();
    const readableDate = date.toLocaleString("en-us", {
      timeZone: "America/New_York",
    });
    const data = {
      name: name,
      email: email,
      message: message,
      created: readableDate,
    };

    await fetch(
      "https://sheet.best/api/sheets/bfabd63f-0ecf-45fc-b0c5-10ca5ef43ece",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    window.location = "https://william-vincent.dev";
  });
});
