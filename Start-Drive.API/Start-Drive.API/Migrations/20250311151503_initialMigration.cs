using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Start_Drive.API.Migrations
{
    /// <inheritdoc />
    public partial class initialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Login",
                columns: table => new
                {
                    Email = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SchoolOrStudent = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Login", x => x.Email);
                });

            migrationBuilder.CreateTable(
                name: "RegisterSchools",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AccountNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BreakBetweenRides = table.Column<double>(type: "float", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RegisterSchools", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ADrivingSchools",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DrivingSchoolId = table.Column<int>(type: "int", nullable: false),
                    AboutText = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ADrivingSchools", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ADrivingSchools_RegisterSchools_DrivingSchoolId",
                        column: x => x.DrivingSchoolId,
                        principalTable: "RegisterSchools",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CourseRounds",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DrivingSchoolId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    From = table.Column<DateTime>(type: "datetime2", nullable: false),
                    To = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseRounds", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CourseRounds_RegisterSchools_DrivingSchoolId",
                        column: x => x.DrivingSchoolId,
                        principalTable: "RegisterSchools",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GeneratedRegistrationCodes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DrivingSchoolId = table.Column<int>(type: "int", nullable: false),
                    DrivingSchoolEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PersonType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PersonId = table.Column<int>(type: "int", nullable: false),
                    PersonEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GeneratedCode = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GeneratedRegistrationCodes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GeneratedRegistrationCodes_RegisterSchools_DrivingSchoolId",
                        column: x => x.DrivingSchoolId,
                        principalTable: "RegisterSchools",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Informations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DrivingSchoolId = table.Column<int>(type: "int", nullable: false),
                    ForWhom = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Info = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Informations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Informations_RegisterSchools_DrivingSchoolId",
                        column: x => x.DrivingSchoolId,
                        principalTable: "RegisterSchools",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Instructors",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DrivingSchoolId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PlaceOfBirth = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Instructors", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Instructors_RegisterSchools_DrivingSchoolId",
                        column: x => x.DrivingSchoolId,
                        principalTable: "RegisterSchools",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OpenCloses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DrivingSchoolId = table.Column<int>(type: "int", nullable: false),
                    DayOfTheWeek = table.Column<int>(type: "int", nullable: false),
                    IsOpen = table.Column<bool>(type: "bit", nullable: false),
                    FirstHour = table.Column<double>(type: "float", nullable: false),
                    LastHour = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OpenCloses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OpenCloses_RegisterSchools_DrivingSchoolId",
                        column: x => x.DrivingSchoolId,
                        principalTable: "RegisterSchools",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Questionss",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DrivingSchoolId = table.Column<int>(type: "int", nullable: false),
                    PersonId = table.Column<int>(type: "int", nullable: false),
                    AskedQuestion = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateAdded = table.Column<DateTime>(type: "datetime2", nullable: false),
                    QuestionText = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questionss", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Questionss_RegisterSchools_DrivingSchoolId",
                        column: x => x.DrivingSchoolId,
                        principalTable: "RegisterSchools",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SingleCloses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DrivingSchoolId = table.Column<int>(type: "int", nullable: false),
                    DateCloseKey = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OpenCloseValue = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SingleCloses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SingleCloses_RegisterSchools_DrivingSchoolId",
                        column: x => x.DrivingSchoolId,
                        principalTable: "RegisterSchools",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Students",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DrivingSchoolId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PlaceOfBirth = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Students", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Students_RegisterSchools_DrivingSchoolId",
                        column: x => x.DrivingSchoolId,
                        principalTable: "RegisterSchools",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CourseRoundsStudentsIds",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdDrivingSchool = table.Column<int>(type: "int", nullable: false),
                    CourseRoundsModelId = table.Column<int>(type: "int", nullable: false),
                    CourseRoundStudentId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseRoundsStudentsIds", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CourseRoundsStudentsIds_CourseRounds_CourseRoundsModelId",
                        column: x => x.CourseRoundsModelId,
                        principalTable: "CourseRounds",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "InstructorAbsences",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdDrivingSchool = table.Column<int>(type: "int", nullable: false),
                    InstructorId = table.Column<int>(type: "int", nullable: false),
                    DateAbsenceKey = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ReasonAbsenceValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InstructorAbsences", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InstructorAbsences_Instructors_InstructorId",
                        column: x => x.InstructorId,
                        principalTable: "Instructors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StudentsHourDrives",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DrivingSchoolId = table.Column<int>(type: "int", nullable: false),
                    StudentId = table.Column<int>(type: "int", nullable: false),
                    InstructorId = table.Column<int>(type: "int", nullable: false),
                    DateAddedDrive = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MainHourFrom = table.Column<double>(type: "float", nullable: false),
                    MainHourTo = table.Column<double>(type: "float", nullable: false),
                    Color = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentsHourDrives", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StudentsHourDrives_Instructors_InstructorId",
                        column: x => x.InstructorId,
                        principalTable: "Instructors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StudentsHourDrives_RegisterSchools_DrivingSchoolId",
                        column: x => x.DrivingSchoolId,
                        principalTable: "RegisterSchools",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Answerss",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DrivingSchoolId = table.Column<int>(type: "int", nullable: false),
                    QuestionsId = table.Column<int>(type: "int", nullable: false),
                    PersonId = table.Column<int>(type: "int", nullable: false),
                    WhoReplied = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateAdded = table.Column<DateTime>(type: "datetime2", nullable: false),
                    AnswerText = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Answerss", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Answerss_Questionss_QuestionsId",
                        column: x => x.QuestionsId,
                        principalTable: "Questionss",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ADrivingSchools_DrivingSchoolId",
                table: "ADrivingSchools",
                column: "DrivingSchoolId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Answerss_QuestionsId",
                table: "Answerss",
                column: "QuestionsId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseRounds_DrivingSchoolId",
                table: "CourseRounds",
                column: "DrivingSchoolId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseRoundsStudentsIds_CourseRoundsModelId",
                table: "CourseRoundsStudentsIds",
                column: "CourseRoundsModelId");

            migrationBuilder.CreateIndex(
                name: "IX_GeneratedRegistrationCodes_DrivingSchoolId",
                table: "GeneratedRegistrationCodes",
                column: "DrivingSchoolId");

            migrationBuilder.CreateIndex(
                name: "IX_Informations_DrivingSchoolId",
                table: "Informations",
                column: "DrivingSchoolId");

            migrationBuilder.CreateIndex(
                name: "IX_InstructorAbsences_InstructorId",
                table: "InstructorAbsences",
                column: "InstructorId");

            migrationBuilder.CreateIndex(
                name: "IX_Instructors_DrivingSchoolId",
                table: "Instructors",
                column: "DrivingSchoolId");

            migrationBuilder.CreateIndex(
                name: "IX_OpenCloses_DrivingSchoolId",
                table: "OpenCloses",
                column: "DrivingSchoolId");

            migrationBuilder.CreateIndex(
                name: "IX_Questionss_DrivingSchoolId",
                table: "Questionss",
                column: "DrivingSchoolId");

            migrationBuilder.CreateIndex(
                name: "IX_SingleCloses_DrivingSchoolId",
                table: "SingleCloses",
                column: "DrivingSchoolId");

            migrationBuilder.CreateIndex(
                name: "IX_Students_DrivingSchoolId",
                table: "Students",
                column: "DrivingSchoolId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentsHourDrives_DrivingSchoolId",
                table: "StudentsHourDrives",
                column: "DrivingSchoolId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentsHourDrives_InstructorId",
                table: "StudentsHourDrives",
                column: "InstructorId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ADrivingSchools");

            migrationBuilder.DropTable(
                name: "Answerss");

            migrationBuilder.DropTable(
                name: "CourseRoundsStudentsIds");

            migrationBuilder.DropTable(
                name: "GeneratedRegistrationCodes");

            migrationBuilder.DropTable(
                name: "Informations");

            migrationBuilder.DropTable(
                name: "InstructorAbsences");

            migrationBuilder.DropTable(
                name: "Login");

            migrationBuilder.DropTable(
                name: "OpenCloses");

            migrationBuilder.DropTable(
                name: "SingleCloses");

            migrationBuilder.DropTable(
                name: "Students");

            migrationBuilder.DropTable(
                name: "StudentsHourDrives");

            migrationBuilder.DropTable(
                name: "Questionss");

            migrationBuilder.DropTable(
                name: "CourseRounds");

            migrationBuilder.DropTable(
                name: "Instructors");

            migrationBuilder.DropTable(
                name: "RegisterSchools");
        }
    }
}
