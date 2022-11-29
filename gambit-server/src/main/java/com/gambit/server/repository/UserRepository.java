package com.gambit.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gambit.server.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

	//query repository using retrieved email
	public User findByEmail(String email);
}
