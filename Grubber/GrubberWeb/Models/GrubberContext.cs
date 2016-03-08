using Microsoft.Data.Entity;
using System.Collections.Generic;

namespace GrubberApi.Models
{
    public class GrubberContext : DbContext
    {
        public DbSet<CarMake> CarMakes { get; set; }
        public DbSet<Car> Cars { get; set; }
        public DbSet<TripSchedule> TripSchedules { get; set; }
        public DbSet<TripLandMark> TripLandMarks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            SetCarDefinition(modelBuilder);
            SetCarMakeDefinition(modelBuilder);
            SetTripLandMarkDefinition(modelBuilder);
            SetTripScheduleDefinition(modelBuilder);
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
        }

        private void SetTripScheduleDefinition(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TripSchedule>()
                .Property(c => c.Id)
                .IsRequired()
                .UseSqlServerIdentityColumn();

            modelBuilder.Entity<TripSchedule>()
                .Property(c => c.CarId)
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
                .Property(c => c.TripScheduleId)
                .IsRequired();

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
    }
}
