using System;
using System.Collections.Generic;
using Microsoft.Data.Entity.Migrations;
using Microsoft.Data.Entity.Metadata;

namespace GrubberApi.Migrations
{
    public partial class AddCarMakeTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(name: "FK_TripLandMark_TripSchedule_TripScheduleId", table: "TripLandMark");
            migrationBuilder.DropForeignKey(name: "FK_TripSchedule_Car_CarId", table: "TripSchedule");
            migrationBuilder.CreateTable(
                name: "CarMake",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarMake", x => x.Id);
                });
            migrationBuilder.AlterColumn<string>(
                name: "LandMarkName",
                table: "TripLandMark",
                nullable: false);
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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(name: "FK_Car_CarMake_MakeId", table: "Car");
            migrationBuilder.DropForeignKey(name: "FK_TripLandMark_TripSchedule_TripScheduleId", table: "TripLandMark");
            migrationBuilder.DropForeignKey(name: "FK_TripSchedule_Car_CarId", table: "TripSchedule");
            migrationBuilder.DropTable("CarMake");
            migrationBuilder.AlterColumn<string>(
                name: "LandMarkName",
                table: "TripLandMark",
                nullable: true);
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
        }
    }
}
