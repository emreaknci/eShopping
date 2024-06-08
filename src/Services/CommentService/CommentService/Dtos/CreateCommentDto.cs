namespace CommentService.Dtos
{
    public record CreateCommentDto
    {
        public required string Text { get; set; }
        public required double Rating { get; set; }
        public required int ProductId { get; set; }
        public string? UserId { get; set; } = null;
        public string? UserFullName { get; set; } = null;
        public bool HideUserFullName { get; set; } = false;
    }
}
