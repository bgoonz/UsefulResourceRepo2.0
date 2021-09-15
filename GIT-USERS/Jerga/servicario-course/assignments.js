
// ServiceItem
1. Create ServiceItem functional component in "components/service/ServiceItem.js"
2. Provide to it JSX from renderServices
3. Receive props of "service"


// Get service by id
1. Create action to get service by ID 
// You can get single document from db by calling: db.collection('services').doc(id).get().then(....)
2. Finish Reducer
3. Dispatch action in useEffect of ServiceDetail page
4. Get data from state with connect
5. Display service informations instead of hardcoded ones

// Display login data
1. On submit of login form console.log email and password
2. Optional: create validation