package com.gambit.server.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.gambit.server.exception.UserNotFoundException;
import com.gambit.server.model.User;
import com.gambit.server.repository.UserRepository;
import com.gambit.server.util.FileUploadUtil;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {

	@Autowired
	private UserRepository userRepository;
	
	@PostMapping(value = "/upload/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	String upload(@RequestPart("file") MultipartFile multipartFile, @PathVariable Long id) {
		String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
    	//newUser.setPhotos(fileName);
		User user = userRepository.findById(id).get();
		
		user.setPhotos(fileName);
		userRepository.save(user);
    	String uploadDir = "user-photos/" + id;
    	try {
    		Byte[] byteObjects = new Byte[multipartFile.getBytes().length];
    		int i = 0;
    		
    		for(byte b : multipartFile.getBytes()) {
    			byteObjects[i++] = b;
    		}
    		user.setId(id);
    		//user.setImage(byteObjects);
    		
    		userRepository.save(user);
			FileUploadUtil.saveFile(uploadDir, fileName, multipartFile);
	} catch (IOException e) {
			e.printStackTrace();
		}
    	return "ok";
	}
	
	@PostMapping("/register")//value = "/user", consumes = MediaType.MULTIPART_FORM_DATA_VALUE
	User newUser(@RequestBody User newUser) {
		User found = userRepository.findByEmail(newUser.getEmail());
		if(found != null) {
			System.err.println("User exists account could not be created! email: " + newUser.getEmail() + " email found: " + found.getEmail());
			return null;
		}
		System.out.println("Successful Registration");
		return userRepository.save(newUser);
	}
	
	@GetMapping("/fetchid/{email}")
	String getUserId(@PathVariable String email) {
		return userRepository.findByEmail(email).getId().toString();
	}

	@GetMapping("/users")
	List<User> getAllUsers() {
		return userRepository.findAll();
	}
	
	@GetMapping("/dashboard/{id}")
	List<User> getCandidates(@PathVariable Long id) {
		User self = userRepository.findById(id).get();
		int limit = 10;
		List<User> allUsers = userRepository.findAll();
		List<User> candidates = new ArrayList<>();

		int j = 0;
		for(int i = 0; i < limit; i++) {
			if(i > limit || i >= allUsers.size() ) {
				break;
			}
			User candidate = allUsers.get(j++);
			//System.out.println("Current candidate: " + candidate.getFirstName());
			if(!self.equals(candidate)) {
				candidate.setPassword("");
				candidates.add(candidate);
			}
		}
		return candidates;
	}

	@GetMapping("/user/{id}")
	User getUserById(@PathVariable Long id) {
		return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
	}

	@PutMapping("/edituser/{id}")
	ModelAndView updateUser(@RequestBody User newUser, @PathVariable Long id) {
		ModelAndView mav = new ModelAndView("user");
    	User selectedUser = userRepository.findById(id)
    			.map(user -> {
    				user.setEmail(newUser.getEmail());
    				user.setFirstName(newUser.getFirstName());
    				user.setLastName(newUser.getLastName());
    				user.setUsername(newUser.getUsername());
    				user.setPassword(newUser.getPassword());
    				user.setPhotos(newUser.getPhotos());
    				return userRepository.save(user);
    			}).orElseThrow(() -> new UserNotFoundException(id));
    	mav.addObject("user", selectedUser);
    	return mav;
    }

	@PostMapping("/login")
	String authenticateLogin(@RequestBody User user) {
		System.out.println("authenticating login...");

		System.out.println("user email: " + user.getEmail());
		// This is what the user inputs from the client
		String inputEmail = user.getEmail();
		String inputPassword = user.getPassword();

		User result = userRepository.findByEmail(inputEmail);

		if (result != null) {
			System.out.println("User Found E-mail: " + result.getEmail() + " pass: " + result.getPassword()
					+ " input e-mail: " + inputEmail + " input pass: " + inputPassword);

			String dbEmail = result.getEmail();
			String dbPassword = result.getPassword();

			if (inputEmail.equals(dbEmail) && inputPassword.equals(dbPassword)) {
				System.out.println("Account Successfully Authenticated");
				return "{" + "\"login_error\":\"0\"," + "\"time\":\"0\"" + "}";
			}
			System.out.println("Error Logging in: Invalid Email/Pass");
			return "{" + "\"login_error\":\"2\"," + "\"time\":\"0\"" + "}";
		}

		System.out.println("Error Logging in");
		return "{" + "\"login_error\":\"1\"," + "\"time\":\"0\"" + "}";
	}

	@DeleteMapping("user/{id}")
	String deleteUser(@PathVariable Long id) {
		if (!userRepository.existsById(id)) {
			throw new UserNotFoundException(id);
		}
		userRepository.deleteById(id);
		return "User with id: " + id + " has been deleted";
	}

}
