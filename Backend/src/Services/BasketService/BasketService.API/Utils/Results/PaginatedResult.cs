namespace BasketService.API.Utils.Results
{
    public class PaginatedResult<T> : Result<IEnumerable<T>>
    {
        public int PageNumber { get; }
        public int PageSize { get; }
        public int TotalCount { get; }

        protected PaginatedResult(IEnumerable<T>? data, string? message, int pageNumber, int pageSize, int totalCount)
            : base(data, message)
        {
            PageNumber = pageNumber;
            PageSize = pageSize;
            TotalCount = totalCount;
        }

        public static PaginatedResult<T> SuccessResult(IEnumerable<T> data, int pageNumber, int pageSize, int totalCount)
        {
            return new PaginatedResult<T>(data, null, pageNumber, pageSize, totalCount);
        }

        public new static PaginatedResult<T> FailureResult(string message)
        {
            return new PaginatedResult<T>(null, message, 0, 0, 0);
        }
    }
}
