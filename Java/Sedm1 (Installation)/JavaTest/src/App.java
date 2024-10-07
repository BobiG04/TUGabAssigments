import java.util.Scanner;

public class App {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        Scanner keyInput = new Scanner(System.in);
        int a = Integer.parseInt(keyInput.nextLine());
        int b = Integer.parseInt(keyInput.nextLine());
        int c = a * b;
        keyInput.close();

        System.out.println(c);
    }
}
