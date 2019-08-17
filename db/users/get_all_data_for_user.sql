select * from users 
NATURAL JOIN user_details 
NATURAL JOIN user_interests
NATURAL JOIN user_appearance
NATURAL JOIN user_appearance_pref
NATURAL JOIN user_details_pref
where user_id = $1;