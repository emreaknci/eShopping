using IdentityService.API.Dtos;
using IdentityService.API.Models;
using IdentityService.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace IdentityService.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetCurrenUser()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var result = await _userService.GetByIdAsync(int.Parse(userId));

            if (!result.Success)
                return BadRequest(result);
            return Ok(result);

        }

        [HttpGet("get-all-by-role")]
        [Authorize(Roles = "Admin")]
        public IActionResult GetUsersByRole(Role role)
        {
            var result = _userService.GetAllByRole(role);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpGet("get-all-with-pagination-by-role")]
        [Authorize(Roles = "Admin")]
        public IActionResult GetUsersWithPaginationByRole(Role role, string searchText="", int pageNumber = 1, int pageSize = 10)
        {

            var result = _userService.GetUsersWithPaginationByRole(role, searchText,pageNumber, pageSize );

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }


        [HttpGet("get-by-id/{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var result = await _userService.GetByIdAsync(id);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpGet("get-by-email/{email}")]
        public async Task<IActionResult> GetUserByEmail(string email)
        {
            var result = await _userService.GetByEmailAsync(email);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUser(UpdateUserDto dto)
        {
            var result = await _userService.UpdateUserAsync(dto);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }


        [HttpDelete]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var result = await _userService.DeleteUserAsync(id);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword(ChangePasswordDto dto)
        {
            var result = await _userService.ChangePassword(dto);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }
    }
}
