export interface Discipline {
    disciplineId: string,
    name: string,
    timetable: [{
        option: string,
        students: [string]
    }],
    created: string
}