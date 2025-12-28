# Скрипт для загрузки проекта на GitHub
# ВАЖНО: Перед выполнением замените YOUR_USERNAME и REPO_NAME на ваши значения!

Write-Host "=== Загрузка проекта на GitHub ===" -ForegroundColor Green
Write-Host ""

# Шаг 1: Инициализация Git
Write-Host "1. Инициализация Git репозитория..." -ForegroundColor Yellow
git init

# Шаг 2: Добавление файлов
Write-Host "2. Добавление файлов..." -ForegroundColor Yellow
git add .

# Шаг 3: Создание коммита
Write-Host "3. Создание коммита..." -ForegroundColor Yellow
git commit -m "Initial commit: email finder script"

# Шаг 4: Переименование ветки
Write-Host "4. Переименование ветки в main..." -ForegroundColor Yellow
git branch -M main

# Шаг 5: Добавление удаленного репозитория
Write-Host "5. Добавление удаленного репозитория..." -ForegroundColor Yellow
Write-Host "ВНИМАНИЕ: Замените YOUR_USERNAME и REPO_NAME на ваши значения!" -ForegroundColor Red
$username = Read-Host "Введите ваш GitHub username"
$repoName = Read-Host "Введите название репозитория"
git remote add origin "https://github.com/$username/$repoName.git"

# Шаг 6: Загрузка на GitHub
Write-Host "6. Загрузка кода на GitHub..." -ForegroundColor Yellow
git push -u origin main

Write-Host ""
Write-Host "Готово! Проект загружен на GitHub." -ForegroundColor Green
Write-Host "Проверьте: https://github.com/$username/$repoName" -ForegroundColor Cyan

