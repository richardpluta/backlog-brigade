using ServicifyDB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Servicify.Data.Models
{
    public class UserListing
    {
        public Listing Listing { get; set; }
        public User? User { get; set; }
    }
}
