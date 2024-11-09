package com.mycompany.pis_sem_upr;

import java.io.*;
import java.net.*;
import java.util.*;

public class PIS_Sem_Upr_8_Serv {
    private static final int PORT = 12345;
    private static Set<PrintWriter> clientWriters = new HashSet<>();
    private static int numberToGuess;

    public static void main(String[] args) {
        System.out.println("The server starts on a port: " + PORT);
        generateRandomNumber();

        try (ServerSocket serverSocket = new ServerSocket(PORT)) {
            while (true) {
                new ClientHandler(serverSocket.accept()).start();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static void generateRandomNumber() {
        numberToGuess = new Random().nextInt(100) + 1;
    }

    private static class ClientHandler extends Thread {
        private Socket socket;
        private PrintWriter out;
        private BufferedReader in;

        public ClientHandler(Socket socket) {
            this.socket = socket;
        }

        public void run() {
            try {
                in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
                out = new PrintWriter(socket.getOutputStream(), true);
                synchronized (clientWriters) {
                    clientWriters.add(out);
                }

                String guess;
                while ((guess = in.readLine()) != null) {
                    handleGuess(Integer.parseInt(guess));
                }
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                try {
                    socket.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        private void handleGuess(int guess) {
            if (guess < numberToGuess) {
                out.println("Grater");
            } else if (guess > numberToGuess) {
                out.println("Lower");
            } else {
                out.println("Yes! The number is " + numberToGuess);
                generateRandomNumber();
            }
        }
    }
}
