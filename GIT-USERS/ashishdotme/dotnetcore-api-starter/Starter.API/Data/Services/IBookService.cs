using System;
using System.Collections.Generic;
using Starter.API.Data.Models;

namespace Starter.API.Data.Services
{
    public interface IBookService
    {
        IEnumerable<Book> GetAll();
        Book Add(Book newBook);
        Book GetById(Guid id);
        void Remove(Guid id);
    }
}
