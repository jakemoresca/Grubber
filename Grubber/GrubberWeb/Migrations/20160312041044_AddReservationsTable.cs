using System;
using System.Collections.Generic;
using Microsoft.Data.Entity.Migrations;
using Microsoft.Data.Entity.Metadata;

namespace GrubberWeb.Migrations
{
    public partial class AddReservationsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(name: "FK_Car_CarMake_MakeId", table: "Car");
            migrationBuilder.DropForeignKey(name: "FK_TripLandMark_TripSchedule_TripScheduleId", table: "TripLandMark");
            migrationBuilder.DropForeignKey(name: "FK_TripSchedule_Car_CarId", table: "TripSchedule");
            migrationBuilder.DropForeignKey(name: "FK_IdentityRoleClaim<string>_IdentityRole_RoleId", table: "AspNetRoleClaims");
            migrationBuilder.DropForeignKey(name: "FK_IdentityUserClaim<string>_ApplicationUser_UserId", table: "AspNetUserClaims");
            migrationBuilder.DropForeignKey(name: "FK_IdentityUserLogin<string>_ApplicationUser_UserId", table: "UserLogin");
            migrationBuilder.DropForeignKey(name: "FK_IdentityUserRole<string>_IdentityRole_RoleId", table: "UserRole");
            migrationBuilder.DropForeignKey(name: "FK_IdentityUserRole<string>_ApplicationUser_UserId", table: "UserRole");
            migrationBuilder.CreateTable(
                name: "BatchTripReservation",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AcceptedTripReservationId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BatchTripReservation", x => x.Id);
                });
            migrationBuilder.CreateTable(
                name: "TripReservation",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    BatchTripReservationId = table.Column<int>(nullable: true),
                    Status = table.Column<int>(nullable: false),
                    TripScheduleId = table.Column<int>(nullable: false),
                    TripStart = table.Column<string>(nullable: true),
                    TripStartLat = table.Column<int>(nullable: false),
                    TripStartLng = table.Column<int>(nullable: false),
                    TripTo = table.Column<string>(nullable: true),
                    TripToLat = table.Column<int>(nullable: false),
                    TripToLng = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TripReservation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TripReservation_BatchTripReservation_BatchTripReservationId",
                        column: x => x.BatchTripReservationId,
                        principalTable: "BatchTripReservation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TripReservation_TripSchedule_TripScheduleId",
                        column: x => x.TripScheduleId,
                        principalTable: "TripSchedule",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
            migrationBuilder.AddForeignKey(
                name: "FK_Car_CarMake_MakeId",
                table: "Car",
                column: "MakeId",
                principalTable: "CarMake",
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
                name: "FK_TripSchedule_Car_CarId",
                table: "TripSchedule",
                column: "CarId",
                principalTable: "Car",
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
            migrationBuilder.AddForeignKey(
                name: "FK_BatchTripReservation_TripReservation_AcceptedTripReservationId",
                table: "BatchTripReservation",
                column: "AcceptedTripReservationId",
                principalTable: "TripReservation",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(name: "FK_Car_CarMake_MakeId", table: "Car");
            migrationBuilder.DropForeignKey(name: "FK_TripLandMark_TripSchedule_TripScheduleId", table: "TripLandMark");
            migrationBuilder.DropForeignKey(name: "FK_TripSchedule_Car_CarId", table: "TripSchedule");
            migrationBuilder.DropForeignKey(name: "FK_IdentityRoleClaim<string>_IdentityRole_RoleId", table: "AspNetRoleClaims");
            migrationBuilder.DropForeignKey(name: "FK_IdentityUserClaim<string>_ApplicationUser_UserId", table: "AspNetUserClaims");
            migrationBuilder.DropForeignKey(name: "FK_IdentityUserLogin<string>_ApplicationUser_UserId", table: "UserLogin");
            migrationBuilder.DropForeignKey(name: "FK_IdentityUserRole<string>_IdentityRole_RoleId", table: "UserRole");
            migrationBuilder.DropForeignKey(name: "FK_IdentityUserRole<string>_ApplicationUser_UserId", table: "UserRole");
            migrationBuilder.DropForeignKey(name: "FK_TripReservation_BatchTripReservation_BatchTripReservationId", table: "TripReservation");
            migrationBuilder.DropTable("BatchTripReservation");
            migrationBuilder.DropTable("TripReservation");
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
