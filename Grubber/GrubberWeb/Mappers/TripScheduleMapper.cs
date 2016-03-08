using GrubberApi.Models;
using GrubberWeb.ViewModels;
using System;
using System.Linq;

namespace GrubberWeb.Mappers
{
    public class TripScheduleMapper : ITripScheduleMapper
    {
        public TripSchedule ToModel(TripScheduleViewModel viewModel)
        {
            return new TripSchedule
            {
                Id = viewModel.Id,
                CarId = viewModel.CarId,
                ScheduleDateTime = Convert.ToDateTime(string.Format("{0} {1}", viewModel.ScheduleDate.ToString("MM/dd/yyyy"), viewModel.ScheduleTime)),
                TripLandMarks = viewModel.LandMarks
            };
        }

        public TripScheduleViewModel ToViewModel(TripSchedule model)
        {
            return new TripScheduleViewModel
            {
                Id = model.Id,
                CarId = model.CarId,
                ScheduleDate = Convert.ToDateTime(model.ScheduleDateTime.ToString("MM/dd/yyyy")),
                ScheduleTime = model.ScheduleDateTime.ToString("hh:mm tt"),
                LandMarks = model.TripLandMarks
            };
        }
    }
}
