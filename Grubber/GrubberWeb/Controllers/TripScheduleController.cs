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
    public class TripScheduleController : Controller
    {
        private GrubberContext _context;
        private ITripScheduleMapper _tripScheduleMapper;
        public TripScheduleController(GrubberContext context, ITripScheduleMapper tripScheduleMapper)
        {
            _context = context;
            _tripScheduleMapper = tripScheduleMapper;
        }

        [HttpGet("api/tripschedule")]
        public TripScheduleViewModel[] Get()
        {
            var tripScheduleViewModels = new List<TripScheduleViewModel>();
            var tripSchedules = _context.TripSchedules.Include(ts => ts.TripLandMarks).ToList();
            tripSchedules.ForEach(ts =>
            {
                var tsViewModel = _tripScheduleMapper.ToViewModel(ts);
                tripScheduleViewModels.Add(tsViewModel);
            });

            return tripScheduleViewModels.ToArray();
        }

        [HttpGet("api/tripschedule/{carId}")]
        public async Task<TripScheduleViewModel[]> Get(int carId)
        {
            var tripScheduleViewModels = new List<TripScheduleViewModel>();
            var tripSchedules = await _context.TripSchedules.Include(ts => ts.TripLandMarks).Where(ts => ts.CarId == carId).ToListAsync();
            tripSchedules.ForEach(ts =>
            {
                var tsViewModel = _tripScheduleMapper.ToViewModel(ts);
                tripScheduleViewModels.Add(tsViewModel);
            });

            return tripScheduleViewModels.ToArray();
        }

        [HttpPost("api/tripschedule/")]
        public async Task<TripScheduleViewModel[]> Post([FromBody] TripScheduleViewModel[] tripSchedules)
        {
            for (int ts = 0; ts < tripSchedules.Length; ts++)
            {
                var tripSchedule = _tripScheduleMapper.ToModel(tripSchedules[ts]);

                if (tripSchedule.Id > 0)
                    _context.Update(tripSchedule);
                else
                    _context.TripSchedules.Add(tripSchedule);

                await _context.SaveChangesAsync();

                tripSchedules[ts] = _tripScheduleMapper.ToViewModel(tripSchedule);
            }

            tripSchedules = await Get(tripSchedules[0].CarId);

            return tripSchedules;
        }

        [HttpDelete("api/tripschedule/{id}")]
        public async Task<TripScheduleViewModel[]> Delete(int id)
        {
            var tripSchedule = await _context.TripSchedules.FirstOrDefaultAsync(ts => ts.Id == id);
            var carId = tripSchedule.CarId;
            _context.TripSchedules.Remove(tripSchedule);
            await _context.SaveChangesAsync();

            var tripScheduleViewModels = new List<TripScheduleViewModel>();
            var tripSchedules = await _context.TripSchedules.Include(ts => ts.TripLandMarks).Where(ts => ts.CarId == carId).ToListAsync();
            tripSchedules.ForEach(ts =>
            {
                var tsViewModel = _tripScheduleMapper.ToViewModel(ts);
                tripScheduleViewModels.Add(tsViewModel);
            });

            return tripScheduleViewModels.ToArray();
        }
    }
}
