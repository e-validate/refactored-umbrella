update user_details
set gender = $1,
religion = $2,
ethnicity = $3,
intro_extro = $4, 
description = $5
where user_details_id = $6;

select *
from user_details
where user_id = $7;