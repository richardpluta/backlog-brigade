﻿using ServicifyDB.Models;
using ServicifyDB.Repository;

namespace ServicifyDB.Services
{
    public class TestService
    {
        private readonly IRepository<HelpWanted> helpWantedRepository;

        public TestService(IRepository<HelpWanted> helpWantedRepository)
        {
            this.helpWantedRepository = helpWantedRepository;
        }

        public IEnumerable<HelpWanted> TestMethod()
        {
            return helpWantedRepository.Get().ToList();
        }
    }
}
