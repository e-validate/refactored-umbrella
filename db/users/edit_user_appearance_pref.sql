update user_appearance_pref
set age_min = $1,
age_max = $2, 
hair_color_pref = $3
where user_id = $4;

returning*;