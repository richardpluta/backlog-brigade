using ServicifyDB.Models;
using ServicifyDB.Repository;

namespace Servicify.API.Services
{
    public class UserService
    {
        private readonly IRepository<User> userRepository;

        public UserService(IRepository<User> userRepository)
        {
            this.userRepository = userRepository;
        }

        public User Create(User user)
        {
            return userRepository.Create(user);
        }

        public User? Get(string email)
        {
            return userRepository.Get().Where(x => x.Email == email).FirstOrDefault();
        }

        public User? GetById(int id)
        {
            return userRepository.Get().Where(x => x.Id == id).FirstOrDefault();
        }

        public IEnumerable<User> GetAll()
        {
            return userRepository.Get().ToList();
        }

        public User Update(User user)
        {
            return userRepository.Update(user);
        }

        public void Delete(int id)
        {
            User user = userRepository.Get().Where(x => x.Id == id).FirstOrDefault()
                ?? throw new BadHttpRequestException("User not found", 404);

            userRepository.Delete(user);
        }
    }
}
