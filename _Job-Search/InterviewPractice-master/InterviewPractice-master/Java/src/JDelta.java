
    import java.io.*; 
    import java.lang.*; 
    import java.util.ArrayList;

    class Solution {
        public static void main(String args[] ) throws Exception { 
    /* Enter your code here. Read input from STDIN. Print output to STDOUT */
            Solution objSolution=new Solution();
            int N,d;
            BufferedReader br=new BufferedReader(new InputStreamReader(System.in));
            System.out.println("n: ");
            N=Integer.parseInt(br.readLine());
            int arrayOfNumbers[]=new int[N];
            System.out.println("d: ");
            d=Integer.parseInt(br.readLine());
            objSolution.inputNumbers(arrayOfNumbers);
            System.out.println("Array size: "+ N);
            for(int i=0;i<N;i++) {
                System.out.println(arrayOfNumbers[i]);
            }
            objSolution.calculateDifference(arrayOfNumbers,N,d);
        }

        public static void inputNumbers(int arrayOfNumbers[])throws IOException {
            BufferedReader br=new BufferedReader(new InputStreamReader(System.in));
            int lengthOfArray=arrayOfNumbers.length;
            System.out.println("Array length "+lengthOfArray);
            for(int i=0;i<lengthOfArray;i++) {
                System.out.println("Other integer: ");
                arrayOfNumbers[i]=Integer.parseInt(br.readLine());
            }
        }

        public static void calculateDifference(int arrayOfNumbers[],int N,int d) throws IOException {
            int count=0;
            for(int i=0;i<N;i++) {
                for(int j=i+1;j<N;j++)
                    if((arrayOfNumbers[i]-arrayOfNumbers[j]==d)||(arrayOfNumbers[j]-arrayOfNumbers[i]==d)) {
                        count++;
                    }
            }
            System.out.println(count);
        }


    }

