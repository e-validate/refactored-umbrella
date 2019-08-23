update user_interests
set sports = $1,
arts = $2,
music = $3,
books = $4,
movies = $5,
outdoors = $6,
food = $7,
pets = $8,
netflix = $9,
traveling = $10,
tech = $11,
fashion = $12,
fitness = $13,
gaming = $14,
politics = $15
where user_interests_id = $16;

select * from user_interests
where user_details.user_id = $17