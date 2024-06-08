namespace IdentityService.API.Models
{
    public class BaseEntity
    {
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedDate { get; set; }
        public bool Status { get; set; } = true;
        public bool IsDeleted { get; set; } = false;
    }
}
