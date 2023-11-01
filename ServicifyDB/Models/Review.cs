using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServicifyDB.Models
{
    public class Review
    {
        public int reviewID { get; set; }
        public User postUser { get; set; }
        public User reviewedUser { get; set; }
        public DateTime postDate { get; set; }
        public string postContent { get; set; }
        public bool flagged { get; set; }
        public string replyComment { get; set; }
    }
}
