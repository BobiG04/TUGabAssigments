import java.util.Scanner;

public class App5 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        sc.close();
        for (int i = 0; i < n+1; i++) {
            if (i%7 != 0 && i%3 != 0) {
                System.out.println(i);
            }
        }
    }
}
