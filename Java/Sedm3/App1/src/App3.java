import java.util.Scanner;

public class App3 {

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        System.out.println("Enter a sentance:");
        String input = scanner.nextLine();

        char[] inputArray = input.toCharArray();

        System.out.println("Enter symbol to find:");
        String charInput = scanner.nextLine();

        if (charInput.length() != 1) {
            System.out.println("You need to enter one symbol to search.");
        } else {
            char character = charInput.charAt(0);

            Unit unit = new Unit();
            int occurrences = unit.calculateOccuranceOfChar(inputArray, character);

            System.out.println("The symbol " + character + " can be found " + occurrences + " times in the String.");
        }

        scanner.close();
        
    }
}

class Unit {

    public int calculateOccuranceOfChar(char[] inputArray, char character) {

        int count = 0;
        char lowerCaseChar = Character.toLowerCase(character);

        for (char c : inputArray) {

            if (Character.isLetter(c) && Character.toLowerCase(c) == lowerCaseChar) {
                    count++;
                }
            
        }

        return count;

    }
}