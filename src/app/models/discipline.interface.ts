export interface Discipline {
    disciplineId: string,
    teacher: string,
    name: string,
    // timetable: [{
    //     option: string,
    //     students: string[]
    // }],
    timetable: Timetable[],
    studyInstitution: string;
    faculty: string;
    department: string;
    studyYear: string;
    created: string
}

interface Timetable {
    option: string,
    students: string[]
}