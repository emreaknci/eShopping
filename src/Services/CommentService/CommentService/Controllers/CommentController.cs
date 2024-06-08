using CommentService.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CommentService.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly Services.CommentService _commentService;

        public CommentController(Services.CommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpGet]
        public async Task<IActionResult> GetCommentsByProductId(int id)
        {
            var result = await _commentService.GetCommentsByProductId(id);

            if (result == null || result.Count == 0)
                return NotFound();

            return Ok(result);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddComment(CreateCommentDto dto)
        {
            dto.UserId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
            dto.UserFullName = User.FindFirstValue(ClaimTypes.Name)!;
            var hasComment=await _commentService.CheckIfUserHasCommentForThisProduct(dto.UserId, dto.ProductId);
            if (hasComment)
                return BadRequest("Bu ürüne daha önceden yorum yaptınız.");
          
            var result = await _commentService.AddComment(dto);
            return result.Id == null ? BadRequest("Hata oluştu") : Ok(result);
        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> DeleteCommentById(string id)
        {
            await _commentService.DeleteCommentById(id);
            return Ok();
        }



    }
}
