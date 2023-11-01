﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServicifyDB.Models
{
    public class Listing
    {
        public int listingID { get; set; }
        public User postUser { get; set; }
        public DateTime postDate { get; set; }
        public string postContent { get; set; }
        public bool flagged { get; set; }
        public string skillSet { get; set; }
        public int expectedRate { get; set; }
    }
}