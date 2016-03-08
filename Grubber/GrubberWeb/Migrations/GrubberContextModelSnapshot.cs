using System;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Infrastructure;
using Microsoft.Data.Entity.Metadata;
using Microsoft.Data.Entity.Migrations;
using GrubberApi.Models;

namespace GrubberWeb.Migrations
{
    [DbContext(typeof(GrubberContext))]
    partial class GrubberContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0-rc1-16348")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("GrubberApi.Models.Car", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Color");

                    b.Property<int>("MakeId");

                    b.Property<string>("Model");

                    b.Property<int>("NoOfSeats");

                    b.Property<string>("PlateNo");

                    b.HasKey("Id");
                });

            modelBuilder.Entity("GrubberApi.Models.CarMake", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.HasKey("Id");
                });

            modelBuilder.Entity("GrubberApi.Models.TripLandMark", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("LandMarkName")
                        .IsRequired();

                    b.Property<float>("Latitude");

                    b.Property<float>("Longitude");

                    b.Property<int>("TripScheduleId");

                    b.HasKey("Id");
                });

            modelBuilder.Entity("GrubberApi.Models.TripSchedule", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CarId");

                    b.Property<DateTime>("ScheduleDateTime");

                    b.HasKey("Id");
                });

            modelBuilder.Entity("GrubberApi.Models.Car", b =>
                {
                    b.HasOne("GrubberApi.Models.CarMake")
                        .WithMany()
                        .HasForeignKey("MakeId");
                });

            modelBuilder.Entity("GrubberApi.Models.TripLandMark", b =>
                {
                    b.HasOne("GrubberApi.Models.TripSchedule")
                        .WithMany()
                        .HasForeignKey("TripScheduleId");
                });

            modelBuilder.Entity("GrubberApi.Models.TripSchedule", b =>
                {
                    b.HasOne("GrubberApi.Models.Car")
                        .WithMany()
                        .HasForeignKey("CarId");
                });
        }
    }
}
