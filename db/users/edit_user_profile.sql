update user_appearance 
set age = $1
where user_id = $2;

update users 
set name = $3
where user_id = $2;

update user_details
set religion = $4,
ethnicity = $5,
description = $6,
gender = $7
where user_id = $2;

select * from users
join user_appearance as ua on ua.user_id = users.user_id
join user_details as ud on ud.user_id = users.user_id
where users.user_id = $2;



