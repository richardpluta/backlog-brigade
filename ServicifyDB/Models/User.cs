using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServicifyDB.Models
{
    public enum UserType : int
    {
        Admin = 0,
        Client = 1,
        Professional = 2
    }

    [Table("user", Schema = "servicify")]
    public class User
    {
        [Key]
        [Column("id")]
        public int userID { get; set; }

        [Column("user_type")]
        [Required]
        public UserType userType { get; set; }  

        [Column("user_name")]
        [Required]
        public string userName { get; set; }

        [Column("phone")]
        [Required]
        public long phone { get; set; }

        [Column("email")]
        [Required]
        public string email { get; set; }

        [Column("skillset")]
        [Required]
        public Skillset skillset { get; set; }

        [Column("zip")]
        [Required]
        public int zip { get; set; }

        [Column("user_rate")]
        [Required]
        public int userRate { get; set; }
    }
}