using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GrubberWeb.Models
{
    public class Exam
    {
        public Guid? Id { get; set; }
        public Guid ExamineeId { get; set; }
        public DateTime SubmissionDate { get; set; }
        public DateTime ModifiedDate { get; set; }

        public ExamStatus Status { get; set; }
        public List<Question> Questions { get; set; }
    }

    public enum ExamStatus
    {
        Open = 0,
        InProgress = 1,
        Submitted = 2,
        Closed = 3
    }
}
