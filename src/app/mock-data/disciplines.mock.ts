import { Discipline } from './../models/discipline.interface';

export const mockedDisciplines: Discipline[] = [
        {
            disciplineId: '1',
            name: 'CHS',
            timetable: [
                {
                    option: '18-20',
                    students: ['a']
                }
            ],
            created: '18-02-2002'
        },
        {
            disciplineId: '2',
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
            created: '15-02-2002'
        }
]
