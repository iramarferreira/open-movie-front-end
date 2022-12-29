# Projeto Web Open Movie

Esse é um projeto desenvolvido para a disciplina de Front-end da 
Residência em TI da UFRN/IMD com parceria do TST. O mesmo faz o consumo de duas APIs sendo uma a [OMDb API](https://www.omdbapi.com/) que é pública, e a outra API desenvolvida e disponibilizada pelo professor da disciplina que está disponível no seguinte [repositório](https://github.com/isaacfranco/tst_api).

## Tecnologias
- Nuxt
- TypeScript
- Tailwind CSS 
- daisyUI
- Pinia

## Configuração

Instale as dependências:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

Depois, crie um arquivo `.env` na raiz do projeto e defina as variáveis que estão específicadas no arquivo `nuxt.config.ts`.

## Execução em servidor local

Inicie o servidor em http://localhost:3000

```bash
npm run dev
```

## Produção

Criar aplicação para produção:

```bash
npm run build
```

Visualização localmente da aplicação pronta para produção:

```bash
npm run preview
```


