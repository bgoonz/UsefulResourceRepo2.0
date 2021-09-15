package me.ashish.starter.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BookService {
    Page findByPagingAndCriteria(String name, Double price, Pageable page);
}