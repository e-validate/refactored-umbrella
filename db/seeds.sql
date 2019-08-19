-----add_user1----- 

insert into users (name, email, password)
values ('aaron','1','1');

insert into user_appearance (
hair_color, 
image1, 
image2, 
image3, 
age, 
user_id
)
values ('brown','1','1','1','27', (select max(user_id) from users));

insert into user_interests (
sports,
arts,
music,
books,
movies,
outdoors,
food,
pets,
netflix,
traveling,
tech,
fashion,
fitness,
gaming,
politics, 
user_id
)
values ('true','true','true','true','true','true','true','true','true','true','true','true','true','true','true',(select max(user_id) from users));

insert into user_details (
religion,
ethnicity,
description,
gender,
intro_extro, 
user_id
)
values ('mormon','white','my name is aaron','male','4',(select max(user_id) from users));

insert into user_appearance_pref (
age_min,
age_max,
min_height,
max_height,
hair_color_pref,
user_id 
)
values ('18','100','50','55','brown',(select max(user_id) from users));

insert into user_details_pref (
gender_pref,
religion_pref,
ethnicity_pref,
intro_extro_pref,
user_id
)
values ('female','mormon','white','5',(select max(user_id) from users));

-----add_user2----- 


insert into users (name, email, password)
values ('Kristina','2','2');

insert into user_appearance (
hair_color, 
image1, 
image2, 
image3, 
age, 
user_id
)
values ('brown','1','1','1','25', (select max(user_id) from users));

insert into user_interests (
sports,
arts,
music,
books,
movies,
outdoors,
food,
pets,
netflix,
traveling,
tech,
fashion,
fitness,
gaming,
politics, 
user_id
)
values ('true','false','true','false','true','false','false','true','true','true','true','false','true','false','true',(select max(user_id) from users));

insert into user_details (
religion,
ethnicity,
description,
gender,
intro_extro, 
user_id
)
values ('mormon','white','my name is kristina','female','6',(select max(user_id) from users));

insert into user_appearance_pref (
age_min,
age_max,
min_height,
max_height,
hair_color_pref,
user_id 
)
values ('18','100','55','60','brown',(select max(user_id) from users));

insert into user_details_pref (
gender_pref,
religion_pref,
ethnicity_pref,
intro_extro_pref,
user_id
)
values ('male','mormon','white','5',(select max(user_id) from users));

----matches tables-----

insert into matches (swiper_id, swiped_id, likes)
values (1,2,true);

insert into matches (swiper_id, swiped_id, likes)
values (2,1,true);

insert into matches (swiper_id, swiped_id, likes)
values (3,1,true);

insert into matches (swiper_id, swiped_id, likes)
values (1,3,true);

insert into match_junc (likes)
values ((select likes from matches 
         where match_id = (select max(match_id) from matches)
         and likes = 'true'
         and likes is not 'false'
        ));
        
update matches 
set match_junc_id = (select max(match_junc_id) from match_junc);


update matches
set likes = false
where swiper_id = $2
and likes = true
and swiped_id in (
    select swiped_id from matches
        where swiped_id = $3
        and likes = false
        and swiper_id = $2);

update matches
set likes = true
where swiper_id = $2
and likes = false;
and swiped_id in (
    select swiped_id from matches
        where swiped_id = $3
        and likes = true
        and swiper_id = $2);

---messages-----