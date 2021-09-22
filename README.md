# React - Marvel (Desafio Softplan)

## Informações

### Instalação e Execução

- Criar o arquivo `.env` na raiz com as credenciais
- Instalar os pacotes com `npm install`
- Startar o projeto com `npm start` ou `npm run build`

### Marvel API
Para que a aplicação funcione, é necessário criar um arquivo `.env` na raiz do projeto (existe um arquivo com o nome .env.example que deve ser usado como base) e adicionar os dados da API.

- REACT_APP_API_URL=https://gateway.marvel.com:443/v1/public/

- REACT_APP_API_KEY=4ca5dd91f3a5a38201caa02dc995cce5

- REACT_APP_HASH=5f789ffc79d090d9616ce7482c04acec

- REACT_APP_TS=4

### Paginação
A fim de melhorar a performance da aplicação, adicionei um componente de paginação na busca de personagens.

### Alteração no Client-Side
Devido à paginação, as alterações do personagem ficam persistidas até que o fluxo da aplicação volte à tela de pesquisa de personagens.

### Gerenciamento de Estado
Utiliza o Redux.

### Layout
Utilizei o material design (Materialize CSS), e tentei deixar o mais clean possível, sem perder o foco "Comic".

### Testes
Criei testes para os componentes

### Aplicação
Deixei a aplicação rodando no endereço: https://marvelpersonagens.herokuapp.com/

### Agradecimento
Desde já agradeço a oportunidade e fico à disposição para qualquer dúvida.
