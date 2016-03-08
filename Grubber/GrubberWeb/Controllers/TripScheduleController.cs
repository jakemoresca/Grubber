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

        [HttpGet("api/tripschedule/{id}")]
        public async Task<TripScheduleViewModel> Get(int id)
        {
            var tripSchedule = await _context.TripSchedules.Include(ts => ts.TripLandMarks).FirstOrDefaultAsync(ts => ts.CarId == id);
            var tripScheduleViewModel = _tripScheduleMapper.ToViewModel(tripSchedule);

            return tripScheduleViewModel;
        }
    }
}
