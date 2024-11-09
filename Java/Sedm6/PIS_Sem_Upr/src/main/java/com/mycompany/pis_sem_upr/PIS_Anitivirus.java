package com.mycompany.pis_sem_upr;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class PIS_Anitivirus {
    public static void main(String[] args) {
        System.out.println("Detecting installed antivirus software...\n");

        System.out.println("Checking via Windows Security Center...");
        String securityCenterResults = checkAntivirusViaSecurityCenter();
        System.out.println("Antivirus products found:\n" + securityCenterResults);

        System.out.println("Checking via Windows Registry...");
        String registryResults = checkAntivirusViaRegistry();
        System.out.println("Antivirus products found:\n" + registryResults);
        
        System.out.println("Checking common installation directories...");
        String directoryResults = checkCommonDirectories();
        System.out.println("Antivirus products found:\n" + directoryResults);
    }

    private static String checkAntivirusViaSecurityCenter() {
        String command = "powershell Get-CimInstance -Namespace root/SecurityCenter2 -ClassName AntivirusProduct";
        return executeCommand(command);
    }

    private static String checkAntivirusViaRegistry() {
        String command = "reg query HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall";
        return executeCommand(command);
    }
    
    private static String executeCommand(String command) {
        StringBuilder output = new StringBuilder();
        try {
            Process process = Runtime.getRuntime().exec(command);
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
            }
        } catch (IOException e) {
        }
        return output.toString();
    }
    
    private static String checkCommonDirectories() {
        StringBuilder output = new StringBuilder();
        String[] commonPaths = {
            "C:\\Program Files\\",
            "C:\\Program Files (x86)\\"
        };

        for (String path : commonPaths) {
            output.append(executeCommand("dir \"" + path + "\" /b | findstr /i \"antivirus\""));
        }
        return output.toString();
    }
        
}
