using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Starter.API.Controllers;
using Starter.API.Data.Models;
using Starter.API.Data.Services;
using Xunit;

namespace Starter.Test
{
    public class BooksControllerTest
    {
        BooksController _controller;
        IBookService _service;

        public BooksControllerTest()
        {
            _service = new BookService();
            _controller = new BooksController(_service);
        }

        [Fact]
        public void GetAllTest()
        {
            //arrange

            //act
            var result = _controller.Get();

            //assert
            Assert.IsType<OkObjectResult>(result.Result);

            var list = result.Result as OkObjectResult;
            Assert.IsType<List<Book>>(list.Value);

            var listBooks = list.Value as List<Book>;
            Assert.Single(listBooks);
        }

        [Theory]
        [InlineData("f717194e-6c78-440a-9def-22ad783e354b", "f717194e-6c78-440a-9def-22ad783e354c")]
        public void GetBookByIdTest(string guid1, string guid2)
        {
            //arrange
            var validGuid = new Guid(guid1);
            var invalidGuid = new Guid(guid2);

            //act
            var notFoundResult = _controller.Get(invalidGuid);
            var okResult = _controller.Get(validGuid);

            //assert
            Assert.IsType<NotFoundResult>(notFoundResult.Result);
            Assert.IsType<OkObjectResult>(okResult.Result);

            var item = okResult.Result as OkObjectResult;
            Assert.IsType<Book>(item.Value);

            var bookItem = item.Value as Book;
            Assert.Equal(validGuid, bookItem.Id);
            Assert.Equal("Harry Potter", bookItem.Title);
        }

    }
}
