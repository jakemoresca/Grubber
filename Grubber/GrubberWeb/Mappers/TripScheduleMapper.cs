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
                ScheduleDateTime = Convert.ToDateTime(string.Format("{0} {1}", viewModel.ScheduleDate, viewModel.ScheduleTime)),
                TripLandMarks = viewModel.LandMarks.Select(tl => ToModel(tl)).ToList()
            };
        }

        public TripScheduleViewModel ToViewModel(TripSchedule model)
        {
            return new TripScheduleViewModel
            {
                Id = model.Id,
                CarId = model.CarId,
                ScheduleDate = model.ScheduleDateTime.ToString("MM/dd/yyyy"),
                ScheduleTime = model.ScheduleDateTime.ToString("hh:mm tt"),
                LandMarks = model.TripLandMarks.Select(tl => ToViewModel(tl)).ToList()
            };
        }

        public TripLandMark ToModel(TripLandMarkViewModel viewModel)
        {
            return new TripLandMark
            {
                Id = viewModel.Id,
                LandMarkName = viewModel.LandMarkName,
                Latitude = viewModel.Latitude,
                Longitude = viewModel.Longitude
            };
        }

        public TripLandMarkViewModel ToViewModel(TripLandMark model)
        {
            return new TripLandMarkViewModel
            {
                Id = model.Id,
                LandMarkName = model.LandMarkName,
                Latitude = model.Latitude,
                Longitude = model.Longitude
            };
        }
    }
}
