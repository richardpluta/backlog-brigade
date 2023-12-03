using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ServicifyDB.Models
{
    [Table("help_wanted", Schema = "servicify")]
    public class HelpWanted
    {
        [Key]
        [Column("id")]
        public int id { get; set; }

        [Column("user_id")]
        [Required]
        public int userId { get; set; }

        [Column("content")]
        [Required]
        public string postContent { get; set; }

        [Column("creation_date")]
        [Required]
        public DateTime postDate { get; set; }
        
        [Column("flagged")]
        public bool Flagged { get; set; }

        [Column("skillset")]
        public Skillset skillSet { get; set; }

        [Column("rate")]
        public int ExpectedRate { get; set; }

        [ForeignKey(nameof(userId))]
        public User user { get; set; }
    }
}
