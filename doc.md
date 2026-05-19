# Документация проекта Classified (Next.js)

## 1. Общая архитектура

Проект реализован на **Next.js 16 (App Router)** с **TypeScript**. Сборка — **Turbopack** (дефолтный для Next.js 16).

### Стек технологий

| Компонент | Технология |
|-----------|-----------|
| Фреймворк | Next.js 16.2.6 |
| Язык | TypeScript 5 |
| UI-библиотека | Mantine v8.3.18 |
| Иконки | @tabler/icons-react |
| HTTP-клиент | axios |
| Управление состоянием | MobX 6 + mobx-react-lite 4 |
| Стилизация | Mantine CSS + CSS-переменные + Tailwind CSS v4 |
| SEO | next/metadata + sitemap.xml + robots.txt |

### Архитектура FSD

Проект следует принципам **Feature-Sliced Design (FSD)**:

```
src/
├── app/            # Инициализация приложения (store, providers)
├── shared/         # Переиспользуемые модули (types, api, config)
├── widgets/        # Композиционные компоненты (AppLayout, ServiceCard, Providers)
├── wrappers/       # Компоненты-обёртки (CommonWrapper, AuthWrapper)
```

Next.js `app/` выступает в роли **pages** слоя FSD (маршрутизация).

---

## 2. Структура папок и файлов

```
classified-project-frontend-next/
│
├── app/                              # Next.js App Router (страницы)
│   ├── layout.tsx                    # Корневой layout (Metadata, OpenGraph, Providers)
│   ├── page.tsx                      # Лендинг (SSR, server component)
│   ├── not-found.tsx                 # Глобальная 404
│   ├── global-error.tsx              # Глобальная ошибка (error boundary)
│   ├── globals.css                   # Глобальные стили + CSS-переменные темы
│   ├── sitemap.ts                    # Генерация sitemap.xml
│   ├── robots.ts                     # Генерация robots.txt
│   │
│   ├── login/
│   │   └── page.tsx                  # Вход (CSR, client component)
│   │
│   ├── register/
│   │   └── page.tsx                  # Регистрация (CSR, client component)
│   │
│   └── (dashboard)/                  # Группа маршрутов после авторизации
│       ├── layout.tsx                # Dashboard layout (AppLayout)
│       ├── loading.tsx               # Загрузка dashboard
│       ├── error.tsx                 # Ошибка dashboard
│       ├── not-found.tsx             # 404 внутри dashboard
│       │
│       ├── feed/                     # Лента объявлений
│       │   ├── page.tsx
│       │   ├── loading.tsx
│       │   └── error.tsx
│       │
│       ├── profile/                  # Личный кабинет
│       │   ├── page.tsx
│       │   ├── loading.tsx
│       │   ├── error.tsx
│       │   └── edit/                 # Редактирование профиля
│       │       ├── page.tsx
│       │       ├── loading.tsx
│       │       └── error.tsx
│       │
│       ├── create/                   # Создание объявления
│       │   ├── page.tsx
│       │   ├── loading.tsx
│       │   └── error.tsx
│       │
│       ├── card/
│       │   └── [id]/                 # Детальная страница объявления
│       │       ├── page.tsx
│       │       ├── loading.tsx
│       │       └── error.tsx
│       │
│       ├── services/                 # Категории услуг (доп. страница)
│       │   ├── page.tsx
│       │   ├── loading.tsx
│       │   └── error.tsx
│       │
│       ├── favorites/                # Избранное (доп. страница)
│       │   ├── page.tsx
│       │   ├── loading.tsx
│       │   └── error.tsx
│       │
│       └── about/                    # О нас (доп. страница, SSR)
│           ├── page.tsx
│           ├── loading.tsx
│           └── error.tsx
│
├── src/
│   ├── app/
│   │   └── store/                    # MobX стори
│   │       ├── RootStore.ts          # Оркестратор (общий store)
│   │       ├── UserStore.ts          # Store пользователя (токен, профиль)
│   │       ├── ServicesStore.ts      # Store объявлений
│   │       ├── SettingsStore.ts      # Store настроек (тема, язык)
│   │       └── index.tsx             # StoreProvider + хук useStore
│   │
│   ├── shared/
│   │   ├── api/                      # HTTP-слой
│   │   │   ├── axios.ts              # Axios instance (interceptors)
│   │   │   ├── authApi.ts            # API авторизации
│   │   │   └── cardsApi.ts           # API объявлений
│   │   │
│   │   ├── types/                    # TypeScript типы
│   │   │   ├── user.ts               # Тип User
│   │   │   ├── service.ts            # Тип Service
│   │   │   ├── auth.ts               # Типы LoginDTO, RegisterDTO, CreateCardDto
│   │   │   └── index.ts              # Реэкспорты
│   │   │
│   │   └── config/
│   │       └── routes.ts             # Константы путей
│   │
│   ├── widgets/
│   │   ├── AppLayout/                # Шапка: тема, меню, выход
│   │   │   └── index.tsx
│   │   ├── ServiceCard/              # Карточка объявления
│   │   │   └── index.tsx
│   │   └── Providers/                # Композиция провайдеров
│   │       └── index.tsx
│   │
│   └── wrappers/
│       ├── CommonWrapper.tsx          # Управление data-theme на <html>
│       └── AuthWrapper.tsx            # Защита маршрутов + восстановление сессии
│
├── public/
│   ├── favicon.ico                   # Иконка сайта
│   ├── manifest.json                 # PWA манифест
│   └── cardsImgs/                    # Изображения для карточек
│
├── .env                              # NEXT_PUBLIC_API_URL
├── next.config.ts                    # Конфиг Next.js
├── tsconfig.json                     # TypeScript + path aliases
├── postcss.config.mjs                # PostCSS (Mantine + Tailwind)
├── package.json
└── doc.md                            # Данный файл
```

### Назначение path aliases (tsconfig.json)

```json
{
  "paths": {
    "@/*": ["./src/*"]
  }
}
```

Все импорты из `src/` используют префикс `@/`, например:
```typescript
import { UserStore } from "@/app/store/UserStore";
import { authApi } from "@/shared/api/authApi";
```

---

## 3. Порядок загрузки и выполнения кода

### 3.1. Первый запуск (SSR)

```
1. Запрос к серверу (например, GET /)
       │
2. Next.js Middleware (если есть proxy.ts) → здесь не используется
       │
3. app/layout.tsx (RootLayout)
   ├── Метаданные (title, description, OpenGraph, manifest)
   ├── globals.css (CSS-переменные темы + Mantine styles)
   └── <Providers>
       ├── StoreProvider (инициализация MobX RootStore)
       ├── MantineProvider (UI-тема)
       ├── CommonWrapper (применение data-theme на <html>)
       └── AuthWrapper (проверка авторизации)
            └── {children} → app/page.tsx (Лендинг)
       │
4. app/page.tsx (серверный компонент) → SSR
   ├── HTML генерируется на сервере
   └── Отправляется клиенту (без JS для этой страницы)
```

### 3.2. Клиентская гидратация

```
1. Браузер получает HTML + JS-бандлы
2. React гидратирует страницу
3. CommonWrapper useEffect: применяет сохранённую тему (data-theme)
4. AuthWrapper useEffect:
   ├── Если есть token в localStorage, но нет user в store
   │   → GET /auth/profile (восстановление сессии)
   └── Если token отсутствует и маршрут не публичный
       → редирект на /login (router.push)
```

### 3.3. Аутентификация (Login)

```
1. Пользователь вводит телефон/пароль → нажимает "Войти"
2. handleLogin() в login/page.tsx
3. userStore.login(dto) → authApi.login(dto)
   └── POST /auth/login (axios)
       ├── Успех: setToken(data.token) + user = data.user → router.push("/feed")
       └── Ошибка: catch → console.error
4. MobX: setToken сохраняет token в observable + localStorage
5. Observer-компоненты (AuthWrapper, AppLayout) реагируют на изменения
6. router.push("/feed") → клиентская навигация на /feed
7. FeedPage mount → useEffect → cardsApi.getAll()
   └── GET /cards (с Bearer token в заголовке)
       ├── Успех: servicesStore.setItems(data) → рендер карточек
       └── Ошибка: servicesStore.setError(msg) → показ ошибки
```

### 3.4. Жизненный цикл MobX Store

```
Создание RootStore (один раз, StoreProvider с useRef)
       │
├── UserStore
│   ├── token: string | null ← localStorage.getItem("token")
│   ├── user: User | null
│   ├── login(dto) → POST /auth/login → setToken + setUser
│   ├── register(dto) → POST /auth/register → setToken + setUser
│   ├── fetchProfile() → GET /auth/profile → setUser
│   ├── updateProfile(data) → PATCH /auth/profile → setUser
│   ├── deleteProfile() → DELETE /auth/profile → logout
│   └── logout() → token=null, user=null, localStorage.removeItem
│
├── ServicesStore
│   ├── items: Service[] (все объявления)
│   ├── myItems: Service[] (объявления пользователя)
│   ├── loading: boolean
│   ├── error: string | null
│   ├── setItems / setMyItems / setLoading / setError
│   └── clearMyItems() (при logout)
│
└── SettingsStore
    ├── theme: "light" | "dark" ← localStorage.getItem("theme")
    ├── language: string ← localStorage.getItem("lang")
    ├── toggleTheme()
    ├── setTheme()
    └── setLanguage()
```

**Важно:** Для реактивности все компоненты, использующие observable-значения, обёрнуты в `observer()` из mobx-react-lite. Без этого изменения в сторах не вызывают ререндер.

---

## 4. Описание компонентов и страниц

### 4.1. Провайдеры (`src/widgets/Providers/index.tsx`)

Компонент-композитор, собирающий все провайдеры в правильном порядке:

```
StoreProvider → MantineProvider → CommonWrapper → AuthWrapper → children
```

- **StoreProvider** — MobX контекст (RootStore)
- **MantineProvider** — Тема Mantine (createTheme)
- **CommonWrapper** — Применяет тему к `<html>` через `data-theme`
- **AuthWrapper** — Защита маршрутов + восстановление сессии

### 4.2. Страницы

#### `/` — Лендинг (SSR)
- **Тип:** Server Component (без `"use client"`)
- **Описание:** Полностью серверный рендеринг. Крупный заголовок "Здесь находят спрос и предложение друг друга", кнопка "хочу!" которая ведёт на `/feed` (через `component="a"`)
- **Данные:** Нет загрузки данных, чистая вёрстка

#### `/login` — Вход (CSR)
- **Тип:** Client Component
- **Описание:** Форма: телефон + пароль + кнопка "Войти"
- **Данные:** `POST /auth/login` (axios)
- **Успех:** Редирект на `/feed`
- **Ошибка:** Лог в консоль

#### `/register` — Регистрация (CSR)
- **Тип:** Client Component
- **Описание:** Форма: телефон + пароль + подтверждение пароля
- **Данные:** `POST /auth/register` (axios)
- **Валидация:** Совпадение паролей (alert)

#### `/feed` — Лента объявлений (CSR)
- **Тип:** Client Component + `observer`
- **Описание:** Сетка карточек объявлений (SimpleGrid 1-3 колонки)
- **Данные:** `GET /cards` (axios) при монтировании
- **Состояния:** Loading → пусто → error → карточки

#### `/profile` — Личный кабинет (CSR)
- **Тип:** Client Component + `observer`
- **Описание:** Аватар, имя, телефон, рейтинг, город, дата регистрации + список своих объявлений
- **Данные:** `GET /auth/profile` (из AuthWrapper), `GET /cards/my` (axios)
- **Кнопка:** Редактировать (ведёт на `/profile/edit`)

#### `/profile/edit` — Редактирование профиля (CSR)
- **Тип:** Client Component + `observer`
- **Описание:** Инпут имени, кнопки сохранить/отмена/удалить профиль
- **Данные:** `PATCH /auth/profile`, `DELETE /auth/profile`
- **Модалка:** Подтверждение удаления

#### `/create` — Создание объявления (CSR)
- **Тип:** Client Component
- **Описание:** Форма: название, описание, цена, URL картинки, категория (Select)
- **Данные:** `POST /cards` (axios)
- **Успех:** Редирект на `/feed`

#### `/card/[id]` — Детальная страница (CSR)
- **Тип:** Client Component (динамический маршрут)
- **Описание:** Крупное изображение, категория, заголовок, описание, цена
- **Данные:** `GET /cards/:id` (axios) при монтировании
- **Состояния:** Loading → "Карточка не найдена" → детали

#### `/services` — Категории услуг (CSR)
- **Тип:** Client Component + `observer`
- **Описание:** Список уникальных категорий с количеством объявлений
- **Данные:** `GET /cards` (axios) — группировка по категориям на клиенте

#### `/favorites` — Избранное (CSR)
- **Тип:** Client Component
- **Описание:** Заглушка с иконкой сердца — функционал в разработке

#### `/about` — О нас (SSR)
- **Тип:** Server Component
- **Описание:** Статическая страница с описанием проекта и контактами

---

## 5. HTTP-слой (Axios)

### `src/shared/api/axios.ts`

```typescript
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  timeout: 10000,
});
```

**Request interceptor:** добавляет `Authorization: Bearer <token>` из localStorage.

**Response interceptor:** при 401 удаляет token из localStorage. При любой ошибке логирует и пробрасывает дальше через `Promise.reject`.

**Реализованные HTTP-методы:**
| Метод | Эндпоинт | Назначение |
|-------|----------|-----------|
| GET | `/cards` | Все объявления |
| GET | `/cards/my` | Мои объявления |
| GET | `/cards/:id` | Одно объявление |
| POST | `/auth/login` | Вход |
| POST | `/auth/register` | Регистрация |
| POST | `/cards` | Создать объявление |
| PATCH | `/auth/profile` | Обновить профиль |
| PUT | `/cards/:id` | Обновить объявление |
| DELETE | `/auth/profile` | Удалить профиль |

---

## 6. Темизация

Смена темы реализована через CSS-переменные на элементе `<html>`:

```css
:root[data-theme="light"] {
  --secondary-color: #28264b;
  --base-color: #e8eae7;
  --accent-color: #a40033;
  /* ... */
}

:root[data-theme="dark"] {
  --secondary-color: #e8eae7;
  --base-color: #28264b;
  /* ... */
}
```

**Механизм работы:**
1. `SettingsStore.theme` — observable (light/dark)
2. `CommonWrapper` (observer) следит за `settingsStore.theme`
3. При изменении темы → `useEffect` → `document.documentElement.setAttribute("data-theme", theme)`
4. Все Mantine-компоненты используют `var(--*)` для цветов
5. Тема сохраняется в `localStorage`

---

## 7. SEO и Метаданные

### `app/layout.tsx` (RootLayout)

```typescript
export const metadata: Metadata = {
  title: { default: "Classified — Доска объявлений", template: "%s | Classified" },
  description: "Здесь находят спрос и предложение друг друга.",
  icons: { icon: "/favicon.ico" },
  manifest: "/manifest.json",
  openGraph: {
    title: "Classified — Доска объявлений",
    url: "http://localhost:3000",
    siteName: "Classified",
    locale: "ru_RU",
    type: "website",
  },
};
```

### `app/sitemap.ts`
Генерирует `sitemap.xml` со всеми статическими страницами и их приоритетами.

### `app/robots.ts`
Генерирует `robots.txt` — разрешает индексацию всех страниц, кроме профиля и создания.

### `public/manifest.json`
PWA-манифест с иконками, цветами и названием.

---

## 8. Обработка ошибок

| Компонент | Назначение |
|-----------|-----------|
| `app/not-found.tsx` | 404 — глобальная страница не найдена |
| `app/global-error.tsx` | Критическая ошибка на уровне приложения |
| `app/(dashboard)/error.tsx` | Ошибка внутри dashboard |
| `app/(dashboard)/not-found.tsx` | 404 внутри dashboard |
| `[page]/error.tsx` | Ошибка конкретной страницы |
| `[page]/loading.tsx` | Состояние загрузки страницы |

**HTTP-коды ответов:**
- 200 — все валидные маршруты
- 404 — несуществующие маршруты
- 500 → error.tsx (error boundary, не ломает визуал)

---

## 9. Зависимости (package.json)

**scripts:**
```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint ."
}
```

**dependencies:** next, react, react-dom, mobx, mobx-react-lite, @mantine/core, @mantine/hooks, @tabler/icons-react, axios

**devDependencies:** TypeScript, ESLint, Tailwind CSS, postcss-preset-mantine, @types/*
