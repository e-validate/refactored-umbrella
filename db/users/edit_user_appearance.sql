update user_appearance 
set age = $1,
height_ft = $2,
height_in = $3,
hair_color = $4, 
image1 = $5, 
image2 = $6, 
image3 = $7,
image4 = $8
where user_appearance_id = $9;

select *
from user_appearance
where user_id = $10;