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
        public int Id { get; set; }

        [Column("post_user")]
        [Required]
        public int postUser { get; set; }

        [Column("reviewed_user")]
        [Required]
        public int reviewedUser { get; set; }

        [Column("post_date")]
        [Required]
        public DateTime postDate { get; set; }

        [Column("post_content")]
        [Required]
        public string postContent { get; set; }
        
        [NotMapped]
        public bool Flagged { get; set; }
        
        [Column("reply_comment")]
        [Required]
        public string replyComment { get; set; }

        [ForeignKey(nameof(postUser))]
        public User PostUser { get; set; }

        [ForeignKey(nameof(reviewedUser))]
        public User ReviewedUser { get; set; }
    }
}
