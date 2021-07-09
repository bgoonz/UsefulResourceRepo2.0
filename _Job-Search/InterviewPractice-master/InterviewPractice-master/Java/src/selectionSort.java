/**
 * Created by ahadsheriff on 3/2/17.
 */
public class selectionSort {

    public static int[] selectionSort(int[] list) {
        for (int i = 0; i < list.length-1; i++) {
            int index = i;
            for (int j = i + 1; j < list.length; j++) {
                if(list[j] < list[index]) {
                    index = j;
                }
            }
            int min = list[index];
            list[index] = list[i];
            list[i] = min;
        }
        return list;
    }

    public static void main(String[] args) {
        int[] myList = {10,34,2,56,7,67,88,42};
        int[] sort = selectionSort(myList);
        for(int i : sort) {
            System.out.print(i);
            System.out.print(", ");
        }
    }
}
