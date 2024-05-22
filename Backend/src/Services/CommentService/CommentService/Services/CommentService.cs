using CommentService.Dtos;
using CommentService.Models;
using CommentService.Settings;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace CommentService.Services
{
    public class CommentService
    {
        private IMongoCollection<Comment> _commentCollection;

        public CommentService(IOptions<CommentServiceDatabaseSettings> options)
        {
            var mongoClient = new MongoClient(options.Value.ConnectionString);

            var mongoDb = mongoClient.GetDatabase(options.Value.DatabaseName);

            _commentCollection = mongoDb.GetCollection<Comment>(options.Value.CommentCollectionName);
        }

        private async Task<List<CommentListDto>> GetCommentsByFilter(FilterDefinition<Comment> filter)
        {
            var comments = await _commentCollection.Find(filter).ToListAsync();

            if (comments == null || comments.Count == 0)
            {
                return new List<CommentListDto>();
            }

            return comments.Select(comment => new CommentListDto
            {
                Id = comment.Id,
                ProductId = comment.ProductId,
                CreatedAt = comment.CreatedAt,
                Rating = comment.Rating,
                Text = comment.Text,
                UserFullName = comment.GetUserFullName(),
                UserId = comment.UserId,
            }).ToList();
        }

        public Task<List<CommentListDto>> GetAllComments()
        {
            return GetCommentsByFilter(FilterDefinition<Comment>.Empty);
        }

        public Task<List<CommentListDto>> GetCommentsByProductId(int id)
        {
            var filter = Builders<Comment>.Filter.Eq(x => x.ProductId, id);
            return GetCommentsByFilter(filter);
        }

        public async Task<bool> CheckIfUserHasCommentForThisProduct(string userId, int productId)
        {
            var result = await _commentCollection
                .Find(x => x.UserId == userId && x.ProductId == productId)
                .ToListAsync();

            return result.Count > 0;
        }


        public async Task<Comment> AddComment(CreateCommentDto dto)
        {
            var newComment = new Comment
            {
                Text = dto.Text,
                ProductId = dto.ProductId,
                Rating = dto.Rating,
                UserId = dto.UserId,
                UserFullName = dto.UserFullName,
                CreatedAt = DateTime.UtcNow,
                HideUserFullName = dto.HideUserFullName
            };


            await _commentCollection.InsertOneAsync(newComment);
            newComment.UserFullName = newComment.GetUserFullName();
            return newComment;

        }

        public async Task DeleteCommentById(string id) =>
            await _commentCollection.DeleteOneAsync(x => x.Id == id);

        public async Task DeleteCommentsByProductId(int id) =>
            await _commentCollection.DeleteManyAsync(x => x.ProductId == id);

        public async Task DeleteCommentsByUserId(string id) =>
            await _commentCollection.DeleteManyAsync(x => x.UserId == id);
    }
}
