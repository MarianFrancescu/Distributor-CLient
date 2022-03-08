import { Discipline } from './../models/discipline.interface';

export const mockedDisciplines: Discipline[] = [
        {
            teacher: 'John Snow',
            _id: '1',
            name: 'CHS',
            timetable: [
                {
                    option: '18-20',
                    students: ['a']
                }
            ],
            studyInstitution: 'UPT',
            faculty: 'AC',
            department: 'CTI',
            studyYear: '3',
            created: '18-02-2002'
        },
        {
            teacher: 'Bob',
            _id: '2',
            name: 'SMA',
            timetable: [
                {
                    option: 'Mon 14-16',
                    students: ['a', 'b', 'c']
                },
                {
                    option: 'Mon 18-20',
                    students: ['a']
                }
            ],
            studyInstitution: 'UPT',
            faculty: 'AC',
            department: 'CTI',
            studyYear: '3',
            created: '15-02-2002'
        }
]
