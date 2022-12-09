package com.javaassessment.andreiproj.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.javaassessment.andreiproj.model.Person;
import com.javaassessment.andreiproj.repository.PersonRepository;


@Service
public class PersonService {
	
	@Autowired
	private PersonRepository repository;
	
	public Person savePerson(Person person) {
		return repository.save(person);
	}
	
	public List<Person> savePersons(List<Person> persons) {
		return repository.saveAll(persons);
	}

	public List<Person> getPersons(){
		return repository.findAll();
	}
	
	public Person getPersonById(int personId) {
		return repository.findById(personId).orElse(null);
	}
	
	/*public Person getPersonByLastName(String lastName) {
		return repository.findByLastName(lastName);
	}*/
	
	public String deletePerson(int personId) {
		repository.deleteById(personId);
		return "Person removed! "+personId;
	}
	
	public Person updatePerson(Person person) {
		Person existingPerson=repository.findById(person.getId()).orElse(null);
		existingPerson.setFirstName(person.getFirstName());
		existingPerson.setLastName(person.getLastName());
		existingPerson.setPhoneNumber(person.getPhoneNumber());
		existingPerson.setEmail(person.getEmail());
		return repository.save(existingPerson);
	}
	
	
}

