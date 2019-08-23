update user_details_pref
set gender_pref = $1,
religion_pref = $2,
ethnicity_pref = $3
where user_id = $4;

returning*;