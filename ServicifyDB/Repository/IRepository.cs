
namespace ServicifyDB.Repository
{
    public interface IRepository<T> where T: class
    {
        T Create(T model);
        void Delete(T model);
        IQueryable<T> Get();
        T Update(T model);
    }
}
