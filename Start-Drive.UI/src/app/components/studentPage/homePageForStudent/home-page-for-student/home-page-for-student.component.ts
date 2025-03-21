import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Instructor } from 'src/app/models/instructorModel/instructor.model';
import { OpenClose } from 'src/app/models/open-close.model';
import { SingleClose } from 'src/app/models/single-close.model';
import { Student } from 'src/app/models/student.model';
import { StudentsHourDrive } from 'src/app/models/students-hour-drive.model';
import { InstructorService } from 'src/app/service/instructor-service/instructor.service';
import { MainCalendarService } from 'src/app/service/main-calendar-service/main-calendar.service';
import { SettingsService } from 'src/app/service/settings-service/settings.service';
import { StudentService } from 'src/app/service/student-service/student.service';

@Component({
  selector: 'app-home-page-for-student',
  templateUrl: './home-page-for-student.component.html',
  styleUrls: ['./home-page-for-student.component.css']
})
export class HomePageForStudentComponent {

  ngOnInit(): void{
    this.getLogInStudentRoute()
  }

  constructor(private aRoute: ActivatedRoute, private studentService: StudentService, private instructorService: InstructorService,
    private mainCalendarService: MainCalendarService, private settingsService: SettingsService
  ){}

  pageName: string= 'Strona główna'


  // ----------------------------------------------------calendar data--------------------------------------------------

  day: number = new Date().getDate()
  month: number = new Date().getMonth()+1
  year: number = new Date().getFullYear()

  logInStudent: Student = {
    name: "",
    lastName: "",
    dateOfBirth: new Date("2000-01-01"),
    placeOfBirth: "",
    address: "",
    phoneNumber: '',
    email: ""
  }

  arrayInstructors: Instructor[] = [
    // {
    //   id: 1,
    //   name: "Adam",
    //   lastName: "Bąk",
    //   dateOfBirth: new Date("2001-02-20"),
    //   placeOfBirth: "Madryt",
    //   address: "Tuszyma 211",
    //   phoneNumber: '444999333',
    //   email: "adam@wp.pl",
    //   instructorDaysOff: []
    // },
    // {
    //   id: 2,
    //   name: "Ala",
    //   lastName: "Madej",
    //   dateOfBirth: new Date("2001-02-20"),
    //   placeOfBirth: "Madryt",
    //   address: "Tuszyma 211",
    //   phoneNumber: '444999333',
    //   email: "adam@wp.pl",
    //   instructorDaysOff: [
    //     {
    //       dateAbsenceKey: '2023-12-21',
    //       reasonAbsenceValue: 'chorobowe'
    //     },
    //     {
    //       dateAbsenceKey: '2024-1-18',
    //       reasonAbsenceValue: 'chorobowe'
    //     },
    //     {
    //       dateAbsenceKey: '2024-1-19',
    //       reasonAbsenceValue: 'chorobowe'
    //     },
    //     {
    //       dateAbsenceKey: '2024-1-22',
    //       reasonAbsenceValue: 'Urlop wypoczynkowy'
    //     },
    //     {
    //       dateAbsenceKey: '2024-1-17',
    //       reasonAbsenceValue: 'Urlop okolicznościowy'
    //     },
    //     {
    //       dateAbsenceKey: '2024-1-24',
    //       reasonAbsenceValue: 'inne'
    //     }
    //   ]
    // },
    // {
    //   id: 3,
    //   name: "Krzysztof",
    //   lastName: "Bąk",
    //   dateOfBirth: new Date("2001-02-20"),
    //   placeOfBirth: "Madryt",
    //   address: "Tuszyma 211",
    //   phoneNumber: '444999333',
    //   email: "adam@wp.pl",
    //   instructorDaysOff: []
    // },
    // {
    //   id: 4,
    //   name: "Witek",
    //   lastName: "Rak",
    //   dateOfBirth: new Date("2001-02-20"),
    //   placeOfBirth: "Madryt",
    //   address: "Tuszyma 211",
    //   phoneNumber: '444999333',
    //   email: "adam@wp.pl",
    //   instructorDaysOff: []
    // },
    // {
    //   id: 5,
    //   name: "Tadeusz",
    //   lastName: "Wojtaszek",
    //   dateOfBirth: new Date("2001-02-20"),
    //   placeOfBirth: "Madryt",
    //   address: "Tuszyma 211",
    //   phoneNumber: '444999333',
    //   email: "adam@wp.pl",
    //   instructorDaysOff: []
    // }
  ]

  calendarLogInStudentDriveAll: StudentsHourDrive[] = [
    // {
    //   instructorId: 1,
    //   dateAddedDrive: new Date('2024, 01, 10'),
    //   mainHourFrom: 15.20,
    //   mainHourTo: 16.50,
    //   color: '#9999FF',
    //   studentId: 3,
    //   description: ''
    // },
    // {
    //   instructorId: 1,
    //   dateAddedDrive: new Date('2024, 01, 10'),
    //   mainHourFrom: 17.05,
    //   mainHourTo: 18.10,
    //   color: '#CC99FF',
    //   studentId: 3,
    //   description: ''
    // },
    // {
    //   instructorId: 1,
    //   dateAddedDrive: new Date('2024, 01, 10'),
    //   mainHourFrom: 18.10,
    //   mainHourTo: 19.35,
    //   color: '#CCFFCC',
    //   studentId: 3,
    //   description: ''
    // },
    // {
    //   instructorId: 1,
    //   dateAddedDrive: new Date('2024, 01, 10'),
    //   mainHourFrom: 22.20,
    //   mainHourTo: 23,
    //   color: '#CC9999',
    //   studentId: 2,
    //   description: ''
    // },
    // {
    //   instructorId: 1,
    //   dateAddedDrive: new Date('2024, 01, 10'),
    //   mainHourFrom: 16,
    //   mainHourTo: 17,
    //   color: '#CC9999',
    //   studentId: 1,
    //   description: 'llllllll'
    // },
    // {
    //   instructorId: 2,
    //   dateAddedDrive: new Date('2024, 01, 10'),
    //   mainHourFrom: 16,
    //   mainHourTo: 17,
    //   color: '#CC9999',
    //   studentId: 1,
    //   description: 'pppppppppp'
    // },
    // {
    //   instructorId: 3,
    //   dateAddedDrive: new Date('2024, 01, 10'),
    //   mainHourFrom: 16,
    //   mainHourTo: 17,
    //   color: '#CC9999',
    //   studentId: 1,
    //   description: 'wwwwwwwwwww'
    // },
    // {
    //   instructorId: 1,
    //   dateAddedDrive: new Date('2024, 01, 10'),
    //   mainHourFrom: 19.20,
    //   mainHourTo: 22,
    //   color: '#CC9999',
    //   studentId: 1,
    //   description: ''
    // },
    // {
    //   instructorId: 2,
    //   dateAddedDrive: new Date('2024, 01, 11'),
    //   mainHourFrom: 0,
    //   mainHourTo: 0.2,
    //   color: '#99FF99',
    //   studentId: -2,
    //   description: 'szkolenie'
    // },
    // {
    //   instructorId: 2,
    //   dateAddedDrive: new Date('2024, 01, 11'),
    //   mainHourFrom: 15.20,
    //   mainHourTo: 19.15,
    //   color: '#99FFFF',
    //   studentId: 4,
    //   description: ''
    // },
    // {
    //   instructorId: 2,
    //   dateAddedDrive: new Date('2024, 01, 11'),
    //   mainHourFrom: 15,
    //   mainHourTo: 19.15,
    //   color: '#C0C0C0',
    //   studentId: 4,
    //   description: ''
    // },
    // {
    //   instructorId: 2,
    //   dateAddedDrive: new Date('2024, 01, 11'),
    //   mainHourFrom: 19.2,
    //   mainHourTo: 20,
    //   color: '#E5CCFF',
    //   studentId: 4,
    //   description: ''
    // }
  ]

  //tabela z pojedynczymi dniami wolnymi od pracy, świeta itd.
  freeDaysCalendarToConvert: SingleClose[] = [
    // { dateCloseKey: '2023-12-8', openCloseValue: false }
  ]

  freeDaysConvert(){

    this.freeDaysCalendarToConvert.forEach(free => {
      this.freeDaysCalendar[free.dateCloseKey] = free.openCloseValue
    });
  }

  freeDaysCalendar: {[dayInYear: string]: boolean} = {}

  daysAndHours: OpenClose[] = [
    {dayOfTheWeek: 0, isOpen: false, firstHour: 1, lastHour: 23}, // i=0 czyli niedziela
    {dayOfTheWeek: 1, isOpen: true, firstHour: 1, lastHour: 23}, // i=1 czyli poniedziałek
    {dayOfTheWeek: 2, isOpen: true, firstHour: 1, lastHour: 23},
    {dayOfTheWeek: 3, isOpen: true, firstHour: 15, lastHour: 20},
    {dayOfTheWeek: 4, isOpen: true, firstHour: 1, lastHour: 23},
    {dayOfTheWeek: 5, isOpen: true, firstHour: 1.10, lastHour: 22.20},
    {dayOfTheWeek: 6, isOpen: false, firstHour: 1, lastHour: 23}
  ]

  checkCorrectOrderDaysAndHours(){
    var checkResult
    this.daysAndHours.forEach(e => {
      var i=0
      if(e.dayOfTheWeek != i){
        i++
        checkResult = false
        return false
      }else{
        checkResult = true
        return true
      }
    });

    if(checkResult == false){
      this.daysAndHours.sort(function (a, b) {  return a.dayOfTheWeek - b.dayOfTheWeek;  })
    }
  }

  initVariable: boolean = false
  sleepTimeOut(){
    setTimeout(() => this.initVariable = true, 1000)
  }

  // ----------------------------------------------------router logic--------------------------------------------------

  schoolId: number = -30
  studentId: number = -30
  getLogInStudentRoute(){
    this.schoolId = Number(this.aRoute.snapshot.paramMap.get('schoolId'))
    this.studentId = Number(this.aRoute.snapshot.paramMap.get('studentId'))

    this.studentService.getStudent(this.schoolId, this.studentId).subscribe((response) => {
      this.logInStudent = response
    })

    this.getInstructorsRoute()
    this.getDrivingHoursStudentRoute()
    this.getOpenCloseRoute()
    this.getSingleCloseRoute()
  }

  getInstructorsRoute(){
    this.schoolId = Number(this.aRoute.snapshot.paramMap.get('schoolId'))

    this.instructorService.getInstructors(this.schoolId).subscribe((response) => {
      this.arrayInstructors = response
    })
  }

  getDrivingHoursStudentRoute(){

    this.mainCalendarService.getStudentHoursDrive(this.schoolId, this.studentId).subscribe((response) => {
      this.calendarLogInStudentDriveAll = response
    })
  }

  getOpenCloseRoute(){

    this.settingsService.getOpenClose(this.schoolId).subscribe((response) => {
      this.daysAndHours = response
      this.checkCorrectOrderDaysAndHours()
    })
  }

  getSingleCloseRoute(){

    this.settingsService.getSingleClose(this.schoolId).subscribe((response) => {
      this.freeDaysCalendarToConvert = response
      this.freeDaysConvert()
      this.sleepTimeOut()
    })
  }
}
