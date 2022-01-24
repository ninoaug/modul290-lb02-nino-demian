create table customer
(
    id            int auto_increment
        primary key,
    Email         varchar(50) not null,
    Benutzername  varchar(25) not null,
    Passwort      varchar(50) not null,
    Telefonnummer datetime    not null
)
    charset = utf8;

