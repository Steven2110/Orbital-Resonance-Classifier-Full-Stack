# Text Analysis & ML Prediction Platform

A full-stack web application for uploading text files, generating visualizations, and running machine learning predictions.

## Languages

- [English](#english)
- [Русский](#русский)

---

# English

## Requirements

- **Python**: `3.11` recommended (works best with `tensorflow==2.18.0` and the pinned scientific stack in `backend/requirements.txt`)
- **Node.js**: `>= 18` (recommended)
- **npm**: comes with Node.js

## Install the correct Python version

### Option A (recommended): pyenv

1. Install pyenv
   - macOS (Homebrew):
     - `brew install pyenv`
2. Install Python 3.11 (example)
   - `pyenv install 3.11.9`
3. Use it for this project
   - `pyenv local 3.11.9`

### Option B: Homebrew Python

- Install:
  - `brew install python@3.11`
- Confirm:
  - `python3 --version`

### Windows: Official Python installer (recommended)

1. Download Python 3.11.x from:
   - https://www.python.org/downloads/
2. During installation:
   - Enable **Add python.exe to PATH**
3. Confirm in PowerShell:
   - `python --version`
   - `py --version`

### Windows: Install with winget (alternative)

- `winget install -e --id Python.Python.3.11`

## Backend (Django) — Setup & Run

### 1) Create and activate a virtual environment

From the repository root:

1. Go to backend
   - `cd backend`
2. Create venv
   - macOS/Linux:
     - `python3 -m venv venv`
   - Windows (PowerShell):
     - `py -3.11 -m venv venv`
3. Activate venv
   - macOS/Linux:
     - `source venv/bin/activate`
   - Windows (PowerShell):
     - `venv\Scripts\Activate.ps1`
   - Windows (cmd.exe):
     - `venv\Scripts\activate.bat`

If PowerShell blocks activation, run this once in an elevated PowerShell:

- `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

### 2) Install backend dependencies

- `pip install -r requirements.txt`

### 3) Run database migrations

- `python manage.py migrate`

### 4) Start the backend server

- `python manage.py runserver`

Backend will be available at:

- `http://localhost:8000`

## Frontend (React) — Setup & Run

From the repository root:

1. Go to frontend
   - `cd frontend`
2. Install dependencies
   - `npm install`
3. Start dev server
   - `npm start`

Frontend will be available at:

- `http://localhost:3000`

### Windows notes for frontend

- Install Node.js LTS from:
  - https://nodejs.org/
- Or via winget:
  - `winget install -e --id OpenJS.NodeJS.LTS`
- Confirm:
  - `node --version`
  - `npm --version`

---

# Русский

## Требования

- **Python**: рекомендуется `3.11` (лучше всего подходит для `tensorflow==2.18.0` и библиотек из `backend/requirements.txt`)
- **Node.js**: рекомендуется `>= 18`
- **npm**: устанавливается вместе с Node.js

## Установка правильной версии Python

### Вариант A (рекомендуется): pyenv

1. Установите pyenv
   - macOS (Homebrew):
     - `brew install pyenv`
2. Установите Python 3.11 (пример)
   - `pyenv install 3.11.9`
3. Используйте эту версию для проекта
   - `pyenv local 3.11.9`

### Вариант B: Python через Homebrew

- Установить:
  - `brew install python@3.11`
- Проверить:
  - `python3 --version`

### Windows: официальный установщик Python (рекомендуется)

1. Скачайте Python 3.11.x:
   - https://www.python.org/downloads/
2. Во время установки:
   - включите **Add python.exe to PATH**
3. Проверка в PowerShell:
   - `python --version`
   - `py --version`

### Windows: установка через winget (альтернатива)

- `winget install -e --id Python.Python.3.11`

## Backend (Django) — Установка и запуск

### 1) Создание и активация виртуального окружения

Из корня репозитория:

1. Перейдите в backend
   - `cd backend`
2. Создайте venv
   - macOS/Linux:
     - `python3 -m venv venv`
   - Windows (PowerShell):
     - `py -3.11 -m venv venv`
3. Активируйте venv
   - macOS/Linux:
     - `source venv/bin/activate`
   - Windows (PowerShell):
     - `venv\Scripts\Activate.ps1`
   - Windows (cmd.exe):
     - `venv\Scripts\activate.bat`

Если PowerShell не разрешает запуск скриптов активации, выполните один раз (в PowerShell от имени администратора):

- `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

### 2) Установка зависимостей backend

- `pip install -r requirements.txt`

### 3) Миграции базы данных

- `python manage.py migrate`

### 4) Запуск backend-сервера

- `python manage.py runserver`

Backend будет доступен по адресу:

- `http://localhost:8000`

## Frontend (React) — Установка и запуск

Из корня репозитория:

1. Перейдите в frontend
   - `cd frontend`
2. Установите зависимости
   - `npm install`
3. Запустите dev-сервер
   - `npm start`

Frontend будет доступен по адресу:

- `http://localhost:3000`

### Windows заметки для frontend

- Установите Node.js LTS:
  - https://nodejs.org/
- Или через winget:
  - `winget install -e --id OpenJS.NodeJS.LTS`
- Проверка:
  - `node --version`
  - `npm --version`
