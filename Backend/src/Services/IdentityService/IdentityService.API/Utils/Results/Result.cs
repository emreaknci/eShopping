namespace IdentityService.API.Utils.Results
{
    public class Result<T>
    {
        public T? Data { get; set; }
        public string? Message { get; set; }
        public bool Success => string.IsNullOrEmpty(Message);

        protected Result(T? data, string? message)
        {
            Data = data;
            Message = message;
        }

        public static Result<T> SuccessResult(T data)
        {
            return new Result<T>(data, null);
        }

        public static Result<T> FailureResult(string message)
        {
            return new Result<T>(default, message);
        }
    }
}
