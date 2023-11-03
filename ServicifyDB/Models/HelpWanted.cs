using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ServicifyDB.Models
{
    [Table("help_wanted", Schema = "servicify")]
    public class HelpWanted
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("user_id")]
        [Required]
        public int UserId { get; set; }

        [Column("content")]
        [Required]
        public string Content { get; set; }

        [Column("creation_date")]
        [Required]
        public DateTime creationDate { get; set; }
        
        [NotMapped]
        public bool Flagged { get; set; }

        [Column("skillset")]
        public int SkillSet { get; set; }

        [Column("rate")]
        public int expectedRate { get; set; }

        [ForeignKey(nameof(UserId))]
        public User User { get; set; }
    }
}
