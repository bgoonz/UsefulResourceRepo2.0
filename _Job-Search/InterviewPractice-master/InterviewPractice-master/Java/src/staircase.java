import java.util.Scanner;

/**
 * Created by ahadsheriff on 6/11/16.
 */
public class staircase {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();

        for(int i = 0; i < n; i++){
            for(int j = 0; j < n; j++){
                if(i + j >= n - 1){
                    System.out.print("#");
                }else {
                    System.out.print(" ");
                }
            }
            System.out.println();
        }

    }
}
