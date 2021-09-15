package me.ashish.starter.services.impl;

import me.ashish.starter.models.Book;
import me.ashish.starter.respositories.BookRepository;
import me.ashish.starter.services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    private BookRepository bookRepository;

    @Autowired
    public BookServiceImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public Page findByPagingAndCriteria(String name, Double price, Pageable pageable) {
        Page page = bookRepository.findAll(new Specification<Book>() {
            @Override
            public Predicate toPredicate(
                    Root<Book> root,
                    CriteriaQuery<?> criteriaQuery,
                    CriteriaBuilder criteriaBuilder
            ) {
                List<Predicate> predicates = new ArrayList<>();

                if(name != null) {
                    predicates.add(
                            criteriaBuilder.and(criteriaBuilder.equal(root.get("name"), name))
                    );
                }

                if (price != null) {
                    predicates.add(
                            criteriaBuilder.and(criteriaBuilder.equal(root.get("price"), price))
                    );
                }

                return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
            }
        }, pageable);

        return page;
    }
}