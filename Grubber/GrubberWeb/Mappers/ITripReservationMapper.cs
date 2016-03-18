using GrubberApi.Models;
using GrubberWeb.Models;
using GrubberWeb.ViewModels;

namespace GrubberWeb.Mappers
{
    public interface ITripReservationMapper
    {
        TripReservation ToModel(TripReservationViewModel viewModel);
        TripReservationViewModel ToViewModel(TripReservation model, bool includeTripSchedule = false);

        BatchTripReservation ToModel(BatchTripReservationViewModel viewModel);
        BatchTripReservationViewModel ToViewModel(BatchTripReservation model);
    }
}