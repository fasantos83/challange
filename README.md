# Desafio 
Tecnologias usadas
* Backend
  * Java 8
  * PostgreSQL 11
  * Tomcat 9
  * Maven
* Frontend:
  * node.js 10
  * react 16
  * axios

Setup:
* BD:
  * user: postgres
  * password: root 
  * criar database 'peixe'
  * executar ddl contida em /backend/src/main/resources/peixe.sql

* Backend:
  * executa 'mvn clean install'
  * adicionar projeto no Apache 9 e subir container

* Frontend:
  * executar 'npm install'
  * executar 'npm start'
  * acessar http://localhost:3000 se browser não abrir automaticamente
