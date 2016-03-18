using System;
using System.Linq;
using GrubberWeb.Models;
using GrubberWeb.ViewModels;

namespace GrubberWeb.Mappers
{
    public class TripReservationMapper : ITripReservationMapper
    {
        public BatchTripReservation ToModel(BatchTripReservationViewModel viewModel)
        {
            return new BatchTripReservation
            {
                Id = viewModel.Id,
                UserId = viewModel.UserId,
                AcceptedTripReservationId = viewModel.AcceptedTripReservationId,
                Reservations = viewModel.Reservations.Select(r => ToModel(r)).ToList()
            };
        }

        public TripReservation ToModel(TripReservationViewModel viewModel)
        {
            return new TripReservation
            {
                Id = viewModel.Id,
                UserId = viewModel.UserId,
                Status = (ReservationStatus)viewModel.Status,
                TripScheduleId = viewModel.TripScheduleId,
                TripStart = viewModel.TripStart,
                TripStartLat = viewModel.TripStartLat,
                TripStartLng = viewModel.TripStartLng,
                TripTo = viewModel.TripTo,
                TripToLat = viewModel.TripToLat,
                TripToLng = viewModel.TripToLng
            };
        }

        public BatchTripReservationViewModel ToViewModel(BatchTripReservation model)
        {
            return new BatchTripReservationViewModel
            {
                Id = model.Id,
                UserId = model.UserId,
                AcceptedTripReservationId = model.AcceptedTripReservationId,
                Reservations = model.Reservations.Select(r => ToViewModel(r)).ToList()
            };
        }

        public TripReservationViewModel ToViewModel(TripReservation model, bool includeTripSchedule = false)
        {
            return new TripReservationViewModel
            {
                Id = model.Id,
                UserId = model.UserId,
                Status = (int)model.Status,
                TripScheduleId = model.TripScheduleId,
                TripStart = model.TripStart,
                TripStartLat = model.TripStartLat,
                TripStartLng = model.TripStartLng,
                TripTo = model.TripTo,
                TripToLat = model.TripToLat,
                TripToLng = model.TripToLng
            };
        }
    }
}
