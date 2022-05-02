CREATE TABLE blogs
(
    id     SERIAL PRIMARY KEY,
    author text,
    url    text NOT NULL,
    title  text NOT NULL,
    likes  int default 0
);

INSERT INTO blogs (author, url, title, likes) VALUES ('anaconda', 'urli', 'jee', 5);
INSERT INTO blogs (author, url, title, likes) VALUES ('anaconda', 'urli 2', 'jepulis', 10);