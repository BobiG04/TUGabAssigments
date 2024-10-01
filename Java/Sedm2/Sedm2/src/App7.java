public class App7 {
    public static void main(String[] args) {
        int[] arr = new int[20];
        int temp = 0;
        int sum = 0;
        for (int i = 0; i < arr.length; i++) {
            arr[i] = i * 5;
            if(i>=0){
                if (arr[i] < arr[i+1]) {
                    temp = arr[i+1];
                } else {
                    temp = arr[i];
                }
            }
            System.out.print("Nai golqmo chislo: ");
            System.out.println(temp);
            sum+=arr[i];
            System.out.print("Suma: ");
            System.out.println(sum);
        }
        for (int i = 0; i < arr.length; i++) {
            System.out.println("Elementi na masiva: ");
            System.out.println(arr[i]);
        }
    }
}
