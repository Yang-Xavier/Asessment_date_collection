DROP DATABASE mdp;

CREATE DATABASE mdp;

USE mdp;

CREATE TABLE `User` (
	`user_id` int NOT NULL AUTO_INCREMENT,
	`user_type` ENUM('LTM', 'ACADEMIC', 'YEARTUTOR') NOT NULL,
	`user_email` char NOT NULL,
	`user_password` char NOT NULL,
	PRIMARY KEY (`user_id`),
	UNIQUE KEY `unique_columns`(`user_email`)
);

CREATE TABLE `Student` (
	`student_id` int NOT NULL AUTO_INCREMENT,
	`student_name` char NOT NULL,
	PRIMARY KEY (`student_id`)
);

CREATE TABLE `Module` (
	`module_id` int NOT NULL AUTO_INCREMENT,
	`module_code` char NOT NULL,
	`module_name` char NOT NULL,
	`module_semester` ENUM('FIRST', 'SECOND', 'BOTH') NOT NULL,
	PRIMARY KEY (`module_id`),
	UNIQUE KEY `unique_columns`(`module_code`, `module_semester`)
);

CREATE TABLE `Assessment` (
	`ass_id` int NOT NULL AUTO_INCREMENT,
	`ass_module` int NOT NULL,
	`ass_semester` ENUM('FIRST', 'SECOND', 'BOTH') NOT NULL,
	`ass_academic` int NOT NULL,
	`ass_format` int NOT NULL,
	`ass_name` char NOT NULL,
	`ass_marks` FLOAT NOT NULL,
	`ass_release_date` DATETIME NOT NULL,
	`ass_submit_date` DATETIME NOT NULL,
	PRIMARY KEY (`ass_id`)
);

CREATE TABLE `Form` (
	`form_id` int NOT NULL AUTO_INCREMENT,
	`form_timestamp` TIMESTAMP NOT NULL,
	PRIMARY KEY (`form_id`)
);

CREATE TABLE `StudentModule` (
	`sm_module` int NOT NULL,
	`sm_student` int NOT NULL,
	PRIMARY KEY (`sm_module`,`sm_student`)
);

CREATE TABLE `AcademicModule` (
	`am_module` int NOT NULL,
	`am_academic` int NOT NULL,
	PRIMARY KEY (`am_module`, `am_academic`)
);

CREATE TABLE `FormAssessment` (
	`fa_form` int NOT NULL,
	`fa_assessment` int NOT NULL
);

ALTER TABLE `Assessment` ADD CONSTRAINT `Assessment_fk0` FOREIGN KEY (`ass_module`) REFERENCES `Module`(`module_id`);

ALTER TABLE `Assessment` ADD CONSTRAINT `Assessment_fk1` FOREIGN KEY (`ass_academic`) REFERENCES `User`(`user_id`);

ALTER TABLE `StudentModule` ADD CONSTRAINT `StudentModule_fk0` FOREIGN KEY (`sm_module`) REFERENCES `Module`(`module_id`);

ALTER TABLE `StudentModule` ADD CONSTRAINT `StudentModule_fk1` FOREIGN KEY (`sm_student`) REFERENCES `Student`(`student_id`);

ALTER TABLE `AcademicModule` ADD CONSTRAINT `AcademicModule_fk0` FOREIGN KEY (`am_module`) REFERENCES `Module`(`module_id`);

ALTER TABLE `AcademicModule` ADD CONSTRAINT `AcademicModule_fk1` FOREIGN KEY (`am_academic`) REFERENCES `User`(`user_id`);

ALTER TABLE `FormAssessment` ADD CONSTRAINT `FormAssessment_fk0` FOREIGN KEY (`fa_form`) REFERENCES `Form`(`form_id`);

ALTER TABLE `FormAssessment` ADD CONSTRAINT `FormAssessment_fk1` FOREIGN KEY (`fa_assessment`) REFERENCES `Assessment`(`ass_id`);
