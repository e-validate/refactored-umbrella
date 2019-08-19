insert into user_appearance_pref (
age_min,
age_max,
min_height,
max_height,
hair_color_pref,
user_id 
)
values ($1,$2,$3,$4,$5,(select max(user_id) from users));