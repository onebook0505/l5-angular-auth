## 基本設定
 
I've also added a 'resend activation email' option and made use of the Lang
class, so this can easily be ported to a new language.

To get up and running, after git cloning, first do (from the app root):

	composer update

	chmod -R 777 storage

	cp .env.example .env

then make sure to set up your database values in .env:

	DB_DATABASE=homestead
	DB_USERNAME=homestead
	DB_PASSWORD=secret

then run:

	php artisan migrate


Then make sure your variables are set up in .env:

	MAIL_DRIVER=smtp
	MAIL_HOST=smtp.gmail.com
	MAIL_PORT=465
	MAIL_USERNAME=user@gmail.com
	MAIL_PASSWORD=password

This should be fine if you've set up a gmail account to run with this.


Then sign up by going to your app.


## 開始使用

open browser : 

	http://yourdomain

change app.js:

	BASE: 'http://yourdomain',
	AUTH: 'http://yourdomain/auth'











