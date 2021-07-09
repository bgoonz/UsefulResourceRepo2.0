package main

import "fmt"

func main() {
	mySlice := make([]string, 3)
	fmt.Println("Empty slice: ", mySlice)

	mySlice[0] = "yo"
	mySlice[1] = "im"
	mySlice[2] = "ahad"
	fmt.Println("set: ", mySlice)
	fmt.Println("get: ", mySlice[2])
	fmt.Println("length: ", len(mySlice))

	mySlice = append(mySlice, "how are")
	mySlice = append(mySlice, "you?")
	fmt.Println("append: ", mySlice)

	copySlice := make([]string, len(mySlice))
	copy(copySlice, mySlice)
	fmt.Println("copy slice:", copySlice)

	lice := mySlice[2:5]
	fmt.Println("slice 1: ", lice)

	temp := []string{"the", "quick", "brown", "fox"}
	fmt.Println("Declare and init: ", temp)

	twoD := make([][]int, 3)
	for i := 0; i < 3; i++ {
		innerLen := i + 1
		twoD[i] = make([]int, innerLen)
		for j := 0; j < innerLen; j++ {
			twoD[i][j] = i + j
		}
	}
	fmt.Println("2d: ", twoD)

}
