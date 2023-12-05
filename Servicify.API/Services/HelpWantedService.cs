using ServicifyDB.Models;
using ServicifyDB.Repository;
using System.Reflection;

namespace Servicify.API.Services
{
    public class HelpWantedService
    {
        private readonly IRepository<HelpWanted> helpWantedRepository;

        public HelpWantedService(IRepository<HelpWanted> helpWantedRepository)
        {
            this.helpWantedRepository = helpWantedRepository;
        }

        public HelpWanted Create(HelpWanted helpWanted)
        {
            HelpWanted newHelpWanted = new()
            {
                userId = helpWanted.userId,
                postDate = DateTime.UtcNow,
                postContent = helpWanted.postContent,
                skillSet = helpWanted.skillSet,
                expectedRate = helpWanted.expectedRate,
            };

            return helpWantedRepository.Create(newHelpWanted);
        }

        public IEnumerable<HelpWanted> GetAll(Dictionary<string, string> filterParameters)
        {
            IQueryable<HelpWanted> queryable = helpWantedRepository.Get();

            if (filterParameters.ContainsKey("postContent"))
            {
                queryable = queryable.Where(x => x.postContent.Contains(filterParameters["postContent"]));
            }

            if (filterParameters.ContainsKey("skillSet"))
            {
                queryable = queryable.Where(x => x.skillSet == (Skillset) int.Parse(filterParameters["skillSet"]));
            }

            if (filterParameters.ContainsKey("userName"))
            {
                queryable = queryable.Where(x => x.user.UserName != null && x.user.UserName.Contains(filterParameters["userName"]));
            }

            if (filterParameters.ContainsKey("expectedRate"))
            {
                queryable = queryable.Where(x => x.expectedRate <= int.Parse(filterParameters["expectedRate"]));
            }

            if (filterParameters.ContainsKey("zip"))
            {
                queryable = queryable.Where(x => x.user.Zip != null && x.user.Zip.Contains(filterParameters["expectedRate"]));
            }

            return queryable.ToList();
        }

        public HelpWanted Update(int id, HelpWanted helpWanted)
        {
            HelpWanted dbHelpWanted = helpWantedRepository.Get().Where(x => x.id == id).First()
                ?? throw new BadHttpRequestException("Help wanted not found", 404);

            dbHelpWanted.postContent = helpWanted.postContent;
            dbHelpWanted.skillSet = helpWanted.skillSet;
            dbHelpWanted.expectedRate = helpWanted.expectedRate;
            dbHelpWanted.flagged = helpWanted.flagged;

            return helpWantedRepository.Update(dbHelpWanted);
        }

        public void Delete(int id)
        {
            HelpWanted helpWanted = helpWantedRepository.Get().Where(x => x.id == id).First();
            helpWantedRepository.Delete(helpWanted);
        }
    }
}
