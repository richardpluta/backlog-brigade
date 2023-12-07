using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ServicifyDB.Models
{
    [Table("listing", Schema = "servicify")]
    public class Listing
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("user_id")]
        [Required]
        public int UserId { get; set; }

        [Column("post_date")]
        [Required]
        public DateTime CreationDate { get; set; }
        
        [Column("post_content")]
        [Required]
        public string? PostContent { get; set; }

        [Column("flagged")]
        public bool? Flagged { get; set; }

        [Column("skill_set")]
        [Required]
        public Skillset SkillSet { get; set; }
        
        [Column("expected_rate")]
        [Required]
        public int ExpectedRate { get; set; }

        [ForeignKey(nameof(UserId))]
        public User User { get; set; }
    }
}
