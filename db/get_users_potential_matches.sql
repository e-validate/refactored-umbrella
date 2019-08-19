select * from users 
NATURAL JOIN user_details 
NATURAL JOIN user_interests
NATURAL JOIN user_appearance
NATURAL JOIN user_appearance_pref
NATURAL JOIN user_details_pref
where user_id not in (
    select swiped_id from matches 
    where swiper_id = 12
    ) 
    and user_id != 12
;
