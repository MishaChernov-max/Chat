Chat App
Фуллстек чат:

Backend: Node.js + Express + MongoDB (Mongoose), JWT, Socket.IO

Frontend: React + Vite + TypeScript + Redux Toolkit

Взаимодействие по REST + WebSocket

Монорепа: backend и frontend в одном репозитории

Требования
Node.js (рекомендуется LTS 18+)

npm

MongoDB (локально или в облаке)

Рекомендуется установить VS Code и расширения для:

ESLint / Prettier

TypeScript

React

Структура проекта:

Backend (сервер):

точка входа сервера: файл с Express и Socket.IO (например, src/index.ts или server.ts)

роутеры:

router/router.ts — главный роутер /api

router/chatRouter.ts — роуты для чатов

router/messageRouter.ts — роуты для сообщений

router/userRouter.ts — роуты для пользователей

router/authRouter.ts — аутентификация

контроллеры:

controllers/chat-controller.ts

controllers/message-controller.ts

controllers/user-controller.ts

middleware:

middleware/auth.ts — accessTokenMiddleware

сервисы:

service/token-service.ts — работа с JWT

модели (Mongoose-схемы) для пользователей, чатов, сообщений

подключение к MongoDB через mongoose.connect(DB_URL)

Frontend (клиент):

Vite React TypeScript проект

src/

api/

instance.ts — axios-инстанс с baseURL = VITE_API_CONFIG

chats.ts, messages.ts, users.ts, groups.ts — функции для запросов к API

components/ — все UI-компоненты (Chat, Messages, Groups, AuthForm и т.д.)

pages/ — страницы (HomePage, LoginPage)

store/ — Redux Toolkit:

slices: authSlice, chatsSlice, messagesSlice, usersSlice, groupSlice

context/ — контексты (ThemeContext, SocketContext)

hooks/ — кастомные хуки (useFetchChats, useSendMessage, useLoginPage и др.)

theme/ — lightTheme/darkTheme

utils/ — утилиты (formatTime, escapeHtml и др.)

Переменные окружения
Backend (.env в корне сервера)
Создай файл .env рядом с backend-проектом 

DB_URL=mongodb+srv://root:12345@cluster0.yop9qjf.mongodb.net/chat_db?retryWrites=true&w=majority
PORT=5000
FRONTENDPORT=http://localhost:5173

Назначение:

DB_URL — строка подключения к MongoDB (Atlas)

PORT — порт, на котором стартует backend (http://localhost:5000)

FRONTENDPORT — адрес фронтенда для CORS

В сервере CORS должен использовать FRONTENDPORT, например:

origin: process.env.FRONTENDPORT || "http://localhost:5173"

API монтируется как:

app.use("/api", router)

Frontend (.env на клиенте)
В Vite-проекте создай .env:

VITE_API_CONFIG=http://localhost:5000/api

Назначение:

VITE_API_CONFIG — базовый URL для axios-инстанса на фронте.

Пример в instance.ts:

baseURL: import.meta.env.VITE_API_CONFIG

Запуск проекта

1. Установить зависимости
   Backend:

cd в папку сервера (там, где package.json бекенда)

npm install

Frontend:

cd в папку клиента (Vite-проект)

npm install

Если у тебя монорепа с двумя package.json, запускай команды в каждой части отдельно.

2. Настроить .env
   Backend:

Создай .env и заполни:

DB_URL=...

PORT=5000

FRONTENDPORT=http://localhost:5173

Frontend:

В папке клиента создай .env:

VITE_API_CONFIG=http://localhost:5000/api

3. Запуск backend
   В папке сервера:

npm run dev

Сервер поднимется на:

http://localhost:5000

API будет доступно по префиксу /api (например, http://localhost:5000/api/auth/login)

4. Запуск frontend
   В папке клиента:

npm run dev

По умолчанию Vite запустится на:

http://localhost:5173

Фронт будет ходить на API по адресу из VITE_API_CONFIG: http://localhost:5000/api.

Основные эндпоинты API

app.use("/api", router)

В router/router.ts:

router.use("/chats", chatRouter)

router.use("/messages", messageRouter)

router.use("/users", userRouter)

router.use("/auth", authRouter)​

Аутентификация (/api/auth)
POST /api/auth/registration

Регистрация пользователя

POST /api/auth/login

Логин, выдаёт access/refresh токены

POST /api/auth/refresh

Обновление access токена по refresh токену

Чаты (/api/chats)
chatRouter:

POST /api/chats

Создать или получить чат по паре пользователей

Тело запроса: { currentUserId, friendUserId }

GET /api/chats/chat/:id

Получить конкретный чат по id

GET /api/chats/:userId

Получить список чатов для пользователя userId

Сообщения (/api/messages)
messageRouter:

GET /api/messages

Получить сообщения (либо все, либо с параметрами — зависит от контроллера)

Пользователи (/api/users)
userRouter (все роуты под accessTokenMiddleware):

PATCH /api/users/me

Обновить информацию о текущем пользователе

GET /api/users

Получить список пользователей

GET /api/users/user/:id

Получить пользователя по id

GET /api/users/search

Поиск пользователей по строке (query-параметры)

Frontend и взаимодействие с API

Фронт использует axios-инстанс:

baseURL: import.meta.env.VITE_API_CONFIG (http://localhost:5000/api)

Примеры функций:

getChats(userId)

GET /chats/:userId → /api/chats/:userId

getChat(currentUserId, friendUserId)

POST /chats → /api/chats

getChatById(chatId)

GET /chats/chat/:chatId → /api/chats/chat/:chatId

Компоненты используют хуки (useFetchChats, useSendMessage и др.), которые дергают эти функции и кладут данные в Redux слайсы (chatsSlice, messagesSlice и т.п.).

WebSocket (Socket.IO)
Сервер:

создаёт HTTP сервер через createServer(app)

инициализирует Socket.IO:

const io = new Server(server, { cors: { origin: "\*", methods: ["GET", "POST"] } })

Подключение пользователя:

проверка токена в io.use(...)

socket.join(userId)

рассылка событий:

"new-user-online"

"get-users-online"

"disconnect-user"

"new-message" при отправке сообщения

Фронт:

создаёт подключение к Socket.IO и использует SocketContext

слушает события новых сообщений, статусов, typing и т.п.

Полезные примечания
CORS:

на бэке используй origin: process.env.FRONTENDPORT, чтобы совпадало с фронтом

Все URL на фронте должны быть относительными к VITE_API_CONFIG ("/auth/login", "/chats", "/users" и т.п.)
