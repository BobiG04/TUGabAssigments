package com.mycompany.pis_sem_upr;

import java.io.*;
import java.net.*;

public class PIS_Sem_Upr_8_Cli {
    private static final String SERVER_ADDRESS = "localhost";
    private static final int SERVER_PORT = 12345;

    public static void main(String[] args) {
        try (Socket socket = new Socket(SERVER_ADDRESS, SERVER_PORT);
             PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
             BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
             BufferedReader userInput = new BufferedReader(new InputStreamReader(System.in))) {

            String response;
            while (true) {
                System.out.print("Enter your guess (number between 1 and 100): ");
                String userGuess = userInput.readLine();
                out.println(userGuess);

                response = in.readLine();
                System.out.println("Server: " + response);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
