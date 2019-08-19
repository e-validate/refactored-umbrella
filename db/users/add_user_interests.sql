insert into user_interests (
sports,
arts,
music,
books,
movies,
outdoors,
food,
pets,
netflix,
traveling,
tech,
fashion,
fitness,
gaming,
politics, 
user_id
)
values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,(select max(user_id) from users));