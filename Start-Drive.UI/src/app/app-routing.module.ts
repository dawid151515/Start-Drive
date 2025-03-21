import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterSchoolComponent } from './components/registerLogin/register-school/register-school.component';
import { LoginComponent } from './components/registerLogin/login/login.component';
import { RegisterComponent } from './components/registerLogin/register/register.component';
import { RegisterStudentComponent } from './components/registerLogin/register-student/register-student.component';
import { RegisterInstructorComponent } from './components/registerLogin/register-instructor/register-instructor.component';
import { HomePageComponent } from './components/drivingSchool/homePage/home-page/home-page.component';
import { InstructorsHomePageComponent } from './components/drivingSchool/instructors/instructors-home-page/instructors-home-page.component';
import { MainCalendarComponent } from './components/drivingSchool/mainCalendar/main-calendar/main-calendar.component';
import { ForumComponent } from './components/drivingSchool/forum/forum/forum.component';
import { SettingsComponent } from './components/drivingSchool/settings/settings/settings.component';
import { InformationStudentsInstructorsComponent } from './components/drivingSchool/informationStudentsInstructors/information-students-instructors/information-students-instructors.component';
import { AboutDrivingSchoolComponent } from './components/drivingSchool/aboutDrivingSchool/about-driving-school/about-driving-school.component';
import { EditDeleteSchoolComponent } from './components/drivingSchool/editDeleteDrivingSchool/edit-delete-school/edit-delete-school.component';
import { StudentsHomeComponent } from './components/drivingSchool/students/students-home/students-home.component';
import { CourseRoundsComponent } from './components/drivingSchool/courseRounds/course-rounds/course-rounds.component';
import { HomePageForInstructorComponent } from './components/instructorPage/homePageForInstructor/home-page-for-instructor/home-page-for-instructor.component';
import { StudentsForInstructorComponent } from './components/instructorPage/studentsForInstructor/students-for-instructor/students-for-instructor.component';
import { MainCalendarForInstructorComponent } from './components/instructorPage/mainCalendarForInstructor/main-calendar-for-instructor/main-calendar-for-instructor.component';
import { CourseRoundsForInstructorComponent } from './components/instructorPage/courseRoundsForInstructor/course-rounds-for-instructor/course-rounds-for-instructor.component';
import { InformationForInstructorsComponent } from './components/instructorPage/informationForInstructors/information-for-instructors/information-for-instructors.component';
import { ForumForInstructorComponent } from './components/instructorPage/forumForInstructor/forum-for-instructor/forum-for-instructor.component';
import { AboutDrivingSchoolForInstructorComponent } from './components/instructorPage/aboutDrivingSchoolForInstructor/about-driving-school-for-instructor/about-driving-school-for-instructor.component';
import { ShowDeleteForInstructorComponent } from './components/instructorPage/showDeleteForInstructor/show-delete-for-instructor/show-delete-for-instructor.component';
import { HomePageForStudentComponent } from './components/studentPage/homePageForStudent/home-page-for-student/home-page-for-student.component';
import { InstructorsForStudentComponent } from './components/studentPage/instructorsForStudent/instructors-for-student/instructors-for-student.component';
import { MainCalendarForStudentComponent } from './components/studentPage/mainCalendarForStudent/main-calendar-for-student/main-calendar-for-student.component';
import { InformationForStudentsComponent } from './components/studentPage/informationForStudents/information-for-students/information-for-students.component';
import { ForumForStudentComponent } from './components/studentPage/forumForStudent/forum-for-student/forum-for-student.component';
import { AboutDrivingSchoolForStudentComponent } from './components/studentPage/aboutDrivingSchoolForStudent/about-driving-school-for-student/about-driving-school-for-student.component';
import { ShowDeleteForStudentComponent } from './components/studentPage/showDeleteForStudent/show-delete-for-student/show-delete-for-student.component';
import { isAuthGuard } from './guards/auth.guard';


const routes: Routes = [

  //-------------------------------------------- login-registration ---------------------------------------------------

  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'startDrive',
    component: LoginComponent
  },
  {
    path: 'startDrive/logowanie',
    component: LoginComponent
  },
  {
    path: 'startDrive/rejestracja',
    component: RegisterComponent
  },
  {
    path: 'startDrive/rejestracja/rejestracjaSzkoly',
    component: RegisterSchoolComponent
  },
  {
    path: 'startDrive/rejestracja/rejestracjaKursanta',
    component: RegisterStudentComponent
  },
  {
    path: 'startDrive/rejestracja/rejestracjaInstruktora',
    component: RegisterInstructorComponent
  },

  //-------------------------------------------- DRIVING SCHOOL ---------------------------------------------------

  //-------------------------------------------- home page ---------------------------------------------------

  {
    path: 'startDrive/stronaGlowna/:schoolId',
    component: HomePageComponent,
    canActivate:[isAuthGuard]
  },

   //-------------------------------------------- instructors ---------------------------------------------------

  {
    path: 'startDrive/stronaGlowna/instruktorzy/:schoolId',
    component: InstructorsHomePageComponent
  },

    //-------------------------------------------- students ---------------------------------------------------

  {
    path: 'startDrive/stronaGlowna/kursanci/:schoolId',
    component: StudentsHomeComponent
  },

  //-------------------------------------------- main calendar ---------------------------------------------------

  {
    path: 'startDrive/stronaGlowna/kalendarz/:schoolId',
    component: MainCalendarComponent
  },

  //-------------------------------------------- forum ---------------------------------------------------

  {
    path: 'startDrive/stronaGlowna/forum/:schoolId',
    component: ForumComponent
  },

  //-------------------------------------------- settings ---------------------------------------------------

  {
    path: 'startDrive/stronaGlowna/ustawienia/:schoolId',
    component: SettingsComponent
  },

  //-------------------------------------------- general information for students and instructors ---------------------------------------------------

  {
    path: 'startDrive/stronaGlowna/informacje/:schoolId',
    component: InformationStudentsInstructorsComponent
  },

  //-------------------------------------------- driving school information ---------------------------------------------------

  {
    path: 'startDrive/stronaGlowna/oSzkoleJazdy/:schoolId',
    component: AboutDrivingSchoolComponent
  },

  //-------------------------------------------- edit/delete driving school ---------------------------------------------------

  {
    path: 'startDrive/stronaGlowna/edytujUsun/:schoolId',
    component: EditDeleteSchoolComponent
  },

  //-------------------------------------------- Course tours ---------------------------------------------------

  {
    path: 'startDrive/stronaGlowna/turyKursow/:schoolId',
    component: CourseRoundsComponent
  },


  //-------------------------------------------- INSTRUCTORS' PAGE ---------------------------------------------------

  //-------------------------------------------- home page ---------------------------------------------------

  {
    path: 'startDrive/instruktor/stronaGlowna/:schoolId/:instructorId',
    component: HomePageForInstructorComponent
  },

  //-------------------------------------------- students for instructor ---------------------------------------------------

  {
    path: 'startDrive/instruktor/stronaGlowna/kursanci/:schoolId/:instructorId',
    component: StudentsForInstructorComponent
  },

    //-------------------------------------------- main calendar for instructor ---------------------------------------------------

    {
      path: 'startDrive/instruktor/stronaGlowna/kalendarz/:schoolId/:instructorId',
      component: MainCalendarForInstructorComponent
    },

    //-------------------------------------------- instructor course tours ---------------------------------------------------

    {
      path: 'startDrive/instruktor/stronaGlowna/turyKursow/:schoolId/:instructorId',
      component: CourseRoundsForInstructorComponent
    },

    //-------------------------------------------- information for instructor ---------------------------------------------------

    {
      path: 'startDrive/instruktor/stronaGlowna/informacje/:schoolId/:instructorId',
      component: InformationForInstructorsComponent
    },

    //-------------------------------------------- instructor forum ---------------------------------------------------

    {
      path: 'startDrive/instruktor/stronaGlowna/forum/:schoolId/:instructorId',
      component: ForumForInstructorComponent
    },

    //-------------------------------------------- information about driving school for instructor ---------------------------------------------------

    {
      path: 'startDrive/instruktor/stronaGlowna/oSzkoleJazdy/:schoolId/:instructorId',
      component: AboutDrivingSchoolForInstructorComponent
    },

    //-------------------------------------------- show remove info instructor account ---------------------------------------------------

    {
      path: 'startDrive/instruktor/stronaGlowna/pokazUsun/:schoolId/:instructorId',
      component: ShowDeleteForInstructorComponent
    },


  //-------------------------------------------- PAGE FOR STUDENTS ---------------------------------------------------

  //-------------------------------------------- home page ---------------------------------------------------

  {
    path: 'startDrive/kursant/stronaGlowna/:schoolId/:studentId',
    component: HomePageForStudentComponent
  },

  //-------------------------------------------- instructors for the student ---------------------------------------------------

  {
    path: 'startDrive/kursant/stronaGlowna/instruktorzy/:schoolId/:studentId',
    component: InstructorsForStudentComponent
  },

  //-------------------------------------------- main calendar for the student ---------------------------------------------------

  {
    path: 'startDrive/kursant/stronaGlowna/kalendarz/:schoolId/:studentId',
    component: MainCalendarForStudentComponent
  },

  //-------------------------------------------- information for the student ---------------------------------------------------

  {
    path: 'startDrive/kursant/stronaGlowna/informacje/:schoolId/:studentId',
    component: InformationForStudentsComponent
  },

  //-------------------------------------------- forum for student ---------------------------------------------------

  {
    path: 'startDrive/kursant/stronaGlowna/forum/:schoolId/:studentId',
    component: ForumForStudentComponent
  },

  //-------------------------------------------- information about the driving school for the student ---------------------------------------------------

  {
    path: 'startDrive/kursant/stronaGlowna/oSzkoleJazdy/:schoolId/:studentId',
    component: AboutDrivingSchoolForStudentComponent
  },

  //-------------------------------------------- show remove information student account ---------------------------------------------------

  {
    path: 'startDrive/kursant/stronaGlowna/pokazUsun/:schoolId/:studentId',
    component: ShowDeleteForStudentComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
