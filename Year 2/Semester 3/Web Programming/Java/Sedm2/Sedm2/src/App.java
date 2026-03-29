import java.util.Scanner;

public class App {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        final int size = input.nextInt();
        if (size > 3 && size < 21){
            int[] arr = new int[size];
            for (int i = 0; i < arr.length + 1; i++) {
                if(i % 2 == 0 && i > 3) {
                    System.out.println(i);
                }
            }
        }
        input.close();
    }
}
