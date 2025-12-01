# API de Gerenciamento de Pedidos

Uma API REST simples desenvolvida em Node.js com Express para gerenciar pedidos (CRUD).

## 🚀 Características

- ✅ **POST /order** — Criar novo pedido
- ✅ **GET /order/:orderId** — Obter pedido por ID
- ✅ **GET /order/list** — Listar todos os pedidos
- ✅ **PUT /order/:orderId** — Atualizar pedido
- ✅ **DELETE /order/:orderId** — Deletar pedido

## 📋 Requisitos

- Node.js v14+ 
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/teste_api.git
cd teste_api
```

2. Instale as dependências:
```bash
npm install
```

3. (Opcional) Configure para PostgreSQL:
```bash
npm install pg
```

## 📖 Uso

### Iniciar o servidor (modo memória)
```bash
node api.js
```

O servidor estará disponível em `http://localhost:3000`

### Iniciar com PostgreSQL
```bash
export DATABASE_URL="postgres://usuario:senha@localhost:5432/orders_db"
node api.js
```

## 🧪 Testando os Endpoints

### 1. Criar um novo pedido (POST)
```bash
curl --location 'http://localhost:3000/order' \
  --header 'Content-Type: application/json' \
  --data '{
    "numeroPedido": "v10089015vdb-01",
    "valorTotal": 10000,
    "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
    "items": [
      {
        "idItem": "2434",
        "quantidadeItem": 1,
        "valorItem": 1000
      }
    ]
  }'
```

### 2. Obter um pedido (GET)
```bash
curl 'http://localhost:3000/order/v10089015vdb'
```

### 3. Listar todos os pedidos (GET)
```bash
curl 'http://localhost:3000/order/list'
```

### 4. Atualizar um pedido (PUT)
```bash
curl --location --request PUT 'http://localhost:3000/order/v10089015vdb' \
  --header 'Content-Type: application/json' \
  --data '{
    "numeroPedido": "v10089015vdb-01",
    "valorTotal": 15000,
    "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
    "items": [
      {
        "idItem": "2434",
        "quantidadeItem": 2,
        "valorItem": 1500
      }
    ]
  }'
```

### 5. Deletar um pedido (DELETE)
```bash
curl --location --request DELETE 'http://localhost:3000/order/v10089015vdb'
```

## 🗄️ Estrutura de Dados

### Formato de Entrada (Request)
```json
{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}
```

### Formato de Saída (Response)
```json
{
  "orderId": "v10089015vdb",
  "value": 10000,
  "creationDate": "2023-07-19T12:24:11.529Z",
  "items": [
    {
      "productId": 2434,
      "quantity": 1,
      "price": 1000
    }
  ]
}
```

## 🗄️ Banco de Dados

### Em Memória (padrão)
- Dados são armazenados na memória durante a execução
- Ideais para desenvolvimento e testes

### PostgreSQL (opcional)
Para usar PostgreSQL, configure a variável de ambiente `DATABASE_URL`:

```bash
export DATABASE_URL="postgres://user:password@localhost:5432/orders_db"
node api.js
```

**Tabelas (execute `migrations.sql`):**

```sql
CREATE TABLE orders (
  orderId VARCHAR PRIMARY KEY,
  value NUMERIC NOT NULL,
  creationDate TIMESTAMP NOT NULL
);

CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  orderId VARCHAR NOT NULL REFERENCES orders(orderId) ON DELETE CASCADE,
  productId INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  price NUMERIC NOT NULL
);
```

## 📁 Estrutura do Projeto

```
teste_api/
├── api.js                    # Servidor Express com endpoints
├── db-postgres.js            # Módulo PostgreSQL (opcional)
├── migrations.sql            # Scripts SQL para criar tabelas
├── test-endpoints.ps1        # Script de testes (PowerShell)
├── test-simple.js            # Script de testes (Node.js)
├── package.json              # Dependências do projeto
├── .gitignore                # Arquivos ignorados pelo Git
├── README.md                 # Este arquivo
└── LICENSE                   # Licença do projeto
```

## 🤝 Contribuindo

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está licenciado sob a Licença ISC - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📧 Suporte

Se encontrar problemas ou tiver dúvidas, abra uma issue no repositório.

---

**Desenvolvido com ❤️ em 2025**
