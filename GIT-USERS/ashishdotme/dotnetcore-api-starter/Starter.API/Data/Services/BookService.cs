using System;
using System.Collections.Generic;
using Starter.API.Data.Models;

namespace Starter.API.Data.Services
{
    public class BookService : IBookService
    {
        private readonly List<Book> _books;

        public BookService()
        {
            _books = new List<Book>()
            {
                new Book()
                {
                    Id = new Guid("f717194e-6c78-440a-9def-22ad783e354b"),
                    Title = "Harry Potter",
                    Description = "By Jk Rowling",
                    Author = "JK Rowling"
                }
            };
        }

        public Book Add(Book newBook)
        {
            _books.Add(newBook);
            return newBook;
        }

        public IEnumerable<Book> GetAll()
        {
            return _books;
        }

        public Book GetById(Guid id)
        {
            return (Book)_books.Find(b => b.Id == id);
        }

        public void Remove(Guid id)
        {
            var remBook = (Book)_books.Find(b => b.Id == id);
            if(remBook != null)
            {
                _books.Remove(remBook);
            }
        }
    }
}
