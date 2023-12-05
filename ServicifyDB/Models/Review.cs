using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServicifyDB.Models
{
    [Table("review", Schema = "servicify")]
    public class Review
    {
        [Key]
        [Column("id")]
        public int id { get; set; }

        [Column("post_user")]
        [Required]
        public int PostUserId { get; set; }

        [Column("reviewed_user")]
        [Required]
        public int ReviewedUserId { get; set; }

        [Column("post_date")]
        [Required]
        public DateTime PostDate { get; set; }

        [Column("post_content")]
        [Required]
        public string PostContent { get; set; }
        
        [Column("flagged")]
        public bool? Flagged { get; set; }
        
        [Column("reply_comment")]
        public string? ReplyComment { get; set; }

        [ForeignKey(nameof(PostUserId))]
        public User? PostUser { get; set; }

        [ForeignKey(nameof(ReviewedUserId))]
        public User? ReviewedUser { get; set; }
    }
}
