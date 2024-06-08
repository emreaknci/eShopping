using IdentityService.API.Models;
using IdentityService.API.Utils.Security.Hashing;

namespace IdentityService.API.Context
{
    public class SeedData
    {
        public static IEnumerable<User> Users()
        {
            HashingHelper.CreatePasswordHash("123456", out var hash, out var salt);

            return new List<User>
           {
               new User
               {
                   Id = 1,
                   FirstName = "Admin",
                   LastName = "",
                   Email = "admin@admin.com",
                   PasswordHash = hash,
                   PasswordSalt = salt,
                   Role = Role.Admin
               },
               new User
               {
                   Id = 2,
                   FirstName = "Emre",
                   LastName = "Akıncı",
                   Email = "emreakinci696@gmail.com",
                   PasswordHash = hash,
                   PasswordSalt = salt,
                   Role = Role.Admin
               },
               new User
               {
                   Id = 3,
                   FirstName = "Yunus Emre",
                   LastName = "Akıncı",
                   Email = "yunus.akinci1@ogr.sakarya.edu.tr",
                   PasswordHash = hash,
                   PasswordSalt = salt,
                   Role = Role.Admin
               },
               new User
               {
                   Id = 4,
                   FirstName = "Ali",
                   LastName = "Koç",
                   Email = "alikoc@example.com",
                   PasswordHash = hash,
                   PasswordSalt = salt,
                   Role = Role.User
               },
               new User
               {
                   Id = 5,
                   FirstName = "Mehmet",
                   LastName = "Kaya",
                   Email = "mehmet.kaya@example.com",
                   PasswordHash = hash,
                   PasswordSalt = salt,
                   Role = Role.User
               },
               new User
               {
                   Id = 6,
                   FirstName = "Ayşe",
                   LastName = "Yılmaz",
                   Email = "ayseyilmaz@example.com",
                   PasswordHash = hash,
                   PasswordSalt = salt,
                   Role = Role.User
               },
               new User
               {
                   Id = 7,
                   FirstName = "Emre",
                   LastName = "Demir",
                   Email = "emredemir@example.com",
                   PasswordHash = hash,
                   PasswordSalt = salt,
                   Role = Role.User
               },
               new User
               {
                   Id = 8,
                   FirstName = "Canan",
                   LastName = "Toprak",
                   Email = "canan.toprak@example.com",
                   PasswordHash = hash,
                   PasswordSalt = salt,
                   Role = Role.User
               },
               new User
               {
                   Id = 9,
                   FirstName = "Murat",
                   LastName = "Şahin",
                   Email = "murat.sahin@example.com",
                   PasswordHash = hash,
                   PasswordSalt = salt,
                   Role = Role.User
               },
               new User
               {
                   Id = 10,
                   FirstName = "Sezen",
                   LastName = "Aksu",
                   Email = "minikserce@example.com",
                   PasswordHash = hash,
                   PasswordSalt = salt,
                   Role = Role.User
               },


           };
        }
    }
}
