package com.project.hoaxify.service;

import com.project.hoaxify.entity.Hoax;
import com.project.hoaxify.entity.User;
import com.project.hoaxify.repository.HoaxRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service(value = "hoaxSecurity")
public class HoaxSecutiyService {

	final HoaxRepository hoaxRepository;

	public HoaxSecutiyService(HoaxRepository hoaxRepository) {
		this.hoaxRepository = hoaxRepository;
	}

	public boolean isAllowedToDelete(long id, User loggedInUser) {
		Optional<Hoax> optionalHoax = hoaxRepository.findById(id);
		if (!optionalHoax.isPresent()) {
			return false;
		}

		Hoax hoax = optionalHoax.get();
		if (hoax.getUser().getId() != loggedInUser.getId()) {
			return false;
		}

		return true;
	}

}

