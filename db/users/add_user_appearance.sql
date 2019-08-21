insert into user_appearance (
age,
height_ft,
height_in,
hair_color, 
image1, 
image2, 
image3,  
user_id
)

values ($1,$2,$3,$4,$5,$6,$7,$8)
returning*;