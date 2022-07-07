# ELEARNING SYSTEM

### Made with

[![React][React.js]][React-url] [![Laravel][Laravel.com]][Laravel-url] [![Tailwind][Tailwind.com]][Tailwind-url] [![Mysql][Mysql.com]][Mysql-url]

### Project pre-requisites
`PHP 8.*`
`Laravel 8`
`Composer`
`Npm`
`Xampp`

### Cloning the repository
```sh 
$ git clone https://github.com/framgia/sph-els-gab
$ git pull
```
### Initializing the project for development
#### Backend
```sh 
$ cd elearning-backend/
$ composer
$ php artisan migrate:fresh
```
### Add the following to .env file
`SESSION_DOMAIN=http://localhost:3000`
`SANCTUM_STATEFUL_DOMAINS=http://localhost:3000`
#### Frontend
```sh 
$ cd elearning-frontend/
$ npm i
```

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Tailwind.com]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[Mysql.com]: https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white
[Mysql-url]: https://www.mysql.com/