insert into user_details (
gender,
religion,
ethnicity,
intro_extro, 
description,
user_id
)
values ($1,$2,$3,$4,$5,(select max(user_id) from users));
