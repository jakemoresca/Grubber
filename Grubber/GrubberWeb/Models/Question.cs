using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GrubberWeb.Models
{
    public class Question
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public int Order { get; set; }
        public List<Option> Options { get; set; }
    }
}
