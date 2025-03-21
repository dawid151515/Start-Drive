import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/models/student.model';
import { StudentsHourDrive } from 'src/app/models/students-hour-drive.model';
import { MainCalendarService } from 'src/app/service/main-calendar-service/main-calendar.service';
import { StudentService } from 'src/app/service/student-service/student.service';

@Component({
  selector: 'app-students-for-instructor',
  templateUrl: './students-for-instructor.component.html',
  styleUrls: ['./students-for-instructor.component.css']
})
export class StudentsForInstructorComponent {

  constructor(private aRoute: ActivatedRoute, private studentService: StudentService, private mainCalendarService: MainCalendarService){}

  ngOnInit(): void {
    this.getStudentsRoute()
  }

  pageName: string= 'Kursańci'

  arrayPersons: Student[] = []

  calendarStudentsDriveAll: StudentsHourDrive[] = []

  lessonsForSelectStudent: StudentsHourDrive[] = []
  totalDrivingLessonsHours: string = ''
  drivingLessonsForAStudent(student: Student){

    this.lessonsForSelectStudent = []
    this.totalDrivingLessonsHours = ''
    var totalHours = 0

    var durationOfRiders = 0
    for(var i=0; i<this.calendarStudentsDriveAll.length; i++){
      if(this.calendarStudentsDriveAll[i].studentId == student.id){
        this.lessonsForSelectStudent.push(this.calendarStudentsDriveAll[i])

        durationOfRiders = this.subtractingHours(this.calendarStudentsDriveAll[i].mainHourTo, this.calendarStudentsDriveAll[i].mainHourFrom)
        totalHours = this.summingHours(totalHours, durationOfRiders)
      }
    }

    this.totalDrivingLessonsHours = totalHours.toFixed(2)
    this.lessonsForSelectStudent.sort((a, b) => new Date(b.dateAddedDrive).getTime() - new Date(a.dateAddedDrive).getTime())
  }


  convertLocaleDate(date: Date): string{
    var setDate = new Date(date)

    var day = setDate.getDate()
    var month = setDate.getMonth()+1
    var year = setDate.getFullYear()

    return this.convertDateString(`${year}`, `${month}`, `${day}`)
  }

  convertDateString(year: string, month: string, day: string): string{
    var monthNumber = Number(month)
    var dayNumber = Number(day)

    var date = ``

    if(dayNumber < 10){
      date += '0'+day+'.'
    }else{
      date += day+'.'
    }

    if(monthNumber<10){
      date +='0'+month+'.'
    } else{
      date += month+'.'
    }

    date +=  `${year}`

    return date
  }

  summingHours(value1: number, value2: number): number{

    var value1ToMinutes = 0

    var value1String = value1.toString().split('.')
    if(value1String.length == 2){
      var hours = Number(value1String[0])*60
      var minutes = Number(value1String[1])
      if(value1String[1].split('').length == 1){
        minutes = Number(value1String[1]+'0')
      }

      value1ToMinutes = hours+minutes
    }else{
      value1ToMinutes = value1*60
    }

    var value2ToMinutes = 0

    var value2String = value2.toString().split('.')
    if(value2String.length == 2){
      var hours = Number(value2String[0])*60
      var minutes = Number(value2String[1])
      if(value2String[1].split('').length == 1){
        minutes = Number(value2String[1]+'0')
      }

      value2ToMinutes = hours+minutes
    }else{
      value2ToMinutes = value2*60
    }

    var sum = value1ToMinutes+value2ToMinutes

    var sumToReturn = 0
    if(sum>=60){
      var sumToHour = Math.trunc(sum/60)
      var remainingMinutes = (sum - (sumToHour*60))

      if(remainingMinutes<10){
        sumToReturn = Number(`${sumToHour}.0${remainingMinutes}`)
      }else{
        sumToReturn = Number(`${sumToHour}.${remainingMinutes}`)
      }
    }else{

      sumToReturn = Number(`0.${sum}`)
      if(sum<10){
        sumToReturn = Number(`0.0${sum}`)
      }
    }
    return sumToReturn
  }

  subtractingHours(higherValue: number, smallerValue: number): number{

    if(higherValue.toString().split('.').length == 2 || smallerValue.toString().split('.').length == 2){

      var value1Split
      var value1ToMinutes
      if(higherValue.toString().split('.').length == 2){
        value1Split = higherValue.toString().split('.')
        if(value1Split[1].split('').length == 1){
          value1ToMinutes = (parseInt(value1Split[0])*60)+parseInt(`${value1Split[1]}0}`)
        }else{
          value1ToMinutes = (parseInt(value1Split[0])*60)+parseInt(value1Split[1])
        }
      }else{
        value1Split = higherValue.toString()
        value1ToMinutes = (parseInt(value1Split)*60)
      }

      var value2Split
      var value2ToMinutes
      if(smallerValue.toString().split('.').length == 2){
        value2Split = smallerValue.toString().split('.')
        if(value2Split[1].split('').length == 1){
          value2ToMinutes = (parseInt(value2Split[0])*60)+parseInt(`${value2Split[1]}0`)
        }else{
          value2ToMinutes = (parseInt(value2Split[0])*60)+parseInt(value2Split[1])
        }
      }else{
        value2Split = smallerValue.toString()
        value2ToMinutes = (parseInt(value2Split)*60)
      }

      var toHours = value1ToMinutes - value2ToMinutes

      var timeDifference = ''
      if(toHours<60){
        if(toHours<10){
          timeDifference = `0.0${toHours}`
        }else{
          timeDifference = `0.${toHours}`
        }
      }else if(toHours>60){

        var divideWholeHours = Math.trunc(toHours/60)
        var restFromDivision = toHours%60
        if(restFromDivision<10){
          timeDifference = `${divideWholeHours}.0${restFromDivision}`
        }else{
          timeDifference = `${divideWholeHours}.${restFromDivision}`
        }
      }else{
        var divideWholeHoursElse = toHours/60
        timeDifference = `${divideWholeHoursElse}`
      }

      return parseFloat(timeDifference)

    }else{
      return (higherValue-smallerValue)
    }
  }

  index: number = -1

  showStudents(i:number){
    if(this.index == i){
      this.index = -1
    }else{
      this.index = i
    }
  }


  //------------------------------------------------------Router logic------------------------------------------------------

  schoolId: number = -30
  getStudentsRoute(){
    this.schoolId = Number(this.aRoute.snapshot.paramMap.get('schoolId'))

    this.studentService.getStudents(this.schoolId).subscribe((response) => {
      this.arrayPersons = response
    })

    this.getHoursDriveRoute()
  }

  getHoursDriveRoute(){

    this.mainCalendarService.getHoursDrive(this.schoolId).subscribe((response) => {
      this.calendarStudentsDriveAll = response
    })
  }
}
