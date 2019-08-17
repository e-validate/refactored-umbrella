------Users------

CREATE TABLE users (
user_id SERIAL PRIMARY KEY,
name TEXT NOT NULL,
email TEXT NOT NULL,
password TEXT NOT NULL
);

CREATE TABLE user_appearance (
user_appearance_id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(user_id),
hair_color TEXT,
image1 TEXT,
image2 TEXT,
image3 TEXT,
age INTEGER
);

CREATE TABLE user_interests (
user_interests_id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(user_id),
sports BOOLEAN,
arts BOOLEAN,
music BOOLEAN,
books BOOLEAN,
movies BOOLEAN,
outdoors BOOLEAN,
food BOOLEAN,
pets BOOLEAN,
netflix BOOLEAN,
traveling BOOLEAN,
tech BOOLEAN,
fashion BOOLEAN,
fitness BOOLEAN,
gaming BOOLEAN,
politics BOOLEAN
);

CREATE TABLE user_details (
user_details_id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(user_id),
religion TEXT,
ethnicity TEXT,
description TEXT,
gender TEXT,
intro_extro INTEGER
);


CREATE TABLE user_appearance_pref (
user_appearance_id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(user_id),
age_min INTEGER,
age_max INTEGER,
min_height integer,
max_height INTEGER,
hair_color_pref TEXT
);

CREATE TABLE user_details_pref (
user_details_pref SERIAL PRIMARY KEY,
user_id INT REFERENCES users(user_id),
gender_pref TEXT,
religion_pref TEXT,
ethnicity_pref TEXT,
intro_extro_pref INTEGER
);

-----matches-----

create table match_junc (
    match_junc_id serial primary key,
    likes BOOLEAN,
    
);

create table matches (
    match_id serial primary key,
    match_junc_id int references match_junc(match_junc_id),
    swiper_id int references users(user_id),
    swiped_id int references users(user_id),
    likes BOOLEAN,
    date_swiped timestamp
);

------chat------


create table chatrooms (
    chatroom_id serial primary key,
    date_created timestamp
);

create table messages(
    messages_id serial primary key,
    sender_id int references users(user_id),
    chatroom_id int references chatrooms(chatroom_id),
    content text,
    timestamp_sent timestamp,
    read BOOLEAN 
);


