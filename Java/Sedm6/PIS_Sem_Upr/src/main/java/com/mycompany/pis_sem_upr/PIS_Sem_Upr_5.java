package com.mycompany.pis_sem_upr;

import java.util.Scanner;

public class PIS_Sem_Upr_5 {
    
    public static void main(String[] args) {
        
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        
        if (n > 0 && n < 11) {
            switch (n) {
        
                case 1:
                    n = n * 10;
                    break;
                case 2:
                    n = n * 10;
                    break;
                case 3:
                    n = n * 10;
                    break;
                case 4:
                    n = n * 100;
                    break;
                case 5:
                    n = n * 100;
                    break;
                case 6:
                    n = n * 100;
                    break;
                case 7:
                    n = n * 1000;
                    break;
                case 8:
                    n = n * 1000;
                    break;
                case 9:
                    n = n * 1000;
                    break;
        
            }
        } else {
            System.out.println("Incorrect Input");
        }
        
        System.out.println(n);
        
    }
    
}
