using AuthenticationApi.Context;
using AuthenticationApi.Helper;
using AuthenticationApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;

namespace AuthenticationApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _authContext;
        public UserController(AppDbContext appDbContext)
        {
            _authContext = appDbContext;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] User userObj)
        {
            if(userObj == null)
            {
                return BadRequest();
            }

            var user = await _authContext.Users.FirstOrDefaultAsync(x=>x.Username == userObj.Username);
            if(user == null)
            {
                return NotFound(new {Message = "User Not Found!"});
            }

            if(!PasswordHasher.VerifyPassword(userObj.Password, user.Password))
            {
                return BadRequest(new { Message = "Password is Incorrect." });
            }

            user.Token = CreateJwt(user);

            return Ok(new
            { 
                Username = user.Username,
                Token = user.Token,
                Message = "Login Success!"
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] User userObj)
        {
            if(userObj == null)
            {
                return BadRequest();
            }

            if(await CheckUserNameExistAsync(userObj.Username))
            {
                return BadRequest(new {Message="Username Already Exist!"});
            }

            if (await CheckEmailExistAsync(userObj.Email))
            {
                return BadRequest(new {Message="Email already Exist!"});
            }

            var pass = CheckPasswordStrength(userObj.Password);

            if(!string.IsNullOrEmpty(pass))
            {
                return BadRequest(new { Message = pass.ToString() });
            }


            userObj.Password = PasswordHasher.HashPassword(userObj.Password);
            userObj.Token = CreateJwt(userObj);
            await _authContext.Users.AddAsync(userObj);
            await _authContext.SaveChangesAsync();
            return Ok(new {Message="User Registered!"});
        }

        private Task<bool> CheckUserNameExistAsync(string userName)=>
            _authContext.Users.AnyAsync(x => x.Username == userName);

        private Task<bool> CheckEmailExistAsync(string email) =>
            _authContext.Users.AnyAsync(x => x.Email == email);

        private string CheckPasswordStrength(string password)
        {
            StringBuilder sb = new StringBuilder();

            if(password.Length < 8)
            {
                sb.Append("Minimum password length should be 8"+ Environment.NewLine);

            }
            if(!(Regex.IsMatch(password, "[a-z]") && Regex.IsMatch(password,"[A-Z]") && Regex.IsMatch(password,"[0-9]") ))
            {
                sb.Append("Password should be Alphanumberic" + Environment.NewLine);
            }
            if(!Regex.IsMatch(password,"[<,>,@,!,#,$,%,^,&,*,(,),_,-,+,\\[,\\],{,},?,:,;,|,',\\,.,/,~,`,=]"))
            {
                sb.Append("Password Should contain special Characters" +Environment.NewLine);   
            }
            return sb.ToString();
        }

        private string CreateJwt(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("veryverysecret.....");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}"),
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials
            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);

            return jwtTokenHandler.WriteToken(token);
        }


        [HttpGet]
        public async Task<ActionResult<User>> GetAllUser()
        {
            return Ok(await _authContext.Users.ToListAsync());
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<User>> GetUser(string username)
        {
            var watchlistItems = await _authContext.Users.FirstOrDefaultAsync(x => x.Username == username);
            if (watchlistItems == null)
            {
                return NotFound();
            }
            return watchlistItems;
        }

        [HttpPut]
        public async Task<ActionResult<User>> update(User profile)
        {
            var book = await _authContext.Users.FirstOrDefaultAsync(x => x.Id == profile.Id);
            if (book is null)
            {
                return NotFound();
            }
            book.FirstName = profile.FirstName;
            book.LastName = profile.LastName;
         
            await _authContext.SaveChangesAsync();

            return NoContent();

        }

        [HttpPut("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordModel model)
        {
            if (model == null)
            {
                return BadRequest(new { Message = "Invalid request." });
            }

            var user = await _authContext.Users.FirstOrDefaultAsync(x => x.Username == model.Username);

            if (user == null)
            {
                return NotFound(new { Message = "User Not Found!" });
            }

            // Verify old password
            if (!PasswordHasher.VerifyPassword(model.OldPassword, user.Password))
            {
                return BadRequest(new { Message = "Old password is incorrect." });
            }

            // Check if the new password is the same as the old password
            if (PasswordHasher.VerifyPassword(model.NewPassword, user.Password))
            {
                return BadRequest(new { Message = "New password cannot be the same as the old password." });
            }

            // Check new password strength
            var passwordCheck = CheckPasswordStrength(model.NewPassword);
            if (!string.IsNullOrEmpty(passwordCheck))
            {
                return BadRequest(new { Message = passwordCheck });
            }

            // Update the password
            user.Password = PasswordHasher.HashPassword(model.NewPassword);

            _authContext.Users.Update(user);
            await _authContext.SaveChangesAsync();

            return Ok(new { Message = "Password changed successfully!" });
        }

        

    }
}

