public class inversedNumber {
    public static int getIntegerComplement(int number){
        // Convert Decimal to Binary
        char [] binary = Integer.toString(number,2).toCharArray();
        // Flip Bits
        inverse(binary);
        return Integer.parseInt(String.valueOf(binary), 2);
    }

    private static void inverse(char[] binary) {
        for (int i = 0; i < binary.length; i++) {
            if (binary[i]=='0')
                binary[i]='1';
            else
                binary[i]='0';
        }
    }
}
