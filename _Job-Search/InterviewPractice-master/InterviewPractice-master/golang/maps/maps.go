package main

import "fmt"

func main() {
	myMap := make(map[string]int)

	// set key/value pairs
	myMap["key1"] = 11
	myMap["key2"] = 22
	fmt.Println("my map: ", myMap)

	// get a key with name
	val1 := myMap["key1"]
	fmt.Println(val1)
	fmt.Println(len(myMap))

	delete(myMap, "key2")
	fmt.Println("my map after delete", myMap)

	// check if key is present
	_, present := myMap["key2"]
	fmt.Println("Key2 Present: ", present)

	// declare + initialize all in one
	newMap := map[string]int{"new1": 1, "new2": 2}
	fmt.Println(newMap)
}
