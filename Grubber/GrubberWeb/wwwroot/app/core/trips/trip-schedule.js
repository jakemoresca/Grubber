var TripSchedule = (function () {
    function TripSchedule() {
    }
    return TripSchedule;
})();
exports.TripSchedule = TripSchedule;
(function (DayOfWeek) {
    DayOfWeek[DayOfWeek["Sunday"] = 0] = "Sunday";
    DayOfWeek[DayOfWeek["Monday"] = 1] = "Monday";
    DayOfWeek[DayOfWeek["Tuesday"] = 2] = "Tuesday";
    DayOfWeek[DayOfWeek["Wednesday"] = 3] = "Wednesday";
    DayOfWeek[DayOfWeek["Thursday"] = 4] = "Thursday";
    DayOfWeek[DayOfWeek["Friday"] = 5] = "Friday";
    DayOfWeek[DayOfWeek["Saturday"] = 6] = "Saturday";
})(exports.DayOfWeek || (exports.DayOfWeek = {}));
var DayOfWeek = exports.DayOfWeek;
(function (TripType) {
    TripType[TripType["In"] = 0] = "In";
    TripType[TripType["Out"] = 1] = "Out";
})(exports.TripType || (exports.TripType = {}));
var TripType = exports.TripType;
//# sourceMappingURL=trip-schedule.js.map