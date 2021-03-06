# World domination

## Цель: Создать онлайн приложение для ролевой игры глобальной стратегии

### Описание:
Игроки делятся на команды по странам, в каждой команде 2-4 игрока (зависит от общего числа игроков). У каждой страны 4 города, свой стартовый капитал, а также прирост денег за раунд от каждого уцелевшего города, в зависимости от его развития

Игра состоит из 6 раундов (раунды ограничены по времени)
В начале каждого раунда игроки находятся в общей комнате и сталкиваются с последствиями предыдущих раундов, происходят международные дебаты, в общей комнате выведен текущий общемировой статус
В середине раунда игроки перемещаются в закрытые комнаты, где они могут принять одного дипломата другой страны и отправить своего дипломата в нужную страну

На странице своей страны игроки могут производить действия: 
* улучшать развитие города
* установление защитного щита над одним выбранным своим городом
* создание ядерной бомбы (максимальное количество ограничено, например 4-6)
* запустить ядерную бомбу в город другой страны (один раз на город, например можно отправить все 4 бомбы на 1 страну за * раунд, при запуске бомбы ухудшается общемировая экология)
* вкладывание денег в улучшение глобальной экологии
* наложить экономические санкции (ухудшают общий прирост денег за раунд, кто наложил санкции видит только страна их получившая)

https://claustrophobia.com/ru/quest/online-mirovoe-gospodstvo/

### Stack
* Typescript (FE, BE)
* React
* Nest.js
* GraphQL
* Relay
* MongoDB
* Prisma
* WebRTC

### Структура приложения:
* Авторизация/регистрация
* Стартовый выбор команды и роли
* Реализация voice chat
* Реализация раундной системы
* Сбор общемировой сводки
* Реализация общей голосовой страницы с выводом общемировой сводки
* Страница своей страны (действия над своей страной, только президент может управлять своей страной)
* Общий экологический фон (ухудшается если кто-то создает или применяет ядерную бомбу, все государства проиграют если мировая экология погибнет)
