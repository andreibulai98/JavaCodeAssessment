package com.javaassessment.andreiproj.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.javaassessment.andreiproj.model.Person;

@Repository
public interface PersonRepository extends JpaRepository<Person, Integer>{

}
