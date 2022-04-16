package com.project.hoaxify.service;

import com.project.hoaxify.dto.resquest.HoaxRequestDto;
import com.project.hoaxify.entity.FileAttachment;
import com.project.hoaxify.entity.Hoax;
import com.project.hoaxify.entity.User;
import com.project.hoaxify.repository.FileAttachmentRepository;
import com.project.hoaxify.repository.HoaxRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class HoaxService {

	private final HoaxRepository repository;
	private final UserService userService;
	private final FileAttachmentRepository fileAttachmentRepository;
	private final FileService fileService;

	public HoaxService(HoaxRepository repository, UserService userService,
			FileAttachmentRepository fileAttachmentRepository, FileService fileService) {
		this.repository = repository;
		this.userService = userService;
		this.fileAttachmentRepository = fileAttachmentRepository;
		this.fileService = fileService;
	}

	public void save(HoaxRequestDto dto, User user) {
		Hoax hoax = Hoax.builder().timestamp(new Date()).user(user).content(dto.getContent()).build();
		Optional<FileAttachment> optionalFileAttachment = fileAttachmentRepository.findById(dto.getAttachmentId());
		repository.save(hoax);
		if (optionalFileAttachment.isPresent()) {
			FileAttachment fileAttachment = optionalFileAttachment.get();
			fileAttachment.setHoax(hoax);
			fileAttachmentRepository.save(fileAttachment);
		}
		repository.save(hoax);
	}

	public Page<Hoax> getAllHoaxes(Pageable page) {
		return repository.findAll(page);
	}

	public Page<Hoax> getHoaxesofUser(String username, Pageable page) {

		Optional<User> userInDB = userService.getByUsername(username);
		return repository.findByUser(userInDB.get(), page);
	}

	public Page<Hoax> getOldHoaxes(Pageable page, long id, String username) {
		Specification<Hoax> specification = idLessThan(id);
		if (username != null) {
			Optional<User> userInDB = userService.getByUsername(username);
			specification = specification.and(userIs(userInDB.get()));

			//			return repository.findByIdLessThanAndUser(id, userInDB.get(), page);
		}

		return repository.findAll(specification, page);
		//		return repository.findByIdLessThan(id, page);
	}

	public long getNewHoaxCount(Long id, String username) {
		Specification<Hoax> specification = idGreaterThan(id);
		if (username != null) {
			Optional<User> userInDB = userService.getByUsername(username);
			specification = specification.and(userIs(userInDB.get()));
			//			return repository.countByIdGreaterThanAndUser(id, userInDB.get());
		}
		return repository.count(specification);
	}

	public List<Hoax> getNewHoaxes(long id, Sort sort, String username) {
		Specification<Hoax> specification = idGreaterThan(id);
		if (username != null) {
			Optional<User> userInDB = userService.getByUsername(username);
			specification = specification.and(userIs(userInDB.get()));
			//			return repository.findByIdGreaterThanAndUser(id, userInDB.get(), sort);
		}
		return repository.findAll(specification, sort);
	}

	public Specification<Hoax> idLessThan(long id) {
		return (root, query, criteriaBuilder) -> {
			return criteriaBuilder.lessThan(root.get("id"), id);

		};
	}

	public Specification<Hoax> idGreaterThan(long id) {
		return (root, query, criteriaBuilder) -> {
			return criteriaBuilder.greaterThan(root.get("id"), id);

		};
	}

	public Specification<Hoax> userIs(User user) {
		return (root, query, criteriaBuilder) -> {
			return criteriaBuilder.equal(root.get("user"), user);

		};
	}

	public void delete(long id) {
		Hoax inDB = repository.getOne(id);
		if (inDB.getFileAttachment() != null) {
			String fileName = inDB.getFileAttachment().getName();
			fileService.deleteAttachmentFile(fileName);
		}
		repository.deleteById(id);
	}

}
