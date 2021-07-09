package main

import "fmt"

func main() {
	var my_list [5]int
	fmt.Println("Empty list: ", my_list)

	my_list[3] = 100
	fmt.Println("Set index equal to: ", my_list)
	fmt.Println("Get index 3: ", my_list[3])

	b := [5]int{10, 20, 30, 40, 50}
	fmt.Println("Print entire initialized list: ", b)

	var two_d [2][3]int
	for i := 0; i < 2; i++ {
		for j := 0; j < 3; j++ {
			two_d[i][j] = i + j
		}
	}
	fmt.Println("2D array: ", two_d)
}
