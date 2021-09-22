-- select all users that have liked a specific post

SELECT *
FROM users
JOIN likes on likes.user.id;
JOIN posts on likes.posts.id;