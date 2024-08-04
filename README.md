# API для управления коллекцией книг

# Установка и запуск в Docker

1. Клонируйте репозиторий:
    ```bash
    git clone https://github.com/pvk04/book-collection-api.git
    cd book-collection-api
    ```

2. Сборка и запуск контейнеров:
   ```bash
   docker-compose up --build
   ```

3. Инициализирование базы данных:
   ```bash
   docker exec -it book-collection-api-app-1 npx prisma migrate dev --name init
   ```

Cервер будет запущен на `http://localhost:3001`.
