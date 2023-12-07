using Microsoft.EntityFrameworkCore;
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
                UserId = helpWanted.UserId,
                PostDate = DateTime.UtcNow,
                PostContent = helpWanted.PostContent,
                SkillSet = helpWanted.SkillSet,
                ExpectedRate = helpWanted.ExpectedRate,
            };

            return helpWantedRepository.Create(newHelpWanted);
        }

        public IEnumerable<HelpWanted> GetAll(Dictionary<string, string> filterParameters)
        {
            IQueryable<HelpWanted> queryable = helpWantedRepository.Get().Include(x => x.User);

            if (filterParameters.ContainsKey("postContent"))
            {
                queryable = queryable.Where(x => x.PostContent.Contains(filterParameters["postContent"]));
            }

            if (filterParameters.ContainsKey("skillSet"))
            {
                queryable = queryable.Where(x => x.SkillSet == (Skillset) int.Parse(filterParameters["skillSet"]));
            }

            if (filterParameters.ContainsKey("userName"))
            {
                queryable = queryable.Where(x => x.User.UserName != null && x.User.UserName.Contains(filterParameters["userName"]));
            }

            if (filterParameters.ContainsKey("expectedRate"))
            {
                queryable = queryable.Where(x => x.ExpectedRate <= int.Parse(filterParameters["expectedRate"]));
            }

            if (filterParameters.ContainsKey("zip"))
            {
                queryable = queryable.Where(x => x.User.Zip != null && x.User.Zip.Contains(filterParameters["zip"]));
            }

            return queryable.ToList();
        }

        public HelpWanted Update(int id, HelpWanted helpWanted)
        {
            HelpWanted dbHelpWanted = helpWantedRepository.Get().Where(x => x.Id == id).First()
                ?? throw new BadHttpRequestException("Help wanted not found", 404);

            dbHelpWanted.PostContent = helpWanted.PostContent;
            dbHelpWanted.SkillSet = helpWanted.SkillSet;
            dbHelpWanted.ExpectedRate = helpWanted.ExpectedRate;
            dbHelpWanted.Flagged = helpWanted.Flagged;

            return helpWantedRepository.Update(dbHelpWanted);
        }

        public void Delete(int id)
        {
            HelpWanted helpWanted = helpWantedRepository.Get().Where(x => x.Id == id).First();
            helpWantedRepository.Delete(helpWanted);
        }
    }
}
