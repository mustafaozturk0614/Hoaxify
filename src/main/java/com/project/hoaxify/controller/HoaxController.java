package com.project.hoaxify.controller;

import com.project.hoaxify.annotaion.CurrentUser;
import com.project.hoaxify.dto.response.GenericResponse;
import com.project.hoaxify.dto.response.HoaxResponseDto;
import com.project.hoaxify.dto.resquest.HoaxRequestDto;
import com.project.hoaxify.entity.User;
import com.project.hoaxify.service.HoaxService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class HoaxController {
	private final HoaxService hoaxService;

	public HoaxController(HoaxService hoaxService) {
		this.hoaxService = hoaxService;
	}

	@PostMapping("/hoaxes")
	GenericResponse savedHoaxes(@Valid @RequestBody HoaxRequestDto hoax, @CurrentUser User user) {
		hoaxService.save(hoax, user);
		return new GenericResponse("Hoax is saved");

	}

	@GetMapping("/hoaxes")
	Page<HoaxResponseDto> getAllHoaxes(@PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable page) {
		return hoaxService.getAllHoaxes(page).map(HoaxResponseDto::new);

	}

	@GetMapping("/users/{username}/hoaxes")
	Page<HoaxResponseDto> getuserHoaxes(@PathVariable String username,
			@PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable page) {
		return hoaxService.getHoaxesofUser(username, page).map(HoaxResponseDto::new);

	}

	//	@GetMapping("/users/{username}/hoaxes/{id:[0-9]+}")
	//	ResponseEntity<?> getuserHoaxesRelative(@PathVariable String username,
	//			@PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable page, @PathVariable Long id,
	//			@RequestParam(name = "count", required = false, defaultValue = "false") boolean count,
	//			@RequestParam(name = "direction", defaultValue = "before") String direction) {
	//		if (count) {
	//			long newHoaxCount = hoaxService.getNewHoaxexCountOfUser(id, username);
	//			Map<String, Long> response = new HashMap<>();
	//			response.put("count", newHoaxCount);
	//			return ResponseEntity.ok(response);
	//		}
	//		if (direction.equals("after")) {
	//			List<HoaxResponseDto> newHoaxes =
	//					hoaxService.getNewHoaxesOfUser(id, username, page.getSort()).stream().map(HoaxResponseDto::new)
	//							   .collect(Collectors.toList());
	//			return ResponseEntity.ok(newHoaxes);
	//		}
	//		return ResponseEntity.ok(hoaxService.getOldHoaxesofUser(username, page, id).map(HoaxResponseDto::new));
	//
	//	}

	@GetMapping({ "/hoaxes/{id:[0-9]+}", "/users/{username}/hoaxes/{id:[0-9]+}" })
	ResponseEntity<?> getHoaxesRelative(@PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable page,
			@PathVariable long id, @PathVariable(required = false) String username,
			@RequestParam(name = "count", required = false, defaultValue = "false") boolean count,
			@RequestParam(name = "direction", defaultValue = "before") String direction) {
		if (count) {
			long newHoaxCount = hoaxService.getNewHoaxCount(id, username);
			Map<String, Long> response = new HashMap<>();
			response.put("count", newHoaxCount);
			return ResponseEntity.ok(response);
		}
		if (direction.equals("after")) {
			List<HoaxResponseDto> newHoaxes =
					hoaxService.getNewHoaxes(id, page.getSort(), username).stream().map(HoaxResponseDto::new)
							   .collect(Collectors.toList());
			return ResponseEntity.ok(newHoaxes);
		}
		return ResponseEntity.ok(hoaxService.getOldHoaxes(page, id, username).map(HoaxResponseDto::new));
	}

	@DeleteMapping("/hoaxes/{id:[0-9]+}")
	@PreAuthorize("@hoaxSecurity.isAllowedToDelete(#id, principal)")
	GenericResponse deleteHoax(@PathVariable long id) {
		hoaxService.delete(id);
		return new GenericResponse("Hoax removed");
	}
}
