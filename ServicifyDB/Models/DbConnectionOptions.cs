﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServicifyDB.Models
{
    public class DbConnectionOptions
    {
        public const string Key = "DBConfiguration";
        public string ConnectionString { get; set; } = String.Empty;
    }
}
