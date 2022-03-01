import { Discipline } from './../models/discipline.interface';

export const mockedDisciplines: Discipline[] = [
        {
            name: 'CHS',
            timetable: [
                {
                    option: '18-200',
                    students: ['a']
                }
            ],
            created: '18-02-2002'
        },
        {
            name: 'SMA',
            timetable: [
                {
                    option: '14-16',
                    students: ['a']
                }
            ],
            created: '15-02-2002'
        }
]
