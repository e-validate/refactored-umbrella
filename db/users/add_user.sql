insert into users (name, email, password)
values ($1,$2,$3);

insert into user_appearance (
hair_color, 
image1, 
image2, 
image3, 
age, 
user_id
)
values ($1,$2,$3,$4,$5,(select max(user_id) from users));

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
values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,(select max(user_id) from users));

insert into user_details (
religion,
ethnicity,
description,
gender,
intro_extro, 
user_id
)
values ($1,$2,$3,$4,$5,(select max(user_id) from users));

insert into user_appearance_pref (
age_min,
age_max,
min_height,
max_height,
hair_color_pref,
user_id 
)
values ($1,$2,$3,$4,$5,(select max(user_id) from users));

insert into user_details_pref (
gender_pref,
religion_pref,
ethnicity_pref,
intro_extro_pref,
user_id
)
values ($1,$2,$3,$4(select max(user_id) from users));