package com.javaassessment.andreiproj.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Person {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int personId;
	private String firstName;
	private String lastName;
	private String phoneNumber;
	private String email;
	
	public Person() {
		
	}
	
	public int getId() {
        return personId;
    }
    
    public void setId(int personId) {
        this.personId = personId;
    }
    
    public String getFirstName() {
        return firstName;
    }
    
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
		return lastName;
	}
	
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	
    public String getPhoneNumber() {
        return phoneNumber;
    }
    
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
}
