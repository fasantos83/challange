# Desafio 
## Tecnologias usadas
* Backend
  * Java 8
  * PostgreSQL 11
  * Tomcat 9
  * Maven
* Frontend:
  * node.js 10
  * react 16
  * axios

## Setup:
* BD:
  * user: postgres
  * password: root 
  * criar database 'peixe'
  * executar ddl contida em /backend/src/main/resources/peixe.sql

* Backend:
  * executar 'mvn clean install'
  * adicionar projeto no Apache 9 e subir container

* Frontend:
  * executar 'npm install'
  * executar 'npm start'
  * acessar http://localhost:3000 se browser não abrir automaticamente

## Uso do sistema
* Tela principal lista todas as ofertas cadastradas em uma lista e oferece as opções de criação (botão no cabeçalho do card) e edição e deleção (linha da tabela)
* Ao clicar no icone (+) na parte esquerda da linha da tabela de ofertas um card interno contendo a lista de opções de compra cadastrada com as mesmas opções de CRUD do card de Ofertas com a adição do botão de compra.
* Criação, Edição e Compra de Opções de ofertas são realizadas em modais próprios.

## Melhorias que eu gostaria de implementar
* Adicionar testes unitários no projeto backend
* Adicionar validações adicionais em campos dos formulários
* Melhorar organização do projeto frontend em componentes diferentes
