# Инструкция по загрузке проекта на GitHub

## Шаг 1: Создание репозитория на GitHub

1. Зайдите на https://github.com
2. Войдите в свой аккаунт
3. Нажмите кнопку **"+"** в правом верхнем углу
4. Выберите **"New repository"**
5. Заполните форму:
   - **Repository name**: например, `email-finder` или `js-email-scanner`
   - **Description**: описание проекта (опционально)
   - Выберите **Public** или **Private**
   - **НЕ** ставьте галочки на "Add a README file", "Add .gitignore", "Choose a license" (мы уже создадим файлы)
6. Нажмите **"Create repository"**

## Шаг 2: Команды для загрузки проекта

Выполните следующие команды в терминале (PowerShell) в папке проекта `c:\js`:

### Инициализация Git репозитория
```powershell
git init
```

### Добавление файлов
```powershell
git add .
```

### Создание первого коммита
```powershell
git commit -m "Initial commit: email finder script"
```

### Добавление удаленного репозитория
Замените `YOUR_USERNAME` на ваш GitHub username и `REPO_NAME` на название репозитория:
```powershell
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
```

### Переименование основной ветки в main (если нужно)
```powershell
git branch -M main
```

### Загрузка кода на GitHub
```powershell
git push -u origin main
```

## Полный список команд (скопируйте и выполните по порядку)

```powershell
cd c:\js
git init
git add .
git commit -m "Initial commit: email finder script"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git push -u origin main
```

**Важно:** Замените `YOUR_USERNAME` и `REPO_NAME` на ваши реальные значения!

## Если потребуется авторизация

При выполнении `git push` GitHub может запросить:
- **Username**: ваш GitHub username
- **Password**: используйте Personal Access Token (не обычный пароль)

### Как создать Personal Access Token:
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic)
3. Выберите срок действия и права доступа (нужен `repo`)
4. Скопируйте токен и используйте его как пароль

## Дополнительные команды

### Проверить статус репозитория
```powershell
git status
```

### Посмотреть список удаленных репозиториев
```powershell
git remote -v
```

### Обновить код на GitHub (после изменений)
```powershell
git add .
git commit -m "Описание изменений"
git push
```

