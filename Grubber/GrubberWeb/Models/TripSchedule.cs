using GrubberWeb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GrubberApi.Models
{
    public class TripSchedule
    {
        public int Id { get; set; }
        public ApplicationUser User { get; set; }
        public string UserId { get; set; }
        public DateTime ScheduleDateTime { get; set; }
        public IList<TripLandMark> TripLandMarks { get; set; }
        public IList<TripReservation> TripReservations { get; set; }
    }
}
