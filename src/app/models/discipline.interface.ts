export interface Discipline {
    name: string,
    timetable: [{
        option: string,
        students: [string]
    }],
    created: string
}