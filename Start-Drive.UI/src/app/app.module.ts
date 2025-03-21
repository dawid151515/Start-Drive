import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterSchoolComponent } from './components/registerLogin/register-school/register-school.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './components/registerLogin/login/login.component';
import { RegisterComponent } from './components/registerLogin/register/register.component';
import { RegisterStudentComponent } from './components/registerLogin/register-student/register-student.component';
import { RegisterInstructorComponent } from './components/registerLogin/register-instructor/register-instructor.component';
import { HomePageComponent } from './components/drivingSchool/homePage/home-page/home-page.component';
import { InstructorsHomePageComponent } from './components/drivingSchool/instructors/instructors-home-page/instructors-home-page.component';
import { InstructorCalendarComponent } from './components/drivingSchool/instructors/instructorCalendar/instructor-calendar/instructor-calendar.component';
import { InstructorCalendarDayComponent } from './components/drivingSchool/instructors/instructorCalendar/instructor-calendar-day/instructor-calendar-day.component';
import { TransformHourPipe } from './pipes/transformHour/transform-hour.pipe';
import { SaveStudentCalendarPopupComponent } from './components/drivingSchool/instructors/instructorCalendar/save-student-calendar-popup/save-student-calendar-popup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TransformStudentPipe } from './pipes/transformStudent/transform-student.pipe';
import { RemoveStudentCalendarPopupComponent } from './components/drivingSchool/instructors/instructorCalendar/remove-student-calendar-popup/remove-student-calendar-popup.component';
import { TransformFreeHoursPipe } from './pipes/transformFreeHours/transform-free-hours.pipe';
import { MainCalendarComponent } from './components/drivingSchool/mainCalendar/main-calendar/main-calendar.component';
import { MainCalendarDayComponent } from './components/drivingSchool/mainCalendar/main-calendar-day/main-calendar-day.component';
import { SaveStudentMainCalendarPopupComponent } from './components/drivingSchool/mainCalendar/save-student-main-calendar-popup/save-student-main-calendar-popup.component';
import { RemoveStudentMainCalendarPopupComponent } from './components/drivingSchool/mainCalendar/remove-student-main-calendar-popup/remove-student-main-calendar-popup.component';
import { FreeDaysInstructorPopupComponent } from './components/drivingSchool/instructors/instructorCalendar/free-days-instructor-popup/free-days-instructor-popup.component';
import { RomoveFreeDaysCalendarPopupComponent } from './components/drivingSchool/instructors/instructorCalendar/romove-free-days-calendar-popup/romove-free-days-calendar-popup.component';
import { TransformTypeOfAbsencePipe } from './pipes/transformTypeOfAbsence/transform-type-of-absence.pipe';
import { TransformLengthDisplayedTextPipe } from './pipes/transformLengthDisplayedText/transform-length-displayed-text.pipe';
import { TransformDatePipe } from './pipes/transformDate/transform-date.pipe';
import { ForumComponent } from './components/drivingSchool/forum/forum/forum.component';
import { AskQuestionPopupComponent } from './components/drivingSchool/forum/ask-question-popup/ask-question-popup.component';
import { AnswerQuestionPopupComponent } from './components/drivingSchool/forum/answer-question-popup/answer-question-popup.component';
import { DeleteQuestionPopupComponent } from './components/drivingSchool/forum/delete-question-popup/delete-question-popup.component';
import { DeleteReplyPopupComponent } from './components/drivingSchool/forum/delete-reply-popup/delete-reply-popup.component';
import { SettingsComponent } from './components/drivingSchool/settings/settings/settings.component';
import { InformationStudentsInstructorsComponent } from './components/drivingSchool/informationStudentsInstructors/information-students-instructors/information-students-instructors.component';
import { DeleteSingleDaysPopupComponent } from './components/drivingSchool/settings/delete-single-days-popup/delete-single-days-popup.component';
import { DeleteInformationPopupComponent } from './components/drivingSchool/informationStudentsInstructors/delete-information-popup/delete-information-popup.component';
import { ShowInformationPopupComponent } from './components/drivingSchool/informationStudentsInstructors/show-information-popup/show-information-popup.component';
import { AddInformationPopupComponent } from './components/drivingSchool/informationStudentsInstructors/add-information-popup/add-information-popup.component';
import { TransformInformationPipe } from './pipes/transformInformation/transform-information.pipe';
import { AboutDrivingSchoolComponent } from './components/drivingSchool/aboutDrivingSchool/about-driving-school/about-driving-school.component';
import { EditInformationPopupComponent } from './components/drivingSchool/aboutDrivingSchool/edit-information-popup/edit-information-popup.component';
import { AddInstructorPopupComponent } from './components/drivingSchool/instructors/add-instructor-popup/add-instructor-popup.component';
import { EditInstructorPopupComponent } from './components/drivingSchool/instructors/edit-instructor-popup/edit-instructor-popup.component';
import { RemoveInstructorPopupComponent } from './components/drivingSchool/instructors/remove-instructor-popup/remove-instructor-popup.component';
import { EditDeleteSchoolComponent } from './components/drivingSchool/editDeleteDrivingSchool/edit-delete-school/edit-delete-school.component';
import { EditSchoolPopupComponent } from './components/drivingSchool/editDeleteDrivingSchool/edit-school-popup/edit-school-popup.component';
import { DeleteSchoolPopupComponent } from './components/drivingSchool/editDeleteDrivingSchool/delete-school-popup/delete-school-popup.component';
import { StudentsHomeComponent } from './components/drivingSchool/students/students-home/students-home.component';
import { AddStudentsPopupComponent } from './components/drivingSchool/students/add-students-popup/add-students-popup.component';
import { EditStudentPopupComponent } from './components/drivingSchool/students/edit-student-popup/edit-student-popup.component';
import { RemoveStudentPopupComponent } from './components/drivingSchool/students/remove-student-popup/remove-student-popup.component';
import { GenerateLoginCodePopupComponent } from './components/drivingSchool/students/generate-login-code-popup/generate-login-code-popup.component';
import { GenerateLoginCodeInstructorsPopupComponent } from './components/drivingSchool/instructors/generate-login-code-instructors-popup/generate-login-code-instructors-popup.component';
import { CourseRoundsComponent } from './components/drivingSchool/courseRounds/course-rounds/course-rounds.component';
import { RemoveCourseRoundPopupComponent } from './components/drivingSchool/courseRounds/remove-course-round-popup/remove-course-round-popup.component';
import { RemoveStudentCoursePopupComponent } from './components/drivingSchool/courseRounds/remove-student-course-popup/remove-student-course-popup.component';
import { EditCourseRoundPopupComponent } from './components/drivingSchool/courseRounds/edit-course-round-popup/edit-course-round-popup.component';
import { AddCourseRoundPopupComponent } from './components/drivingSchool/courseRounds/add-course-round-popup/add-course-round-popup.component';
import { AddStudentCoursePopupComponent } from './components/drivingSchool/courseRounds/add-student-course-popup/add-student-course-popup.component';
import { DrivingSchoolMenuComponent } from './components/drivingSchool/drivingSchoolMenu/driving-school-menu/driving-school-menu.component';
import { HomePageForInstructorComponent } from './components/instructorPage/homePageForInstructor/home-page-for-instructor/home-page-for-instructor.component';
import { CalendarHomePageForInstructorComponent } from './components/instructorPage/homePageForInstructor/calendarHomePageForInstructor/calendar-home-page-for-instructor/calendar-home-page-for-instructor.component';
import { MainCalendarForInstructorComponent } from './components/instructorPage/mainCalendarForInstructor/main-calendar-for-instructor/main-calendar-for-instructor.component';
import { StudentsForInstructorComponent } from './components/instructorPage/studentsForInstructor/students-for-instructor/students-for-instructor.component';
import { MainCalendarDaysForInstructorComponent } from './components/instructorPage/mainCalendarForInstructor/main-calendar-days-for-instructor/main-calendar-days-for-instructor.component';
import { CourseRoundsForInstructorComponent } from './components/instructorPage/courseRoundsForInstructor/course-rounds-for-instructor/course-rounds-for-instructor.component';
import { InformationForInstructorsComponent } from './components/instructorPage/informationForInstructors/information-for-instructors/information-for-instructors.component';
import { ShowInformationForInstructorsPopupComponent } from './components/instructorPage/informationForInstructors/show-information-for-instructors-popup/show-information-for-instructors-popup.component';
import { ForumForInstructorComponent } from './components/instructorPage/forumForInstructor/forum-for-instructor/forum-for-instructor.component';
import { AnswerQuestionForInstructorPopupComponent } from './components/instructorPage/forumForInstructor/answer-question-for-instructor-popup/answer-question-for-instructor-popup.component';
import { AskQuestionForInstructorPopupComponent } from './components/instructorPage/forumForInstructor/ask-question-for-instructor-popup/ask-question-for-instructor-popup.component';
import { DeleteQuestionForInstructorPopupComponent } from './components/instructorPage/forumForInstructor/delete-question-for-instructor-popup/delete-question-for-instructor-popup.component';
import { DeleteReplyForInstructorPopupComponent } from './components/instructorPage/forumForInstructor/delete-reply-for-instructor-popup/delete-reply-for-instructor-popup.component';
import { AboutDrivingSchoolForInstructorComponent } from './components/instructorPage/aboutDrivingSchoolForInstructor/about-driving-school-for-instructor/about-driving-school-for-instructor.component';
import { InstructorMenuComponent } from './components/instructorPage/instructorMenu/instructor-menu/instructor-menu.component';
import { ShowDeleteForInstructorComponent } from './components/instructorPage/showDeleteForInstructor/show-delete-for-instructor/show-delete-for-instructor.component';
import { ShowForInstructorPopupComponent } from './components/instructorPage/showDeleteForInstructor/show-for-instructor-popup/show-for-instructor-popup.component';
import { DeleteForInstructorPopupComponent } from './components/instructorPage/showDeleteForInstructor/delete-for-instructor-popup/delete-for-instructor-popup.component';
import { HomePageForStudentComponent } from './components/studentPage/homePageForStudent/home-page-for-student/home-page-for-student.component';
import { MainCalendarForStudentComponent } from './components/studentPage/mainCalendarForStudent/main-calendar-for-student/main-calendar-for-student.component';
import { MainCalendarDaysForStudentComponent } from './components/studentPage/mainCalendarForStudent/main-calendar-days-for-student/main-calendar-days-for-student.component';
import { InstructorsForStudentComponent } from './components/studentPage/instructorsForStudent/instructors-for-student/instructors-for-student.component';
import { ForumForStudentComponent } from './components/studentPage/forumForStudent/forum-for-student/forum-for-student.component';
import { AnswerQuestionForStudentPopupComponent } from './components/studentPage/forumForStudent/answer-question-for-student-popup/answer-question-for-student-popup.component';
import { AskQuestionForStudentPopupComponent } from './components/studentPage/forumForStudent/ask-question-for-student-popup/ask-question-for-student-popup.component';
import { DeleteQuestionForStudentPopupComponent } from './components/studentPage/forumForStudent/delete-question-for-student-popup/delete-question-for-student-popup.component';
import { DeleteReplyForStudentPopupComponent } from './components/studentPage/forumForStudent/delete-reply-for-student-popup/delete-reply-for-student-popup.component';
import { InformationForStudentsComponent } from './components/studentPage/informationForStudents/information-for-students/information-for-students.component';
import { ShowInformationForStudentsPopupComponent } from './components/studentPage/informationForStudents/show-information-for-students-popup/show-information-for-students-popup.component';
import { ShowDeleteForStudentComponent } from './components/studentPage/showDeleteForStudent/show-delete-for-student/show-delete-for-student.component';
import { DeleteForStudentPopupComponent } from './components/studentPage/showDeleteForStudent/delete-for-student-popup/delete-for-student-popup.component';
import { ShowForStudentPopupComponent } from './components/studentPage/showDeleteForStudent/show-for-student-popup/show-for-student-popup.component';
import { AboutDrivingSchoolForStudentComponent } from './components/studentPage/aboutDrivingSchoolForStudent/about-driving-school-for-student/about-driving-school-for-student.component';
import { StudentMenuComponent } from './components/studentPage/studentMenu/student-menu/student-menu.component';
import { InstuctorsCalendarForStudentComponent } from './components/studentPage/instructorsForStudent/instuctorsCalendarForStudent/instuctors-calendar-for-student/instuctors-calendar-for-student.component';
import { InstuctorsCalendarDaysForStudentComponent } from './components/studentPage/instructorsForStudent/instuctorsCalendarForStudent/instuctors-calendar-days-for-student/instuctors-calendar-days-for-student.component';
import { CalendarHomePageForStudentComponent } from './components/studentPage/homePageForStudent/calendarHomePageForStudent/calendar-home-page-for-student/calendar-home-page-for-student.component';
import { LessonsHoursPopupComponent } from './components/drivingSchool/courseRounds/lessons-hours-popup/lessons-hours-popup.component';
import { LessonsHoursInstructorPopupComponent } from './components/instructorPage/courseRoundsForInstructor/lessons-hours-instructor-popup/lessons-hours-instructor-popup.component';
import { TokenInterceptor } from './interceptors/token.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    RegisterSchoolComponent,
    LoginComponent,
    RegisterComponent,
    RegisterStudentComponent,
    RegisterInstructorComponent,

    HomePageComponent,
    InstructorsHomePageComponent,
    InstructorCalendarComponent,
    InstructorCalendarDayComponent,
    TransformHourPipe,
    SaveStudentCalendarPopupComponent,
    TransformStudentPipe,
    RemoveStudentCalendarPopupComponent,
    TransformFreeHoursPipe,
    MainCalendarComponent,
    MainCalendarDayComponent,
    SaveStudentMainCalendarPopupComponent,
    RemoveStudentMainCalendarPopupComponent,
    FreeDaysInstructorPopupComponent,
    RomoveFreeDaysCalendarPopupComponent,
    TransformTypeOfAbsencePipe,
    TransformLengthDisplayedTextPipe,
    TransformDatePipe,
    ForumComponent,
    AskQuestionPopupComponent,
    AnswerQuestionPopupComponent,
    DeleteQuestionPopupComponent,
    DeleteReplyPopupComponent,
    SettingsComponent,
    InformationStudentsInstructorsComponent,
    DeleteSingleDaysPopupComponent,
    DeleteInformationPopupComponent,
    ShowInformationPopupComponent,
    AddInformationPopupComponent,
    TransformInformationPipe,
    AboutDrivingSchoolComponent,
    EditInformationPopupComponent,
    AddInstructorPopupComponent,
    EditInstructorPopupComponent,
    RemoveInstructorPopupComponent,
    EditDeleteSchoolComponent,
    EditSchoolPopupComponent,
    DeleteSchoolPopupComponent,
    StudentsHomeComponent,
    AddStudentsPopupComponent,
    EditStudentPopupComponent,
    RemoveStudentPopupComponent,
    GenerateLoginCodePopupComponent,
    GenerateLoginCodeInstructorsPopupComponent,
    CourseRoundsComponent,
    RemoveCourseRoundPopupComponent,
    RemoveStudentCoursePopupComponent,
    EditCourseRoundPopupComponent,
    AddCourseRoundPopupComponent,
    AddStudentCoursePopupComponent,
    DrivingSchoolMenuComponent,

    HomePageForInstructorComponent,
    CalendarHomePageForInstructorComponent,
    MainCalendarForInstructorComponent,
    StudentsForInstructorComponent,
    MainCalendarDaysForInstructorComponent,
    CourseRoundsForInstructorComponent,
    InformationForInstructorsComponent,
    ShowInformationForInstructorsPopupComponent,
    ForumForInstructorComponent,
    AnswerQuestionForInstructorPopupComponent,
    AskQuestionForInstructorPopupComponent,
    DeleteQuestionForInstructorPopupComponent,
    DeleteReplyForInstructorPopupComponent,
    AboutDrivingSchoolForInstructorComponent,
    InstructorMenuComponent,
    ShowDeleteForInstructorComponent,
    ShowForInstructorPopupComponent,
    DeleteForInstructorPopupComponent,
    HomePageForStudentComponent,
    MainCalendarForStudentComponent,
    MainCalendarDaysForStudentComponent,
    InstructorsForStudentComponent,
    ForumForStudentComponent,
    AnswerQuestionForStudentPopupComponent,
    AskQuestionForStudentPopupComponent,
    DeleteQuestionForStudentPopupComponent,
    DeleteReplyForStudentPopupComponent,
    InformationForStudentsComponent,
    ShowInformationForStudentsPopupComponent,
    ShowDeleteForStudentComponent,
    DeleteForStudentPopupComponent,
    ShowForStudentPopupComponent,
    AboutDrivingSchoolForStudentComponent,
    StudentMenuComponent,
    InstuctorsCalendarForStudentComponent,
    InstuctorsCalendarDaysForStudentComponent,
    CalendarHomePageForStudentComponent,
    LessonsHoursPopupComponent,
    LessonsHoursInstructorPopupComponent,
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
