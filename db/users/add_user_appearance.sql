insert into user_appearance (
hair_color, 
image1, 
image2, 
image3, 
age, 
user_id
)
values ($1,$2,$3,$4,$5,(select max(user_id) from users));