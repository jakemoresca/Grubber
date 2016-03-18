using GrubberApi.Models;
using GrubberWeb.ViewModels;

namespace GrubberWeb.Mappers
{
    public interface ITripScheduleMapper
    {
        TripSchedule ToModel(TripScheduleViewModel viewModel);
        TripScheduleViewModel ToViewModel(TripSchedule model, bool includeReservation = false);

        TripLandMark ToModel(TripLandMarkViewModel viewModel);
        TripLandMarkViewModel ToViewModel(TripLandMark model);
    }
}