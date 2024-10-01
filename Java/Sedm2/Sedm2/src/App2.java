import java.util.Scanner;

public class App2 {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        final int size = input.nextInt();
        if (size > 7 && size < 51){
            int[] arr = new int[size];
            for (int i = 50; i > arr.length + 1; i--) {
                if(i % 3 == 0 && i > 3) {
                    System.out.println(i);
                }
            }
        }
        input.close();
    }
}
