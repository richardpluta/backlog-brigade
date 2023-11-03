using Microsoft.EntityFrameworkCore.ChangeTracking;
using ServicifyDB.DBContents;

namespace ServicifyDB.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly ServicifyDbContent _context;
        
        public Repository(ServicifyDbContent context)
        {
            _context = context;
        }

        public T Create(T model)
        {
            EntityEntry<T> entityEntry = _context.Set<T>().Add(model);
            _context.SaveChanges();

            return entityEntry.Entity;
        }

        public void Delete(T model)
        {
            _context.Set<T>().Remove(model);
            _context.SaveChanges();
        }

        public IQueryable<T> Get()
        {
            IQueryable<T> entities = _context.Set<T>();

            return entities;
        }

        public T Update(T model)
        {
            EntityEntry<T> entityEntry = _context.Set<T>().Update(model);
            _context.SaveChanges();

            return entityEntry.Entity;
        }
    }
}
