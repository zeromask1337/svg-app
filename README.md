# svg-app
This is a NodeJS app working on Express and MySQL2.

My test .env looked like this

```
DATABASE=mysql-db
DATABASE_USER=flippy
DATABASE_PASS=123456
```

### Install packages

```
npm start
```

### Start with

```
npm start
```

Additionaly you have to install MySQL, I used Docker for it.

Here are commands for SQL tables

```
CREATE TABLE svg_group ( id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(50) );
CREATE TABLE svg ( id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, label VARCHAR(50), group_id INT NOT NULL, svg TEXT );
ALTER TABLE svg add FOREIGN KEY (group_id) REFERENCES svg_group(id);
```
