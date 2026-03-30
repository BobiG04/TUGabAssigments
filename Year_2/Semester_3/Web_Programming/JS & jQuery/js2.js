class Student {
    constructor (name,surname,year,speciality,semester) {
        this.name = name;
        this.surname = surname;
        this.year = year;
        this.speciality = speciality;
        this.semester = semester;
    }

    GetInfo() {
        return this.name + " " + this.surname + " " + this.year + " " + this.speciality + " " + this.semester;
    }
}

let student = new Student("Bogomil","Ivanov","2022","SKI","3");

console.log(student.GetInfo());