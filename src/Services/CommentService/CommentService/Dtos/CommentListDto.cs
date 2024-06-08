namespace CommentService.Dtos
{
    public record CommentListDto
    {
        public string? Id { get; set; }
        public string? Text { get; set; }
        public double Rating { get; set; }
        public int ProductId { get; set; }
        public string? UserId { get; set; }
        public string? UserFullName { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
