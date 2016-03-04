using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GrubberWeb.Models
{
    public class Option
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
    }
}
