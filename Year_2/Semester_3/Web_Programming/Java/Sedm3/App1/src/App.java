import java.util.InputMismatchException;
import java.util.Scanner;

public class App {
    public static void main(String[] args) {
        
        boolean status;
        int N;

        String warnMsg = "N needs to be greater than 0";
        Scanner input = new Scanner(System.in);

        do {
            status = false;
            System.out.print("Enter number = ");
            try {
                N = input.nextInt();
                if (N < 1 || N % 2 == 1) {
                    System.out.println(String.join(warnMsg));
                } else {
                    status = true;
                }
            } catch (InputMismatchException e) {
                input.next();
                System.out.println(String.join(" ", warnMsg, e.getMessage()));
            }
        } while (!status);
        input.close();
    }
}
