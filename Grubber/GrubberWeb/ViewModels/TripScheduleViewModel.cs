using GrubberApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GrubberWeb.ViewModels
{
    public class TripScheduleViewModel
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string ScheduleTime { get; set; }
        public string ScheduleDate { get; set; }
        public bool IsNew { get; set; }
        public IList<TripLandMarkViewModel> LandMarks { get; set; }
    }
}
