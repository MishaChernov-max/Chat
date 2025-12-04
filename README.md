
# Chat App – Продакшн сборка и структура

## Запуск продакшн сборки фронтенда

1.  Собрать проект:
    

`npm run build` 

2.  Запустить preview-сервер, который использует собранную папку  `dist`:
    
`npm run preview` 

3.  Открыть в браузере:
   

`http://localhost:4173` 

----------
## Технологии и структура проекта

## Backend

-   Node.js + Express + MongoDB (Mongoose)
    
-   JWT для аутентификации
    
-   Socket.IO для WebSocket соединения
    
-   Точка входа: файл  `src/index.ts` 
    
-   Роутеры в папке  `router/`  для чатов, сообщений, пользователей, аутентификации
    
-   Контроллеры в  `controllers/`
    
-   Middleware для доступа и проверки токенов в  `middleware/`
    
-   Работа с JWT в сервисе  `service/token-service.ts`
    
-   MongoDB подключение через  `mongoose.connect(DB_URL)`
    

## Frontend

-   React + Vite + TypeScript + Redux Toolkit
    
-   Папки и файлы:
    
    -   `src/api/`  — axios-инстанс и API-функции (chats.ts, messages.ts и др.)
        
    -   `src/components/`  — UI-компоненты (чат, сообщения, формы)
        
    -   `src/pages/`  — страницы (Home, Login)
        
    -   `src/store/`  — Redux Toolkit слайсы (authSlice, chatsSlice и пр.)
        
    -   `src/context/`  — React контексты (ThemeContext, SocketContext)
        
    -   `src/hooks/`  — кастомные React хуки (useFetchChats, useSendMessage и др.)
        
    -   `src/theme/`  — темы (светлая/темная)
        
    -   `src/utils/`  — утилиты (формат времени и др.)
        

----------

## Переменные окружения (.env)

## Backend (.env рядом с backend)

text

`DB_URL=mongodb+srv://root:12345@cluster0.yop9qjf.mongodb.net/chat_db?retryWrites=true&w=majority PORT=5000 FRONTENDPORT=http://localhost:5173` 

-   `DB_URL`  — строка подключения к MongoDB (локально или Atlas)
    
-   `PORT`  — порт backend сервера ([http://localhost:5000](http://localhost:5000/))
    
-   `FRONTENDPORT`  — адрес фронтенда для CORS (например,  [http://localhost:5173](http://localhost:5173/))
    

В backend CORS должен использовать эту переменную, пример:

ts

`origin: process.env.FRONTENDPORT  ||  "http://localhost:5173"` 

----------

## Frontend (.env в корне Vite проекта)

text

`VITE_API_CONFIG=http://localhost:5000/api` 

-   Для axios базовый URL берётся из  `import.meta.env.VITE_API_CONFIG`
    

Пример axios-instance:

`baseURL:  import.meta.env.VITE_API_CONFIG` 

----------

## Команды для запуска проекта

1.  Установить зависимости
    

Backend:



`cd backend npm  install` 

Frontend:



`cd frontend npm  install` 

2.  Настроить .env файлы в каждом проекте (backend и frontend).
    
3.  Запуск backend:
    

`cd backend npm run dev` 

API будет работать на:  [http://localhost:5000/api](http://localhost:5000/api)

4.  Запуск frontend во время разработки:
    


`cd frontend npm run dev` 

Vite будет работать на:  [http://localhost:5173](http://localhost:5173/)

5.  Запуск продакшн сборки фронтенда:
    



`cd frontend npm run build npm run preview` 

Открыть  [http://localhost:4173](http://localhost:4173/)  для просмотра продакшн-варианта.

----------

## Взаимодействие и WebSocket

-   Backend создает сервер через  `createServer(app)`
    
-   Инициализация Socket.IO с CORS для фронтенда
    
-   Сервер проверяет токены клиентов через middleware в Socket.IO
    
-   Клиенты подключаются и находятся в комнатах по userId
    
-   Рассылаются события  `new-user-online`,  `new-message`  и другие
    
-   Frontend подключается через SocketContext к Socket.IO, слушая события
    

----------

## Основные API Endpoints (префикс /api)

Роутер

Действие

Пример URL

/auth

Регистрация, логин, refresh

POST /api/auth/login

/chats

Создать/получить чат

GET /api/chats/:userId

/messages

Получить список сообщений

GET /api/messages

/users

Получить/обновить пользователя

GET /api/users
