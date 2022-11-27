package com.gambit.server.model;

import java.util.Arrays;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;

import org.springframework.data.annotation.Transient;

@Entity
public class User {

	@Id
	@GeneratedValue
	private Long id;
	private String email;
	private String username;
	private String firstName;
	private String lastName;
	private String password;

	private String photo;
	private String biography;
	
	private Long[] matchList;
	private Long[] likes;
	//private int matchPosition;
	private int likePosition;
	private int matchSize;
	private int likeSize;
	
	/*@Lob
	private Byte[] image;

	public Byte[] getImage() {
		return image;
	}

	public void setImage(Byte[] image) {
		this.image = image;
	}*/
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPhotos() {
		return photo;
	}

	public void setPhotos(String photos) {
		this.photo = photos;
	}

	@Transient
	public String getPhotoImagePath() {
		if(photo == null || id == null)
			return null;
		return "/user-photos/" + id + "/" + photo;
	}

	public String getBiography() {
		return biography;
	}

	public void setBiography(String biography) {
		this.biography = biography;
	}

	public Long[] getMatchedList() {
		return matchList;
	}

	public void addMatch(Long userId) {
		if(matchList == null) {
			matchList = new Long[5];
		}
		if(matchSize < (matchList.length+1)) {
			this.matchSize += 5;
			matchList = matchList == null ? new Long[matchSize] : Arrays.copyOf(matchList, matchSize);

		}
		//matchList[matchPosition++] = userId;
		
		int lastNullIndex = 0;
		boolean containsMatch = false;
		for (int i = 0; i < matchList.length; i++) {
			if(matchList[i] == null)
				lastNullIndex = i;
			if(matchList[i] != null) {
				if(matchList[i].compareTo(userId) == 0) {
					containsMatch = true;
					break;
				}
			}
		}
		
		if(!containsMatch) {
			matchList[lastNullIndex] = userId;
		}
	}
	
	public void addLike(Long userId) {
		if(likeSize < (likeSize+1)) {
			this.likeSize += 5;
			likes = likes == null ? new Long[likeSize] : Arrays.copyOf(likes, likeSize);

		}
		likes[likePosition++] = userId;
	}
	
	public boolean containsLike(Long userId) {
		if(likes == null)
			return false;
		
		
		for(Long candidate : likes) {
			if(candidate == null)
				continue;
			//System.out.println(candidate);
			if(candidate.compareTo(userId) == 0) {
				//System.out.println("Contains Like");
				return true;
			}
		}
		return false;
		//matchList[matchPosition++] = userId;
	}
	
	public boolean containsMatch(User user) {
		if(matchList == null)
			return false;
		
		for(Long currentId : matchList) {
			if(currentId == null)
				continue;
			if(user.getId().equals(currentId)) {
				return true;
			}
		}
		return false;
	}
	
	public boolean hasMatch(User likedUser) {
		Long likedId = likedUser.getId();
		return this.containsLike(likedId) && likedUser.containsLike(id);	
	}
	
	public void removeMatch(Long userId) {
		if(matchList == null) {
			matchList = new Long[10];
		}
		for(int index = 0; index < matchList.length; index++) {
			if(matchList[index] == null)
				continue;
			if(matchList[index].compareTo(userId) == 0) {
				matchList[index] = null;
				matchSize--;
				//matchPosition--;
			}
			
			if(matchList.length - 5 > matchSize && matchList.length <= 0) {
				matchList = Arrays.copyOf(matchList, matchSize);
				matchSize = matchList.length;
			}
		}
	}

	public Long[] getLikes() {
		return likes;
	}

	public void setLikes(Long[] likes) {
		this.likes = likes;
	}

}
