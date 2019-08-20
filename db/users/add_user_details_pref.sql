insert into user_details_pref (
gender_pref,
religion_pref,
ethnicity_pref,
user_id
)
values ($1,$2,$3,$4(select max(user_id) from users));