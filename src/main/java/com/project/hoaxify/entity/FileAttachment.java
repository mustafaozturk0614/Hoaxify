package com.project.hoaxify.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class FileAttachment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String name;
	@Temporal(TemporalType.TIMESTAMP)
	private Date date;
	private String fileType;
	@OneToOne
	private Hoax hoax;
}
