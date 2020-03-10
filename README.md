# ProjetoPortifolioTransportadoraHivecloud
Neste projeto será desenvolvido um pequeno sistema para que transportadoras possam se cadastrar para que a mesma possa aparecer na listagem principal do sistema, onde aparece todas as transportadoras cadastradas, e elas podem ser filtradas, caso clique no nome da transportadora, pode alterar os seus dados e também deletar a transportadora. Linguagem de programação Java com Spring Boot e front-end Angular 8.

## Pré-requisitos

Para buildar e executar a aplicação (API e Front-end) será necessário:
* 	[Maven](https://maven.apache.org/) - Dependency Management.
* 	[JDK](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) - Java™ Platform, Standard Edition Development Kit.
* 	[Spring Boot](https://spring.io/projects/spring-boot) - Framework to ease the bootstrapping and development of new Spring Applications.
*   [Spring Tools 4 for Eclipse](https://spring.io/tools) - Spring Tool Suite 4 makes it easy to get started. A direct and easy-to-use integration of the Spring Initializr and the famous Spring Guides allows you to go from nothing to a running Spring Boot app in seconds.
* 	[MySQL](https://www.mysql.com/) - Open-Source Relational Database Management System.
* 	[git](https://git-scm.com/) - Free and Open-Source distributed version control system.
* 	[Swagger](https://swagger.io/) - Open-Source software framework backed by a large ecosystem of tools that helps developers design, build, document, and consume RESTful Web services.
*   [Node](https://nodejs.org/pt-br/download/) - Open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside of a browser.
* 	[Angular CLI](https://angular.io/cli) - Command-line interface tool that you use to initialize, develop, scaffold, and maintain Angular applications.
* 	[Bootstrap](https://getbootstrap.com/docs/4.3/getting-started/download/) - Open-source toolkit for developing with HTML, CSS, and JS.
*   [ngx-chips](https://github.com/Gbuomprisco/ngx-chips) - Component for Angular 4 or greater. Design and API are blandly inspired by Angular Material's md-chips. Formerly called ng2-tag-input.

## Documentação
* 	[Swagger](http://localhost:8088/swagger-ui.html) - Documentação dos serviços disponibilizado pela API.

## Arquivos e diretórios

O projeto foi criado e desenvolvido seguindo a estrutura descrita abaixo:

* 	[API]
```
.
├── Spring Elements
├── src
│   └── main
|       └── resources
│       └── java
│           ├── br.com.hivecloud.transportadora.controller
│           ├── br.com.hivecloud.transportadora.model
│           ├── br.com.hivecloud.transportadora.repository
│           ├── br.com.hivecloud.transportadora.service
├── src
│   └── main
│       └── resources
│           └── static
│           │   ├── css
│           │   │   └── bootstrap.css
│           │   ├── images
│           │   ├── js
│           │   ├── favicon.ico
│           │   └── index.html
│           ├── templates
│           │   └── view.html
│           ├── application.properties
│           ├── banner.txt
│           └── log4j2.xml
├── src
│   └── test
│       └── java
├── JRE System Library
├── Maven Dependencies
├── bin
├── logs
│   └── application.log
├── src
├── target
│   └──application-0.0.1-SNAPSHOT
├── mvnw
├── mvnw.cmd
├── pom.xml
└── README.md
```
* 	[Front-End]

## Pacotes

* 	[API]
- `controller` — Pasta responsável pelo mapeamento e direcionamento das ações recebidas (request) pela camada da apresentação para os respectivos serviços da aplicação.
- `model` — to communicate with the database;
- `repository` — to hold our business logic;
- `service` — to listen to the client;
- `resources/application.properties` - It contains application-wide properties. Spring reads the properties defined in this file to configure your application. You can define server’s default port, server’s context path, database URLs etc, in this file.
- `test/` - Pacote onde se encontram os testes unitários.
- `pom.xml` - Arquivo onde se encontram todas as dependências do projeto.

* 	[Fron-End]


## Liçensa
* 	Apache License 2.0. Visualizar arquivo de [LICENSE](https://github.com/BrunoFelix/ProjetoPortifolioTransportadoraHivecloud/blob/master/LICENSE_APACHE).
* 	The MIT License. Visualizar arquivo de [LICENSE](https://github.com/codecentric/LICENSE_MIT).
