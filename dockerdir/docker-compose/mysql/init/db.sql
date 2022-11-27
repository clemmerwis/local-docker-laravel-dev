# create databases
CREATE DATABASE IF NOT EXISTS `appname`;

# create local_developer user and grant rights
CREATE USER 'local_developer'@'db' IDENTIFIED BY 'local_secret';
GRANT ALL PRIVILEGES ON *.* TO 'local_developer'@'%';