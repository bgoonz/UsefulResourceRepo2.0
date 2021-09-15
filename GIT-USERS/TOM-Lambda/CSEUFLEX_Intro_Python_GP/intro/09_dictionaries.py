"""
Dictionaries are Python's implementation of associative arrays.
There's not much different with Python's version compared to what
you'll find in other languages (though you can also initialize and
populate dictionaries using comprehensions just like you can with 
lists!). 

The docs can be found here:
https://docs.python.org/3/tutorial/datastructures.html#dictionaries

For this exercise, you have a list of dictinaries. Each dictionary
has the following keys:
 - lat: a signed integer representing a latitude value
 - lon: a signed integer representing a longitude value
 - name: a name string for this location
"""

waypoints = [
<<<<<<< HEAD
    {
        "lat": 43,
        "lon": -121,
        "name": "a place"
    }, 
    {
        "lat": 41,
        "lon": -123,
        "name": "another place"
    }, 
    {
        "lat": 43,
        "lon": -122,
        "name": "a third place"
    }
=======
    {"lat": 43, "lon": -121, "name": "a place"},
    {"lat": 41, "lon": -123, "name": "another place"},
    {"lat": 43, "lon": -122, "name": "a third place"},
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
]

# Add a new waypoint to the list
waypoints.append({"lat": 44, "lon": -123, "name": "added"})

# Modify the dictionary with name "a place" such that its longitude
# value is -130 and change its name to "not a real place"
<<<<<<< HEAD
waypoints[0]['lon'] = -130
waypoints[0]['name'] = 'not a real place'

# Write a loop that prints out all the field values for all the waypoints
for w in waypoints:
    print(w['name'], w['lat'], w['lon'])
=======
waypoints[0]["lon"] = -130
waypoints[0]["name"] = "not a real place"

# Write a loop that prints out all the field values for all the waypoints
for w in waypoints:
    print(w["name"], w["lat"], w["lon"])
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
