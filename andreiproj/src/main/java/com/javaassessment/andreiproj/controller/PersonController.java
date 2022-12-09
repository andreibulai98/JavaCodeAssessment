package com.javaassessment.andreiproj.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.javaassessment.andreiproj.model.Person;
import com.javaassessment.andreiproj.service.PersonService;

@RestController
@CrossOrigin
public class PersonController {

	@Autowired
	private PersonService service;
	
	@PostMapping("/addPerson")
	public Person addPerson(@RequestBody Person person) {
		return service.savePerson(person);
	}
	
	@PostMapping("/addPersons")
	public List<Person> addPersons(@RequestBody List<Person> persons){
		return service.savePersons(persons);
	}
	
	@GetMapping("/persons")
	public List<Person> findAllPersons(){
		return service.getPersons();
	}
	
	@GetMapping("/person/{personId}")
	public Person findPersonById(@PathVariable int personId) {
		return service.getPersonById(personId);
	}
	
	/*
	@GetMapping("/personName/{lastName}")
	public Person findPersonByLastName(@PathVariable String lastName) {
		return service.getPersonByLastName(lastName);
	*/
	
	@PutMapping("/update")
	public Person updatePerson(@RequestBody Person person) {
		return service.updatePerson(person);
	}
	
	@DeleteMapping("/delete/{personId}")
	public String deletePerson(@PathVariable int personId) {
		return service.deletePerson(personId);
	}
}
