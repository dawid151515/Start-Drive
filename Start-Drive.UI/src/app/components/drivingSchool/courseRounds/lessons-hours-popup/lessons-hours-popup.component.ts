import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CourseRoundsStudentsId } from 'src/app/models/course-rounds-students-id.model';
import { Instructor } from 'src/app/models/instructorModel/instructor.model';
import { Student } from 'src/app/models/student.model';
import { StudentsHourDrive } from 'src/app/models/students-hour-drive.model';

@Component({
  selector: 'app-lessons-hours-popup',
  templateUrl: './lessons-hours-popup.component.html',
  styleUrls: ['./lessons-hours-popup.component.css']
})
export class LessonsHoursPopupComponent {

  ngOnInit(): void{
    this.findStudent()
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any){}

  selectedStudent: CourseRoundsStudentsId = this.data.selected
  schoolId: number = this.data.schoolIdRoute
  arrayStudents: Student[] = this.data.students
  arrayInstuctors: Instructor[] = this.data.instructors
  calendarStudentsDriveAll: StudentsHourDrive[] = this.data.calendarStudentsDrive

  studentEmail: string = ''
  findStudent(){
    var student = this.arrayStudents.find(s => s.id == this.selectedStudent.courseRoundStudentId)
    if(student != undefined){
      this.studentEmail = student.email
    }
  }

  lessonsForSelectStudent: StudentsHourDrive[] = []
  totalDrivingLessonsHours: string = ''
  drivingLessonsForAStudent(){
    this.lessonsForSelectStudent = []
    this.totalDrivingLessonsHours = ''
    var totalHours = 0

    var durationOfRiders = 0
    for(var i=0; i<this.calendarStudentsDriveAll.length; i++){
      if(this.calendarStudentsDriveAll[i].studentId == this.selectedStudent.courseRoundStudentId){
        this.lessonsForSelectStudent.push(this.calendarStudentsDriveAll[i])

        durationOfRiders = this.subtractingHours(this.calendarStudentsDriveAll[i].mainHourTo, this.calendarStudentsDriveAll[i].mainHourFrom)
        totalHours = this.summingHours(totalHours, durationOfRiders)

      }
    }
    this.totalDrivingLessonsHours = totalHours.toFixed(2)
    this.lessonsForSelectStudent.sort((a, b) => new Date(b.dateAddedDrive).getTime() - new Date(a.dateAddedDrive).getTime())
  }

  selectedInstructor: Instructor = {
    id: -1,
    name: "",
    lastName: "",
    dateOfBirth: new Date("2000-01-01"),
    placeOfBirth: "",
    address: "",
    phoneNumber: '',
    email: "Instruktor nie istnieje",
  }
  getInstructorById(id: any){
    var instructor = this.arrayInstuctors.find(i => i.id == id)

    if(instructor != undefined){
      this.selectedInstructor = instructor
    }
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

      return Number(timeDifference)

    }else{
      return (higherValue-smallerValue)
    }
  }
}
