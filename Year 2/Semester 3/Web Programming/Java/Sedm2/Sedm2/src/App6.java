import java.util.Scanner;

public class App6 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int numb = sc.nextInt();
        sc.close();
        switch (numb) {
            case 1,2,3:
                System.out.println(numb*10);
                break;
            case 4,5,6:
                System.out.println(numb*100);
                break;
            case 7,8,9:
                System.out.println(numb*1000);
                break;
            default:
                System.out.println("Error");
                break;
        }
    }
}
