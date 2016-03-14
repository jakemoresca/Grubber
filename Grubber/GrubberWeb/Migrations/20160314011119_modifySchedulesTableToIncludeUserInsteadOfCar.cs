using System;
using System.Collections.Generic;
using Microsoft.Data.Entity.Migrations;
using Microsoft.Data.Entity.Metadata;

namespace GrubberWeb.Migrations
{
    public partial class modifySchedulesTableToIncludeUserInsteadOfCar : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(name: "FK_Car_CarMake_MakeId", table: "Car");
            migrationBuilder.DropForeignKey(name: "FK_TripLandMark_TripSchedule_TripScheduleId", table: "TripLandMark");
            migrationBuilder.DropForeignKey(name: "FK_TripSchedule_Car_CarId", table: "TripSchedule");
            migrationBuilder.DropForeignKey(name: "FK_ApplicationUser_Car_CarId", table: "User");
            migrationBuilder.DropForeignKey(name: "FK_TripReservation_TripSchedule_TripScheduleId", table: "TripReservation");
            migrationBuilder.DropForeignKey(name: "FK_IdentityRoleClaim<string>_IdentityRole_RoleId", table: "AspNetRoleClaims");
            migrationBuilder.DropForeignKey(name: "FK_IdentityUserClaim<string>_ApplicationUser_UserId", table: "AspNetUserClaims");
            migrationBuilder.DropForeignKey(name: "FK_IdentityUserLogin<string>_ApplicationUser_UserId", table: "UserLogin");
            migrationBuilder.DropForeignKey(name: "FK_IdentityUserRole<string>_IdentityRole_RoleId", table: "UserRole");
            migrationBuilder.DropForeignKey(name: "FK_IdentityUserRole<string>_ApplicationUser_UserId", table: "UserRole");
            migrationBuilder.DropColumn(name: "CarId", table: "User");
            migrationBuilder.DropColumn(name: "UserId", table: "User");
            migrationBuilder.DropColumn(name: "CarId", table: "TripSchedule");
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "TripSchedule",
                nullable: false,
                defaultValue: "");
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Car",
                nullable: false,
                defaultValue: "");
            migrationBuilder.AddForeignKey(
                name: "FK_Car_CarMake_MakeId",
                table: "Car",
                column: "MakeId",
                principalTable: "CarMake",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_Car_ApplicationUser_UserId",
                table: "Car",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_TripLandMark_TripSchedule_TripScheduleId",
                table: "TripLandMark",
                column: "TripScheduleId",
                principalTable: "TripSchedule",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_TripSchedule_ApplicationUser_UserId",
                table: "TripSchedule",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_TripReservation_TripSchedule_TripScheduleId",
                table: "TripReservation",
                column: "TripScheduleId",
                principalTable: "TripSchedule",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_IdentityRoleClaim<string>_IdentityRole_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId",
                principalTable: "Role",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_IdentityUserClaim<string>_ApplicationUser_UserId",
                table: "AspNetUserClaims",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_IdentityUserLogin<string>_ApplicationUser_UserId",
                table: "UserLogin",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_IdentityUserRole<string>_IdentityRole_RoleId",
                table: "UserRole",
                column: "RoleId",
                principalTable: "Role",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_IdentityUserRole<string>_ApplicationUser_UserId",
                table: "UserRole",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(name: "FK_Car_CarMake_MakeId", table: "Car");
            migrationBuilder.DropForeignKey(name: "FK_Car_ApplicationUser_UserId", table: "Car");
            migrationBuilder.DropForeignKey(name: "FK_TripLandMark_TripSchedule_TripScheduleId", table: "TripLandMark");
            migrationBuilder.DropForeignKey(name: "FK_TripSchedule_ApplicationUser_UserId", table: "TripSchedule");
            migrationBuilder.DropForeignKey(name: "FK_TripReservation_TripSchedule_TripScheduleId", table: "TripReservation");
            migrationBuilder.DropForeignKey(name: "FK_IdentityRoleClaim<string>_IdentityRole_RoleId", table: "AspNetRoleClaims");
            migrationBuilder.DropForeignKey(name: "FK_IdentityUserClaim<string>_ApplicationUser_UserId", table: "AspNetUserClaims");
            migrationBuilder.DropForeignKey(name: "FK_IdentityUserLogin<string>_ApplicationUser_UserId", table: "UserLogin");
            migrationBuilder.DropForeignKey(name: "FK_IdentityUserRole<string>_IdentityRole_RoleId", table: "UserRole");
            migrationBuilder.DropForeignKey(name: "FK_IdentityUserRole<string>_ApplicationUser_UserId", table: "UserRole");
            migrationBuilder.DropColumn(name: "UserId", table: "TripSchedule");
            migrationBuilder.DropColumn(name: "UserId", table: "Car");
            migrationBuilder.AddColumn<int>(
                name: "CarId",
                table: "User",
                nullable: true);
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "User",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);
            migrationBuilder.AddColumn<int>(
                name: "CarId",
                table: "TripSchedule",
                nullable: false,
                defaultValue: 0);
            migrationBuilder.AddForeignKey(
                name: "FK_Car_CarMake_MakeId",
                table: "Car",
                column: "MakeId",
                principalTable: "CarMake",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_TripLandMark_TripSchedule_TripScheduleId",
                table: "TripLandMark",
                column: "TripScheduleId",
                principalTable: "TripSchedule",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_TripSchedule_Car_CarId",
                table: "TripSchedule",
                column: "CarId",
                principalTable: "Car",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_ApplicationUser_Car_CarId",
                table: "User",
                column: "CarId",
                principalTable: "Car",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_TripReservation_TripSchedule_TripScheduleId",
                table: "TripReservation",
                column: "TripScheduleId",
                principalTable: "TripSchedule",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_IdentityRoleClaim<string>_IdentityRole_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId",
                principalTable: "Role",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_IdentityUserClaim<string>_ApplicationUser_UserId",
                table: "AspNetUserClaims",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_IdentityUserLogin<string>_ApplicationUser_UserId",
                table: "UserLogin",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_IdentityUserRole<string>_IdentityRole_RoleId",
                table: "UserRole",
                column: "RoleId",
                principalTable: "Role",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_IdentityUserRole<string>_ApplicationUser_UserId",
                table: "UserRole",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
