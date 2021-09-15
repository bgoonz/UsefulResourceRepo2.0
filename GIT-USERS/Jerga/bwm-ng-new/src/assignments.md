# Header Component

1. Create header.component.ts, html
2. in html create <h1> with some text
3. Change color of <h1> to green
4. Display this component on first line of [app.component.html]

# Get rental by id

1. in [rental.service.ts] create function [getRentalById]:
   (method) getRentalById(rentalId: string): Observable<Rental>

   NOTE: Find rental in array of rentals and emit it from observable similiarly as we doing to with getRentals

2. in [rental-detail.component.ts] call [getRentalById] from rental service, provide id from params. Retrieved rental assign to member variable of rental
3. Display rental title and description in template

# Auth Components

1. Create "login", "register" components in "auth" folder
2. In app module create routing to these components
3. Path to login component = "/login"
4. Path to register component = "/register"

# Rental New

1. Create [rental-new] component in rental folder
2. Provide html, scss, image from resources
3. Create route to this component [/rentals/new]

# Get Data from Rental New Form

1. Use template forms to get data from rental new form
2. Provide validation - up to your preference
3. In rental service create function to create rental (just alert data)
4. When clicking submit button call function from rental service
   provide data from form and alert them
