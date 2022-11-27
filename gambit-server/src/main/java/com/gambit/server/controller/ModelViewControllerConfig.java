package com.gambit.server.controller;

import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class ModelViewControllerConfig implements WebMvcConfigurer {
	/**
	 * Handle saved image directory
	 * 
	 * @version Nov 26, 2022
	 * @param registry
	 */
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		System.out.println("resource handlersare running");
		exposeDirectory("user-photos", registry);
	}
	
	/**
	 * Get Directory Path to Store any given handled file from the above method
	 * 
	 * Passes a directory of a file (LocalDir\SaveImage.png) and it passed handled directory got from the above method
	 * It then opens a directory on the servers end and stores it in uploadDir (ex. \Dir\)
	 * It then gets the path to that directory and stores it in uploadPath (ex. Path\Dir\SaveImage.png)
	 * It then targets the path to this directory and saves the resource, so it can be knowable
	 * 
	 * @param dirName
	 * @param registry
	 */
	private void exposeDirectory(String dirName, ResourceHandlerRegistry registry) {
		Path uploadDir = Paths.get(dirName);
		String uploadPath = uploadDir.toFile().getAbsolutePath();
		
		if(dirName.startsWith("../"))
			dirName = dirName.replace("../", "");
		System.out.println("registry added!");
		registry.addResourceHandler("/" + dirName + "/**").addResourceLocations("file:/"+ uploadPath + "/");
	}
	
}
