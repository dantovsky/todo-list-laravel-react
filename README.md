# Todo List with Laravel and React

![Todo List with Laravel and React](featured-image.png)

This is a full-stack web application built with Laravel for the backend API and React with TypeScript for the frontend. It's designed as a simple yet functional `Todo List` application as a experimental project monorepo.

See the application runnig in a subdomain:  

**ToDo List with Laravel and React » TypeScript**  
[https://todolist.boowebsites.com](https://todolist.boowebsites.com)

## Folder structure

-   `backend/`: Contains the Laravel backend API code.
-   `frontend/`: Contains the React frontend code.
-   `README.md`: This file, providing an overview of the project.

## Features

-   Create, read, update, and delete (CRUD) operations for todo items.
-   Real-time updates.
-   User-friendly interface.

## How to start the servers

- Backend (Laravel)
    - Go to the backend folder: cd backend
    - Start the server: `php artisan serve`

- Frontend (React)
    - Go to the frontend folder: cd frontend
    - Start the server: `npm run dev`

## How to configure the app in localhost for the first time

- Prerequisites:
    - PHP 8.2 or higher (You can instal XAMPP)
    - MySQL (You can instal XAMPP)
    - Laravel 12.x (this project)
    - Composer
    - Node.js and npm
- Clone the repository:
    ```bash
    git clone https://github.com/dantovsky/todo-list-laravel-react.git
    ```
- Go to the project folder: cd todo-list-laravel-react

- Backend:
    - Go to the backend folder: cd backend
    - Install dependencies: composer install
    - Create a copy of the .env.example file and rename it to .env
    - Generate a new application key: php artisan key:generate
    - Configure the database connection in the .env file
    - Run the migrations: php artisan migrate
    - Run the seeders: php artisan db:seed
    - Start the server: `php artisan serve`

- Frontend:
    - Go to the frontend folder: cd frontend
    - Install dependencies: npm install
    - Start the development server: `npm run dev`

- Access:
    - Frontend: http://localhost:5173

## Deploy

Na Hostinger, fiz as etapas:

1. Criei um subdomínio `https://todolist.boowebsites.com`

2. Conectei o Git, mas tive que reorganizar tudo, então para já não compensa muito

3. Na raíz do subdiretório tenho a estrutura

home » public_html » todolist
- assets (pasta)
- backend_private (pasta com todos os ficheiros do Laravel)
- .htaccess
- favicon.ico
- index.html (do build do React)
- index.php
- robots.txt

4. Alterei o ficheiro `index.php` para apontar o novo caminho da pasta dos ficheiros do Laravel
    ```php
    // Determine if the application is in maintenance mode...
    if (file_exists($maintenance = __DIR__.'/backend_private/storage/framework/maintenance.php')) {
        require $maintenance;
    }

    // Register the Composer autoloader...
    require __DIR__.'/backend_private/vendor/autoload.php';

    // Bootstrap Laravel and handle the request...
    /** @var Application $app */
    $app = require_once __DIR__.'/backend_private/bootstrap/app.php';
    ```

5. Copiei o `index.html` para `backend_private » resources » views` e renomeei para `app.blade.php`

6. Alterei o ficheiro `backend_private » routes » web.php` para chamar a view `app.blade.php`
    ```php
    Route::get('/{any}', function () {
        return view('app'); // Retorna a view app.blade.php
    })->where('any', '.*');
    ```
7. Acessei o server por SSH e fiz os comandos
    ```bash
    cd public_html/todolist
    composer install
    php artisan key:generate
    php artisan migrate 
    ```
    Como obtive erro ao fazer `composer install`, por questões de permissões e restrições do servidor, a solução foi instalar o composer no projeto.
    - Criei uma pasta `bin`
    - Rodei os comandos:
    ```bash
    php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
    php composer-setup.php --install-dir=bin --filename=composer
    php -r "unlink('composer-setup.php');"
    ```
    - Instalei as dependências do projeto:
    ```bash
    ./bin/composer install
    ```

8. Criei o ficheiro `.env` para a versão de produção, alterei as variáveis:
    ```bash
    APP_NAME="Mini Project ToDo List Laravel + React"
    APP_ENV=production
    APP_DEBUG=false
    APP_URL=https://todolist.boowebsites.com

    DB_CONNECTION=mysql
    DB_HOST=localhost
    DB_PORT=3306
    DB_DATABASE=laravel
    DB_USERNAME=laraveluser
    DB_PASSWORD=123456789

    CACHE_STORE=file

    CORS_ALLOWED_ORIGINS=http://localhost:5173,https://todolist.boowebsites.com
    ```

9. Limpar e otimizar (opcional, mas recomendado) » Por SSH
    ```bash
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
    ```

10. No projeto do React, precisei criar dois ficheiros:
    - `.env`
    - `.env.production`

    Em `.env` colocar:
    VITE_API_URL=http://localhost:8000/api

    E em `.env.production` coloquei o endereço da app:
    VITE_API_URL=https://todolist.boowebsites.com/api

    No ficheiro `todoService.ts`:
    ```ts
    const api = axios.create({
        baseURL: import.meta.env.VITE_API_URL, // Variável de ambiente VITE_API_URL
    });

    export const getTasks = async () => {
        const response = await api.get('/todos'); // Utilização de um endpoint
    return response.data;
    };
    ```

    `(!)` Quando faço o build do React (`npm run build`) ele se encarrega de injetar os valores corretos do `.env.production` ao ficheiro final.

`Help Links`

- How to Connect to a Hosting Plan via SSH  
  https://support.hostinger.com/en/articles/1583245-how-to-connect-to-a-hosting-plan-via-ssh