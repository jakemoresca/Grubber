using System;
using System.Collections.Generic;
using Microsoft.Data.Entity.Migrations;

namespace GrubberWeb.Migrations
{
    public partial class AddUserReferenceToBatchTripReservationTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "BatchTripReservation",
                nullable: true);
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
                name: "FK_BatchTripReservation_ApplicationUser_UserId",
                table: "BatchTripReservation",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
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
            migrationBuilder.DropForeignKey(name: "FK_BatchTripReservation_ApplicationUser_UserId", table: "BatchTripReservation");
            migrationBuilder.DropForeignKey(name: "FK_TripReservation_TripSchedule_TripScheduleId", table: "TripReservation");
            migrationBuilder.DropForeignKey(name: "FK_IdentityRoleClaim<string>_IdentityRole_RoleId", table: "AspNetRoleClaims");
            migrationBuilder.DropForeignKey(name: "FK_IdentityUserClaim<string>_ApplicationUser_UserId", table: "AspNetUserClaims");
            migrationBuilder.DropForeignKey(name: "FK_IdentityUserLogin<string>_ApplicationUser_UserId", table: "UserLogin");
            migrationBuilder.DropForeignKey(name: "FK_IdentityUserRole<string>_IdentityRole_RoleId", table: "UserRole");
            migrationBuilder.DropForeignKey(name: "FK_IdentityUserRole<string>_ApplicationUser_UserId", table: "UserRole");
            migrationBuilder.DropColumn(name: "UserId", table: "BatchTripReservation");
            migrationBuilder.AddForeignKey(
                name: "FK_Car_CarMake_MakeId",
                table: "Car",
                column: "MakeId",
                principalTable: "CarMake",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_Car_ApplicationUser_UserId",
                table: "Car",
                column: "UserId",
                principalTable: "User",
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
                name: "FK_TripSchedule_ApplicationUser_UserId",
                table: "TripSchedule",
                column: "UserId",
                principalTable: "User",
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
