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
        public string userName { get; set; } = String.Empty;
        public string phone { get; set; } = String.Empty; //changed to string, long will chop off leading zeros, idk if area codes out there start with 0, but a dummy # of 0000000000 would be saved as 0 and could cause weird parsing issues.
        public string email { get; set; } = String.Empty;
        public string skillSet { get; set; } = String.Empty;
        public string zip { get; set; } = String.Empty; //changed to string, int will chop off any leading zeros, so zips like "01234" get saved as "1234" if this is int.
        public int userRate { get; set; }
    }
}
