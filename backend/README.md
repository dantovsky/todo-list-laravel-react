<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
Backend API for the Todo List application.
</p>

## How to start the server

In command line:
```
php artisan serve
```

## How to use the API endpoints

### GET » Listar todas as tarefas

http://localhost:8000/api/todos

Response:
```json
[
	{
		"id": 1,
		"title": "Comprar leite",
		"completed": 0,
		"created_at": "2025-03-01T17:48:45.000000Z",
		"updated_at": "2025-03-01T17:48:45.000000Z"
	},
	{
		"id": 2,
		"title": "Comprar pão",
		"completed": 0,
		"created_at": "2025-03-01T17:49:24.000000Z",
		"updated_at": "2025-03-01T17:49:24.000000Z"
	},
    {
		"id": 3,
		"title": "Comprar ovos",
		"completed": 0,
		"created_at": "2025-03-01T17:49:24.000000Z",
		"updated_at": "2025-03-01T17:49:24.000000Z"
	}
]
```

### GET » Listar uma tarefa

http://localhost:8000/api/todos/2

Response:
```json
{
    "id": 2,
    "title": "Comprar pão",
    "completed": 0,
    "created_at": "2025-03-01T17:49:24.000000Z",
    "updated_at": "2025-03-01T17:49:24.000000Z"
}
```

### POST

http://localhost:8000/api/todos

Body:
```json
{
	"title": "Comprar café"
}
```

Response:
```json
{
	"title": "Cinema com a namorada",
	"completed": false,
	"updated_at": "2025-03-01T18:19:59.000000Z",
	"created_at": "2025-03-01T18:19:59.000000Z",
	"id": 5
}
```

### PUT

http://localhost:8000/api/todos/3

Body:
```json
{
	"title": "Comprar pão de cementes",
	"completed": true
}
```

Response:
```json
{
	"id": 2,
	"title": "Comprar pão de cementes",
	"completed": true,
	"created_at": "2025-03-01T17:49:24.000000Z",
	"updated_at": "2025-03-01T19:07:22.000000Z"
}
```

### DELETE » Remover uma tarefa

http://localhost:8000/api/todos/6

Response:
```json
{
	"status": "success",
	"message": "Deleted successfully!",
	"item_deleted": {
		"id": 6,
		"title": "Cinema com turma",
		"completed": 0,
		"created_at": "2025-03-01T18:56:37.000000Z",
		"updated_at": "2025-03-01T18:56:37.000000Z"
	}
}
```