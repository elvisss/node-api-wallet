create database wallet_db;

use wallet_db;

CREATE TABLE auth_user (
    id int IDENTITY(1,1) primary key,
    email varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
    created_at datetime NULL,
	updated_at datetime NULL
);

CREATE TABLE balance (
    id int IDENTITY(1,1) primary key,
    user_id int NOT NULL,
	amount decimal(10,2) NOT NULL,
    created_at datetime NULL,
	updated_at datetime NULL
);

CREATE TABLE movement (
    id int IDENTITY(1,1) primary key,
    user_id int NOT NULL,
	type TINYINT NOT NULL,
	amount decimal(10,2) not null,
    created_at datetime NULL,
	updated_at datetime NULL
);

CREATE TABLE subscription (
    id int IDENTITY(1,1) primary key,
    user_id int NOT NULL,
	code varchar(20) not null,
	amount decimal(10,2) not null,
	cron varchar(50) not null,
    created_at datetime NULL,
	updated_at datetime NULL
);

INSERT INTO auth_user (email, password, created_at, updated_at) VALUES
	('eduardo@kodoti.com', 'jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI=', '2020-07-09 00:36:13', NULL);
