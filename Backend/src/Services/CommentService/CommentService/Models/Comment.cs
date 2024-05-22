using MongoDB.Bson.Serialization.Attributes;

namespace CommentService.Models
{
    public class Comment
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string? Id { get; set; }     
        public string? Text { get; set; }
        public double Rating { get; set; }
        public int ProductId { get; set; }
        public string? UserId { get; set; }
        public string? UserFullName { get; set; }
        public bool HideUserFullName { get; set; }
        public bool IsDeleted { get; set; } = false;
        public DateTime CreatedAt { get; set; }= DateTime.Now;

        public string GetUserFullName()
        {
            if (string.IsNullOrEmpty(UserFullName))
            {
                return string.Empty;
            }

            if(HideUserFullName==false)
            {
                return UserFullName;
            }

            var nameParts = UserFullName.Split(' ');
            var hiddenName = string.Empty;

            foreach (var part in nameParts)
            {
                hiddenName += part[0] + "** ";
            }

            return hiddenName.Trim();
        }
    }
}
