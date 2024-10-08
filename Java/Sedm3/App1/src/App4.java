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
       
        // Teacher
        String teacherName;
        int teacherAge;
        String teacherPhone;
        String title;
        int roomNumber;
        int numGrades;
        double[] grades;

        // Student
        String studentName;
        int studentAge;
        String studentPhone;
        String speciality;
        String facNumber;
        int numSubjects;
        String[] schedule;

        // Pupil
        String pupilName;
        int pupilAge;
        String pupilPhone;
        int classNumber;
        String schoolName;
        
        System.out.println("Enter info for a Teacher: ");
        try {
            System.out.print("Name: ");
            teacherName = scanner.nextLine();
            System.out.print("Age: ");
            teacherAge = scanner.nextInt();
            System.out.print("Phone Number: ");
            teacherPhone = scanner.nextLine();
            scanner.nextLine();
            System.out.print("Title: ");
            title = scanner.nextLine();
            System.out.print("Room Number: ");
            roomNumber = scanner.nextInt();
            System.out.println("Enter the number of Grades and their grades:");
            numGrades = scanner.nextInt();
            grades = new double[numGrades];

            if (teacherName == null) {
                System.out.println("Name not entered.");
            }
            if (teacherAge < 1) {
                System.out.println("Age not inputted correctly.");
            }
            if (teacherPhone.length() < 10) {
                System.out.println("Phone number must be 10 units long.");
            }
            if (roomNumber < 1) {
                System.out.println("Room number should be greater than 0.");
            }
            if (numGrades < 1) {
                System.out.println("Number of grades is more than 0.");
            }
            if (grades.length < 1) {
                System.out.println("The list of grades is more than 0.");
            }

            for (int i = 0; i < numGrades; i++) {
                System.out.print("Grade " + (i + 1) + ": ");
                grades[i] = scanner.nextDouble();
            }
            Teacher teacher = new Teacher(teacherName, teacherAge, teacherPhone, title, roomNumber);
            teacher.printTeacherInfo(grades);
            scanner.nextLine();
        } catch (Exception e) {
            scanner.next();
            System.out.println(e.getMessage());
        }

        System.out.println("\nEnter info for a Student:");
        try {
            System.out.print("Name: ");
            studentName = scanner.nextLine();
            System.out.print("Age: ");
            studentAge = scanner.nextInt();
            scanner.nextLine();
            System.out.print("Phone Number: ");
            studentPhone = scanner.nextLine();
            System.out.print("Speciality: ");
            speciality = scanner.nextLine();
            System.out.print("Faculty Number: ");
            facNumber = scanner.nextLine();
            System.out.println("Enter the number of subjects:");
            numSubjects = scanner.nextInt();
            scanner.nextLine();
            schedule = new String[numSubjects];

            if (studentName == null) {
                System.out.println("Name not entered.");
            }
            if (studentAge < 1) {
                System.out.println("Age not inputted correctly.");
            }
            if (studentPhone.length() < 10 || studentPhone.length() > 10) {
                System.out.println("Phone number must be 10 units long.");
            }
            if (facNumber.length() < 8 || facNumber.length() > 8) {
                System.out.println("Faculty number must be 10 symbols.");
            }
            if (numSubjects < 1) {
                System.out.println("The list of subjects is more than 0.");
            }

            for (int i = 0; i < numSubjects; i++) {
                System.out.print("Subject " + (i + 1) + ": ");
                schedule[i] = scanner.nextLine();
            }
            Student student = new Student(studentName, studentAge, studentPhone, speciality, facNumber);
            student.printSchedule(schedule);
        } catch (Exception e) {
            scanner.next();
            System.out.println(e.getMessage());
        }

            System.out.println("\nEnter info for a Pupil:");
        try {
            System.out.print("Name: ");
            pupilName = scanner.nextLine();
            System.out.print("Age: ");
            pupilAge = scanner.nextInt();
            scanner.nextLine(); 
            System.out.print("Phone Number: ");
            pupilPhone = scanner.nextLine();
            System.out.print("Number in class: ");
            classNumber = scanner.nextInt();
            scanner.nextLine();
            System.out.print("School Name: ");
            schoolName = scanner.nextLine();

            

            Pupil pupil = new Pupil(pupilName, pupilAge, pupilPhone, classNumber, schoolName);
            pupil.printPupilInfo();
        } catch (Exception e) {
            scanner.next();
            System.out.println(e.getMessage());
        }

        
        scanner.close();
    }
}
