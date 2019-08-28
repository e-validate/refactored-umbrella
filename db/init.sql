------Users------
drop table user_interests;
drop table user_details;
drop table user_appearance_pref;
drop table user_appearance;
drop table user_details_pref;
drop table messages;
drop table chat_junc;
drop table matches;
drop table match_junc;
drop table chatrooms;
drop table users;
drop table pref_counter;

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
    likes BOOLEAN
    
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

create table chat_junc (
chat_junc_id serial primary key,
chatroom_id int REFERENCES chatrooms(chatroom_id),
user_id int REFERENCES users(user_id)
);

create table messages(
    messages_id serial primary key,
    sender_id int references users(user_id),
    chatroom_id int references chatrooms(chatroom_id),
    content text,
    timestamp_sent timestamp,
    read BOOLEAN 
);


-----compare-----

create table pref_counter(
pref_counter_id serial PRIMARY KEY,
users_id int REFERENCES users(user_id),
comparing_users_id int REFERENCES users(user_id),
user_interests_counter int, 
user_appearance_counter int, 
user_details_counter int 
);

--favorites table

CREATE TABLE user_favorite_chatrooms (
user_favorite_chatrooms_id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(user_id),
swiped_id INT REFERENCES users(user_id)
); 








-- select *  from pref_counter
-- where (select sports from user_interests
-- where users_id) = (select sports from user_interests
-- where comparing_users_id = i 

-- create or replace function test(id int, column_name text )
-- returns integer as $$
-- declare
-- counter INTEGER =0;
-- incr integer = 0; 
-- i integer = (select count(user_id) from users);
-- m text = (select column_name from user_interests where user_id = id);
-- n text = (select column_name from user_interests where user_id = incr and user_id != id);

-- begin
-- if(n!=m) then

-- end if;
-- while incr < i loop
-- incr = incr + 1;
-- update pref_counter set user_interests_counter =  user_interests_counter + counter 
-- where incr = comparing_user_id.pref_counter
-- -- (select comparing_users_id from pref_counter where comparing_users_id = incra);
-- end loop;
-- return counter ;
-- end;
-- $$LANGUAGE plpgsql;

-- select test(1, 'sports');
-- select test(1, 'arts');
-- select test(1, 'music');

-- sports,
-- arts,
-- music,
-- books,
-- movies,
-- outdoors,
-- food,
-- pets,
-- netflix,
-- traveling,
-- tech,
-- fashion,
-- fitness,
-- gaming,
-- politics, 
-- select sports from user_interests where user_id  = 3 and user_id != 1;



-- select * from pref_counter;




   