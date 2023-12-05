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
        public int Id { get; set; }

        [Column("user_type")]
        [Required]
        public UserType UserType { get; set; }

        [Column("user_name")]
        [Required]
        public string? UserName { get; set; }

        [Column("phone")]
        public string? PhoneNumber { get; set; }

        [Column("email")]
        public string? Email { get; set; }

        [Column("skillset")]
        [Required]
        public Skillset skillSet { get; set; }

        [Column("zip")]
        public string? Zip { get; set; }

        [Column("user_rate")]
        public int UserRate { get; set; }
    }
}