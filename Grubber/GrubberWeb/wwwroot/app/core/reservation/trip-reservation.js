var TripReservation = (function () {
    function TripReservation() {
    }
    return TripReservation;
})();
exports.TripReservation = TripReservation;
(function (ReservationStatus) {
    ReservationStatus[ReservationStatus["Requested"] = 0] = "Requested";
    ReservationStatus[ReservationStatus["Accepted"] = 1] = "Accepted";
    ReservationStatus[ReservationStatus["Rejected"] = 2] = "Rejected";
    ReservationStatus[ReservationStatus["OnTrip"] = 3] = "OnTrip";
    ReservationStatus[ReservationStatus["Done"] = 4] = "Done";
    ReservationStatus[ReservationStatus["AcceptedByOther"] = 5] = "AcceptedByOther";
})(exports.ReservationStatus || (exports.ReservationStatus = {}));
var ReservationStatus = exports.ReservationStatus;
//# sourceMappingURL=trip-reservation.js.map