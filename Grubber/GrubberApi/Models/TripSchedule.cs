using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GrubberApi.Models
{
    public class TripSchedule
    {
        public int Id { get; set; }
        public Car Car { get; set; }
        public int CarId { get; set; }
        public DateTime ScheduleDateTime { get; set; }
        public IList<TripLandMark> TripLandMarks { get; set; }
    }
}
