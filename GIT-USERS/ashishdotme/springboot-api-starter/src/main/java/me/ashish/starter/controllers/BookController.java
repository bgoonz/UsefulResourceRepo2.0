package me.ashish.starter.controllers;

import me.ashish.starter.exception.ResourceNotFoundException;
import me.ashish.starter.models.Book;
import me.ashish.starter.respositories.BookRepository;
import me.ashish.starter.services.BookService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api/v1")
public class BookController {

    private BookRepository bookRepository;
    private BookService bookService;

    public BookController(
            BookService bookService,
            BookRepository bookRepository
    ) {
        this.bookRepository = bookRepository;
        this.bookService = bookService;
    }

    @GetMapping("/books")
    public ResponseEntity<Map> getAllBooks(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Double price,
            Pageable page
    ) {
        Map<String, Object> res = new HashMap<>();

        Page books = bookService.findByPagingAndCriteria(
                name, price, page
        );

        res.put("message", "successfully fetch book data");
        res.put("data", books);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/books/{id}")
    public ResponseEntity<Map> getItemById(@PathVariable Long id) {
        Map<String, Object> res = new HashMap<>();

        Book book = bookRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("item not found"));

        res.put("message", "successfully fetch book data");
        res.put("data", book);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PostMapping("/books")
    public ResponseEntity<Map> createBook(
            @RequestBody Book book
    ) {
        Map<String, Object> res = new HashMap<>();

        bookRepository.save(book);

        res.put("message", "successfully fetch book data");
        res.put("data", book);

        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @PutMapping("/books/{id}")
    public ResponseEntity<Map> updateBook(@PathVariable Long id, @RequestBody Book bookPayload){
        Map<String, Object> res = new HashMap<>();

        Book book = bookRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("item not found"));

        book.setName(bookPayload.getName());
        book.setQty(bookPayload.getQty());
        book.setPrice(bookPayload.getPrice());

        bookRepository.save(book);

        res.put("message", "successfully update book data");
        res.put("data", book);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @DeleteMapping("/books/{id}")
    public ResponseEntity<Map> deleteBook(@PathVariable Long id) {
        Map<String, Object> res = new HashMap<>();

        Book book = bookRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("item not found"));

        bookRepository.delete(book);

        res.put("message", "successfully delete book data");
        res.put("data", book);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
