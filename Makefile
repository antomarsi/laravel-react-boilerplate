DOCKER=docker-compose
DOCKER_APP_EXEC=$(DOCKER) exec app

up:
	$(DOCKER) up -d

down:
	$(DOCKER) down

bash:
	$(DOCKER_APP_EXEC) bash

compose-install:
	$(DOCKER_APP_EXEC) composer install

yarn-install:
	$(DOCKER_APP_EXEC) yarn install

install: compose-install yarn-install

yarn-dev:
	$(DOCKER_APP_EXEC) yarn dev
