# Messenger

Учебный проект мессенджера для курса Яндекс Практикума. Сейчас проект находится на ранней стадии разработки: реализована статическая верстка страниц на Handlebars и CSS, подключена сборка через Vite.

В проекте использован стандартный дизайн от Практикума:
[макет в Figma](https://www.figma.com/design/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=0-1&p=f&t=YOQ4orgNIn5cl1n7-0).

## Демо

Проект на Netlify: https://example-messenger.netlify.app

## Установка

```bash
npm install
```

## Команды

```bash
npm run dev
```

Запускает проект в режиме разработки. По умолчанию приложение доступно по адресу `http://localhost:8000`.

```bash
npm run build
```

Собирает production-версию проекта в директорию `dist`.

```bash
npm run preview
```

Запускает локальный preview production-сборки.

## Страницы

После запуска проекта страницы можно посмотреть по следующим роутам:

- `/` — страница чатов.
- `/login` — страница входа.
- `/signin` — страница регистрации.
- `/settings` — профиль пользователя.
- `/settings/edit` — редактирование данных профиля.
- `/settings/password` — изменение пароля.
- `/404` — страница ошибки 404.
- `/500` — страница ошибки 500.

## Стек

- TypeScript
- Vite
- Handlebars
- CSS
