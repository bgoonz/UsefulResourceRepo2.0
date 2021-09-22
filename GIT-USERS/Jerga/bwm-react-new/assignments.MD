

## RentalHome
1. Create [RentalHome] class component in 'src/pages' folder
2. Provide styling and JSX from resources
3. For Stylings create separate file in styles folder
4. Render [RentalHome] component in [App.js] under [Header]

## RentalNew
1. Create [RentalNew] class component in 'src/pages' folder
2. Provide JSX from resources
3. Create route to [RentalNew] component with path `/rentals/new`
4. Create link to [RentalNew] in manage dropdown in header
5. allow only authenticated users to access this page

## Manage Actions
1. Fetch user bookings and received bookings
2. Create actions to make a GET request to `/bookings/me` and `/bookings/received`
3. Dispatch actions similiarly as in manage rentals
4. Retreive bookings through the props and provide them to BookingListing
5. Optionaly iterate over them and display booking data