using System.Linq;
using Microsoft.AspNet.Mvc;
using GrubberApi.Models;
using GrubberWeb.ViewModels;
using GrubberWeb.Mappers;
using System.Collections.Generic;
using Microsoft.Data.Entity;
using System.Threading.Tasks;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace GrubberApi.Controllers
{
    public class TripLandMarkController : Controller
    {
        private GrubberContext _context;
        private ITripScheduleMapper _tripScheduleMapper;
        public TripLandMarkController(GrubberContext context, ITripScheduleMapper tripScheduleMapper)
        {
            _context = context;
            _tripScheduleMapper = tripScheduleMapper;
        }

        //[HttpGet("api/tripschedule")]
        //public TripScheduleViewModel[] Get()
        //{
        //    var tripScheduleViewModels = new List<TripScheduleViewModel>();
        //    var tripSchedules = _context.TripSchedules.Include(ts => ts.TripLandMarks).ToList();
        //    tripSchedules.ForEach(ts =>
        //    {
        //        var tsViewModel = _tripScheduleMapper.ToViewModel(ts);
        //        tripScheduleViewModels.Add(tsViewModel);
        //    });

        //    return tripScheduleViewModels.ToArray();
        //}

        //[HttpGet("api/tripschedule/{carId}")]
        //public async Task<TripScheduleViewModel[]> Get(int carId)
        //{
        //    var tripScheduleViewModels = new List<TripScheduleViewModel>();
        //    var tripSchedules = await _context.TripSchedules.Include(ts => ts.TripLandMarks).Where(ts => ts.CarId == carId).ToListAsync();
        //    tripSchedules.ForEach(ts =>
        //    {
        //        var tsViewModel = _tripScheduleMapper.ToViewModel(ts);
        //        tripScheduleViewModels.Add(tsViewModel);
        //    });

        //    return tripScheduleViewModels.ToArray();
        //}

        //[HttpPost("api/tripschedule/")]
        //public async Task<TripScheduleViewModel[]> Post([FromBody] TripScheduleViewModel[] tripSchedules)
        //{
        //    for (int ts = 0; ts < tripSchedules.Length; ts++)
        //    {
        //        var tripSchedule = _tripScheduleMapper.ToModel(tripSchedules[ts]);

        //        if (tripSchedule.Id > 0)
        //            _context.Update(tripSchedule);
        //        else
        //            _context.TripSchedules.Add(tripSchedule);

        //        await _context.SaveChangesAsync();

        //        tripSchedules[ts] = _tripScheduleMapper.ToViewModel(tripSchedule);
        //    }

        //    return tripSchedules;
        //}

        [HttpDelete("api/triplandmark/{id}")]
        public async Task<TripLandMarkViewModel[]> Delete(int id)
        {
            var tripLandMark = await _context.TripLandMarks.FirstOrDefaultAsync(ts => ts.Id == id);
            var scheduleId = tripLandMark.TripScheduleId;
            _context.TripLandMarks.Remove(tripLandMark);
            await _context.SaveChangesAsync();

            var tripLandMarkViewModels = new List<TripLandMarkViewModel>();
            var tripLandMarks = await _context.TripLandMarks.Where(tl => tl.TripScheduleId == scheduleId).ToListAsync();
            tripLandMarks.ForEach(tl =>
            {
                var tlViewModel = _tripScheduleMapper.ToViewModel(tl);
                tripLandMarkViewModels.Add(tlViewModel);
            });

            return tripLandMarkViewModels.ToArray();
        }
    }
}
