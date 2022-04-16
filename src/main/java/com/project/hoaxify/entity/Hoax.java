package com.project.hoaxify.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
public class Hoax {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(length = 1000)
	private String content;
	@Temporal(TemporalType.TIMESTAMP)
	private Date timestamp;
	@ManyToOne()
	private User user;
	@OneToOne(mappedBy = "hoax", cascade = CascadeType.REMOVE)
	private FileAttachment fileAttachment;

}
