using Microsoft.EntityFrameworkCore;
using OrderService.Application.Interfaces.Repositories;
using OrderService.Domain.SeedWork;
using OrderService.Infrastructure.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace OrderService.Infrastructure.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {

        private readonly OrderDbContext _dbContext;

        public GenericRepository(OrderDbContext dbContext)
        {
            _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        public IUnitOfWork UnitOfWork => _dbContext;

        public async Task<T> AddAsync(T entity)
        {
            await _dbContext.Set<T>().AddAsync(entity);
            return entity;
        }

        public virtual async Task<List<T>> Get(Expression<Func<T, bool>> filter = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = _dbContext.Set<T>();

            foreach (var include in includes)
            {
                query = query.Include(include);
            }

            if (filter != null)
            {
                query = query.Where(filter);
            }

            if (orderBy != null)
            {
                query = orderBy(query);
            }

            return await query.ToListAsync();
        }

        public virtual Task<List<T>> Get(Expression<Func<T, bool>> filter = null, params Expression<Func<T, object>>[] includes) => Get(filter, null, includes);

        public virtual async Task<List<T>> GetAll() => await _dbContext.Set<T>().ToListAsync();

        public virtual async Task<T> GetById(Guid id) => await _dbContext.Set<T>().FindAsync(id);


        public virtual async Task<T> GetByIdAsync(Guid id, params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = _dbContext.Set<T>();

            foreach (var include in includes)
            {
                query = query.Include(include);
            }

            return await query.FirstOrDefaultAsync(x => x.Id == id);
        }

        public virtual async Task<T> GetSingleAsync(Expression<Func<T, bool>> expression, params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = _dbContext.Set<T>();

            foreach (var include in includes)
            {
                query = query.Include(include);
            }

            return await query.Where(expression).FirstOrDefaultAsync();
        }

        public virtual T Update(T entity)
        {
            _dbContext.Set<T>().Update(entity);
            return entity;
        }
    }
}
