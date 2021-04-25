# Ай-нане-нане-мессенджер

[![Netlify Status](https://api.netlify.com/api/v1/badges/9f72ae4f-0d96-4b80-9194-fb218268bdb7/deploy-status)](https://app.netlify.com/sites/nane-messenger/deploys)

Демо тут https://nane-messenger.netlify.app/

## Описание

Мессенджер для тестового задания https://github.com/tada-team/nane

### Некоторые важные особенности проекта

- Проект написан на Vue2 с использованием Typescript.

- Типизирован стор (vuex) и его вызовы (обращение происходит через `accessor`):
  ```typescript
  this.$accessor.settings.max_room_title_length; // number
  ```
- Для верстки использую замечательную utility-first scc-библиотеку [Tailwindcss](Tailwindcss.com) помогающая быстро и легко верстать

## Запуск мессенджера

### В режиме разработки:

```
npm install
npm run serve
```

### Компиляция для развертывания в проде

```
npm run build
```

## Что ещё хотелось бы сделать...

- оптимизировать рендеринг сообщений: динамически подгружать историю при прокрутке
- добавить какое-нибудь уведомление о новый сообщениях
- подкорректировать верстку под мобильное разрешение (добавить drawer со списком комнат)
- написать парочку тестов
