using GrubberApi.Models;
using GrubberWeb.ViewModels;

namespace GrubberWeb.Mappers
{
    public interface ITripScheduleMapper
    {
        TripSchedule ToModel(TripScheduleViewModel viewModel);
        TripScheduleViewModel ToViewModel(TripSchedule model);

        TripLandMark ToModel(TripLandMarkViewModel viewModel);
        TripLandMarkViewModel ToViewModel(TripLandMark model);
    }
}