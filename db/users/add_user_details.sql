
insert into user_details (
religion,
ethnicity,
description,
gender,
intro_extro, 
user_id
)
values ($1,$2,$3,$4,$5,(select max(user_id) from users));