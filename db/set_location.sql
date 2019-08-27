update user_details 
set latitude = $1, longitude = $2
where user_id = $3;