package com.gambit.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gambit.server.model.ReportMessage;

@Repository
public interface ReportRepository extends JpaRepository<ReportMessage, Long>{

	//query repository using retrieved email
	public ReportMessage findByEmail(String email);
}
