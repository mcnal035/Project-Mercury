CREATE TABLE "user"
(
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(200),
    "password" VARCHAR(200),
    "email" VARCHAR(200),
    "admin" INT DEFAULT 2,
    "first_name" VARCHAR (50),
    "last_name" VARCHAR (50)
);

CREATE SEQUENCE sequence_for_eol
INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;

CREATE SEQUENCE sequence_for_npi
INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;

CREATE SEQUENCE sequence_for_pcn
INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;


CREATE TABLE eol
(
    id VARCHAR(100),
    creator_id integer REFERENCES "user"(id),
    contact_id integer REFERENCES "user"(id),
    "type" character varying(200) DEFAULT 'EOL',
    "date" character varying(200) DEFAULT now(),
    change_description character varying(2000),
    last_time_buy character varying(50),
    last_time_ship character varying(50),
    notes character varying(2000),
    audience character varying(1000),
    status VARCHAR(20) DEFAULT 'INCOMPLETE',
    notification_message VARCHAR(2000),
    message_read int DEFAULT 1,
    message_time VARCHAR(100),
    product VARCHAR(100),
    CONSTRAINT eol_pkey PRIMARY KEY (id)
);

ALTER TABLE eol ALTER COLUMN id
SET
DEFAULT TO_CHAR
(nextval
('sequence_for_eol'::regclass),'"EOL-"fm000000');


CREATE TABLE npi
(
    id VARCHAR(200),
    creator_id integer REFERENCES "user"(id),
    contact_id integer REFERENCES "user"(id),
    "type" character varying(200) DEFAULT 'NPI',
    "date" character varying(200) DEFAULT now(),
    "description" character varying(2000),
    notes character varying(2000),
    audience character varying(1000),
    status varchar(20) DEFAULT 'INCOMPLETE',
    notification_message VARCHAR(2000),
    message_read int DEFAULT 1,
    message_time VARCHAR(100),
    product VARCHAR(100),
    CONSTRAINT npi_pkey PRIMARY KEY (id)
);

ALTER TABLE npi ALTER COLUMN id
SET
DEFAULT TO_CHAR
(nextval
('sequence_for_npi'::regclass),'"NPI-"fm000000');


CREATE TABLE pcn
(
    id VARCHAR(200),
    creator_id integer REFERENCES "user"(id),
    contact_id integer REFERENCES "user"(id),
    "type" character varying(200) DEFAULT 'PCN',
    "date" character varying(200) DEFAULT now(),
    audience VARCHAR(500),
    change_description character varying(2000),
    notes character varying(2000),
    status varchar(20) DEFAULT 'INCOMPLETE',
    notification_message VARCHAR(2000),
    message_read int DEFAULT 1,
    message_time VARCHAR(100),
    product VARCHAR(100),
    CONSTRAINT pcn_pkey PRIMARY KEY (id)
);

ALTER TABLE pcn ALTER COLUMN id
SET
DEFAULT TO_CHAR
(nextval
('sequence_for_pcn'::regclass),'"PCN-"fm000000');


CREATE TABLE image
(
    id SERIAL PRIMARY KEY,
    file_name character varying(1000),
    figure character varying(200),
    pcn_id VARCHAR(100)
);

CREATE TABLE part
(
    id SERIAL PRIMARY KEY,
    "name" character varying(200),
    "number" character varying(200),
    "description" character varying(200)
);

CREATE TABLE eol_part
(
    id SERIAL PRIMARY KEY,
    eol_id VARCHAR REFERENCES eol(id),
    part_id integer REFERENCES part(id),
    replacement_id int REFERENCES part(id)
);

CREATE TABLE npi_part
(
    id SERIAL PRIMARY KEY,
    npi_id VARCHAR REFERENCES npi(id),
    part_id integer REFERENCES part(id)
);

CREATE TABLE pcn_part
(
    id SERIAL PRIMARY KEY,
    pcn_id VARCHAR REFERENCES pcn(id),
    part_id integer REFERENCES part(id)
);

--
CREATE TABLE pcn_review_log
(
    id SERIAL PRIMARY KEY,
    pcn_id VARCHAR REFERENCES pcn(id),
    notification_message varchar(1000),
    message_time varchar,
    status varchar
);

-- Trigger to log when a PCN is approved or denied
create or replace function logpcnreviewfunction
() returns trigger as $pcnreview_table$
begin
    insert into pcn_review_log
        (pcn_id, notification_message, message_time, status)
    VALUES
        (new.id, new.notification_message, new.message_time, new.status);
    return new;
end;
$pcnreview_table$ LANGUAGE plpgsql;

create trigger logpcnreviewtrigger after
update on pcn
for each row
execute procedure logpcnreviewfunction
();



--
CREATE TABLE eol_review_log
(
    id SERIAL PRIMARY KEY,
    eol_id VARCHAR REFERENCES eol(id),
    notification_message varchar(1000),
    message_time varchar,
    status varchar
);

-- Trigger to log when an EOL is approved or denied
create or replace function logeolreviewfunction
() returns trigger as $eolreview_table$
begin
    insert into eol_review_log
        (eol_id, notification_message, message_time, status)
    VALUES
        (new.id, new.notification_message, new.message_time, new.status);
    return new;
end;
$eolreview_table$ LANGUAGE plpgsql;

create trigger logeolreviewtrigger after
update on eol
for each row
execute procedure logeolreviewfunction
();



--
CREATE TABLE npi_review_log
(
    id SERIAL PRIMARY KEY,
    npi_id VARCHAR REFERENCES npi(id),
    notification_message varchar(1000),
    message_time varchar,
    status varchar
);

-- Trigger to log when a NPI is approved or denied
create or replace function lognpireviewfunction
() returns trigger as $npireview_table$
begin
    insert into npi_review_log
        (npi_id, notification_message, message_time, status)
    VALUES
        (new.id, new.notification_message, new.message_time, new.status);
    return new;
end;
$npireview_table$ LANGUAGE plpgsql;

create trigger lognpireviewtrigger after
update on npi
for each row
execute procedure lognpireviewfunction
();
