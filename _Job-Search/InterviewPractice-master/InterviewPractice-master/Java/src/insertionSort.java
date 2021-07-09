/**
 * Created by ahadsheriff on 3/2/17.
 */
public class insertionSort {

    public static int[] insertionSort(int[] list) {
        int min;
        for(int i = 0; i < list.length; i++) {
            for(int j = i; j > 0; j--) {
                if(list[j] <  list[j-1]) {
                    min = list[j];
                    list[j] = list[j-1];
                    list[j-1] = min;
                }
            }
        }
        return list;
    }

    public static void main(String[] args) {
        int[] myList = {10,34,2,56,7,67,88,42};
        int[] sort = insertionSort(myList);
        for(int i : sort) {
            System.out.print(i);
            System.out.print(", ");
        }
    }
}
