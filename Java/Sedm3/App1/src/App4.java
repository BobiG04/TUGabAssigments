import java.util.Scanner;

class Person {

    private String name;
    private int age;
    private String phoneNumber;

    public Person(String name, int age, String phoneNumber) {
        this.name = name;
        this.age = age;
        this.phoneNumber = phoneNumber;
    }

    public void printInfo() {
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Number: " + phoneNumber);
    }
}

class Teacher extends Person {

    private String title;
    private int roomNumber;

    public Teacher(String name, int age, String phoneNumber, String title, int roomNumber) {
        super(name, age, phoneNumber);
        this.title = title;
        this.roomNumber = roomNumber;
    }

    public double calculateAverageGrade(double[] grades) {
        double sum = 0;
        for (double grade : grades) {
            sum += grade;
        }
        return grades.length > 0 ? sum / grades.length : 0;
    }

    public void printTeacherInfo(double[] grades) {
        super.printInfo();
        System.out.println("Title: " + title);
        System.out.println("Room Number: " + roomNumber);
        System.out.println("Average Grade: " + calculateAverageGrade(grades));
    }
}

class Student extends Person {

    private String speciality;
    private String facNumber;

    public Student(String name, int age, String phoneNumber, String speciality, String facNumber) {
        super(name, age, phoneNumber);
        this.speciality = speciality;
        this.facNumber = facNumber;
    }

    public void printSchedule(String[] schedule) {
        super.printInfo();
        System.out.println("Speciality: " + speciality);
        System.out.println("Faculty Number: " + facNumber);
        System.out.println("Schedule:");
        for (String subject : schedule) {
            System.out.println("- " + subject);
        }
    }
}

class Pupil extends Person {

    private int classNumber;
    private String schoolName;

    public Pupil(String name, int age, String phoneNumber, int classNumber, String schoolName) {
        super(name, age, phoneNumber);
        this.classNumber = classNumber;
        this.schoolName = schoolName;
    }

    public void printPupilInfo() {
        super.printInfo();
        System.out.println("Number in class: " + classNumber);
        System.out.println("School Name: " + schoolName);
    }
}

public class App4 {
    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        System.out.println("Enter info for a Teacher: ");
        System.out.print("Name: ");
        String teacherName = scanner.nextLine();
        System.out.print("Age: ");
        int teacherAge = scanner.nextInt();
        scanner.nextLine();
        System.out.print("Phone Number: ");
        String teacherPhone = scanner.nextLine();
        System.out.print("Title: ");
        String title = scanner.nextLine();
        System.out.print("Room Number: ");
        int roomNumber = scanner.nextInt();
        System.out.println("Enter the number of diciplines and their grades:");
        int numGrades = scanner.nextInt();
        double[] grades = new double[numGrades];
        for (int i = 0; i < numGrades; i++) {
            System.out.print("Grade " + (i + 1) + ": ");
            grades[i] = scanner.nextDouble();
        }
        Teacher teacher = new Teacher(teacherName, teacherAge, teacherPhone, title, roomNumber);
        teacher.printTeacherInfo(grades);

        scanner.nextLine();
        System.out.println("\nEnter info for a Student:");
        System.out.print("Name: ");
        String studentName = scanner.nextLine();
        System.out.print("Age: ");
        int studentAge = scanner.nextInt();
        scanner.nextLine();
        System.out.print("Phone Number: ");
        String studentPhone = scanner.nextLine();
        System.out.print("Speciality: ");
        String speciality = scanner.nextLine();
        System.out.print("Faculty Number: ");
        String facNumber = scanner.nextLine();
        System.out.println("Enter the number of subjects:");
        int numSubjects = scanner.nextInt();
        scanner.nextLine();
        String[] schedule = new String[numSubjects];
        for (int i = 0; i < numSubjects; i++) {
            System.out.print("Subject " + (i + 1) + ": ");
            schedule[i] = scanner.nextLine();
        }
        Student student = new Student(studentName, studentAge, studentPhone, speciality, facNumber);
        student.printSchedule(schedule);

        System.out.println("\nEnter info for a Pupil:");
        System.out.print("Name: ");
        String pupilName = scanner.nextLine();
        System.out.print("Age: ");
        int pupilAge = scanner.nextInt();
        scanner.nextLine(); 
        System.out.print("Phone Number: ");
        String pupilPhone = scanner.nextLine();
        System.out.print("Number in class: ");
        int classNumber = scanner.nextInt();
        scanner.nextLine();
        System.out.print("School Name: ");
        String schoolName = scanner.nextLine();
        Pupil pupil = new Pupil(pupilName, pupilAge, pupilPhone, classNumber, schoolName);
        pupil.printPupilInfo();

        scanner.close();
    }
}
