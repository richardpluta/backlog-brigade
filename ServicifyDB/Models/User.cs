using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServicifyDB.Models
{
    public class User
    {
        public int userID { get; set; }
        public UserType userType { get; set; } 
        public string userName { get; set; }
        public long phone { get; set; }
        public string email { get; set; }
        public string skillSet { get; set; }
        public int zip { get; set; }
        public int userRate { get; set; }
    }
}
