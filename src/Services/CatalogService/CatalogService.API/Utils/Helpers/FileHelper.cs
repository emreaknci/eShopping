﻿using CatalogService.API.Utils.Results;

namespace CatalogService.API.Utils.Helpers
{
    public class FileHelper
    {
        private static readonly string _currentDirectory = Environment.CurrentDirectory + "\\wwwroot\\";
        private static readonly string _folderName = "Images\\";

        public static Result<string> SaveImage(IFormFile file)
        {
            var uniqueFileName = $"{Guid.NewGuid()}.jpg";
            var filePath = Path.Combine("/app/images", uniqueFileName);
            using var fileStream = new FileStream(filePath, FileMode.Create);
            file.CopyTo(fileStream);
            return Result<string>.SuccessResult(uniqueFileName);

        }
        public static Result<string> Upload(IFormFile file)
        {
            var fileExists = CheckFileExists(file);
            if (!fileExists.Success)
            {
                return Result<string>.FailureResult(fileExists.Message);
            }

            var type = Path.GetExtension(file.FileName);
            var typeValid = CheckFileTypeValid(type);
            var randomName = Guid.NewGuid().ToString();

            if (!typeValid.Success)
            {
                return Result<string>.FailureResult(typeValid.Message);
            }

            CheckDirectoryExists(_currentDirectory + _folderName);
            CreateImageFile(_currentDirectory + _folderName + randomName + type, file);
            return Result<string>.SuccessResult(randomName + type);
        }
        public static Result<List<string>> UploadRange(IFormCollection files)
        {
            List<string> filePathsList = new();
            foreach (var file in files.Files)
            {
                var result = Upload(file);
                if (result.Success) filePathsList.Add(result.Data);
            }
            return filePathsList.Count > 0
                ? Result<List<string>>.SuccessResult(filePathsList)
                : Result<List<string>>.FailureResult("");
        }

        public static Result<string> Update(IFormFile newFile, string oldImagePath)
        {
            var fileExists = CheckFileExists(newFile);
            if (fileExists.Message != null)
            {
                return Result<string>.FailureResult(fileExists.Message);
            }

            var type = Path.GetExtension(newFile.FileName);
            var typeValid = CheckFileTypeValid(type);
            var randomName = Guid.NewGuid().ToString();

            if (typeValid.Message != null)
            {
                return Result<string>.FailureResult(typeValid.Message);
            }

            var x = (_currentDirectory + oldImagePath).Replace("/", "\\");
            DeleteOldImageFile((_currentDirectory + _folderName + oldImagePath).Replace("/", "\\"));
            CheckDirectoryExists(_currentDirectory + _folderName);
            CreateImageFile(_currentDirectory + _folderName + randomName + type, newFile);
            return Result<string>.SuccessResult(randomName + type);
        }

        public static Result<bool> Delete(string path)
        {
            DeleteOldImageFile((_currentDirectory + _folderName + path).Replace("/", "\\"));
            return Result<bool>.SuccessResult(true);
        }

        private static Result<bool> CheckFileExists(IFormFile file)
        {
            if (file != null && file.Length > 0)
            {
                return Result<bool>.SuccessResult(true);
            }
            return Result<bool>.FailureResult("Dosya bulunumadı.");
        }

        private static Result<bool> CheckFileTypeValid(string type)
        {
            if (type != ".jpeg" && type != ".png" && type != ".jpg")
            {
                return Result<bool>.FailureResult("Geçersiz dosya uzantısı.");
            }
            return Result<bool>.SuccessResult(true);
        }

        private static void CheckDirectoryExists(string directory)
        {
            if (!Directory.Exists(directory))
            {
                Directory.CreateDirectory(directory);
            }
        }

        private static void CreateImageFile(string directory, IFormFile file)
        {
            using FileStream fs = File.Create(directory);
            file.CopyTo(fs);
            fs.Flush();
        }

        private static void DeleteOldImageFile(string directory)
        {
            Console.WriteLine(directory);
            if (File.Exists(directory.Replace("/", "\\")))
            {
                File.Delete(directory.Replace("/", "\\"));
            }
        }
    }
}
