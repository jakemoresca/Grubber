using GrubberWeb.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Data.Entity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.OptionsModel;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GrubberApi.Models
{
    public class GrubberContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<CarMake> CarMakes { get; set; }
        public DbSet<Car> Cars { get; set; }
        public DbSet<TripSchedule> TripSchedules { get; set; }
        public DbSet<TripLandMark> TripLandMarks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            SetUserDefinition(modelBuilder);
            SetCarDefinition(modelBuilder);
            SetCarMakeDefinition(modelBuilder);
            SetTripLandMarkDefinition(modelBuilder);
            SetTripScheduleDefinition(modelBuilder);
            SetReservationDefinition(modelBuilder);
        }

        private void SetUserDefinition(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure Asp Net Identity Tables
            modelBuilder.Entity<ApplicationUser>().ToTable("User");
            modelBuilder.Entity<ApplicationUser>().Property(u => u.PasswordHash).HasMaxLength(500);
            modelBuilder.Entity<ApplicationUser>().Property(u => u.PhoneNumber).HasMaxLength(50);

            modelBuilder.Entity<IdentityRole>().ToTable("Role");
            modelBuilder.Entity<IdentityUserRole<string>>().ToTable("UserRole");
            modelBuilder.Entity<IdentityUserLogin<string>>().ToTable("UserLogin");
        }

        private void SetCarDefinition(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Car>()
                .Property(c => c.Id)
                .IsRequired()
                .UseSqlServerIdentityColumn();

            modelBuilder.Entity<Car>()
                .Property(c => c.MakeId)
                .IsRequired();

            modelBuilder.Entity<Car>()
                .Property(c => c.NoOfSeats)
                .IsRequired();

            modelBuilder.Entity<Car>()
                .Property(c => c.UserId)
                .IsRequired();
        }

        private void SetTripScheduleDefinition(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TripSchedule>()
                .Property(c => c.Id)
                .IsRequired()
                .UseSqlServerIdentityColumn();

            modelBuilder.Entity<TripSchedule>()
                .Property(c => c.UserId)
                .IsRequired();

            modelBuilder.Entity<TripSchedule>()
                .Property(c => c.ScheduleDateTime)
                .IsRequired();
        }

        private void SetTripLandMarkDefinition(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TripLandMark>()
                .Property(c => c.Id)
                .IsRequired()
                .UseSqlServerIdentityColumn();

            modelBuilder.Entity<TripLandMark>()
                .Property(c => c.LandMarkName)
                .IsRequired();

            modelBuilder.Entity<TripLandMark>()
                .Property(c => c.Longitude)
                .IsRequired();

            modelBuilder.Entity<TripLandMark>()
                .Property(c => c.Latitude)
                .IsRequired();
        }

        private void SetCarMakeDefinition(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CarMake>()
                .Property(c => c.Id)
                .IsRequired()
                .UseSqlServerIdentityColumn();
        }

        private void SetReservationDefinition(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TripReservation>()
                .Property(c => c.Id)
                .IsRequired()
                .UseSqlServerIdentityColumn();

            modelBuilder.Entity<BatchTripReservation>()
                .Property(c => c.Id)
                .IsRequired()
                .UseSqlServerIdentityColumn();
        }
    }
}
