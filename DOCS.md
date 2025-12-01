# Documentação da API

## Visão Geral

Esta é uma API REST para gerenciar pedidos (orders) com operações CRUD completas.

## Endpoints

### 1. Criar Pedido
- **Método:** `POST`
- **URL:** `/order`
- **Content-Type:** `application/json`

#### Request
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

#### Response (201 Created)
```json
{
  "success": true,
  "message": "Pedido criado com sucesso",
  "order": {
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
}
```

---

### 2. Obter Pedido por ID
- **Método:** `GET`
- **URL:** `/order/:orderId`
- **Exemplo:** `/order/v10089015vdb`

#### Response (200 OK)
```json
{
  "success": true,
  "order": {
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
}
```

#### Response (404 Not Found)
```json
{
  "success": false,
  "error": "Pedido não encontrado"
}
```

---

### 3. Listar Todos os Pedidos
- **Método:** `GET`
- **URL:** `/order/list`

#### Response (200 OK)
```json
{
  "success": true,
  "total": 2,
  "orders": [
    {
      "orderId": "v10089015vdb",
      "value": 10000,
      "creationDate": "2023-07-19T12:24:11.529Z",
      "items": [...]
    },
    {
      "orderId": "v10089016vdb",
      "value": 5000,
      "creationDate": "2023-07-20T14:30:00.000Z",
      "items": [...]
    }
  ]
}
```

---

### 4. Atualizar Pedido
- **Método:** `PUT`
- **URL:** `/order/:orderId`
- **Exemplo:** `/order/v10089015vdb`
- **Content-Type:** `application/json`

#### Request
```json
{
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
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Pedido atualizado com sucesso",
  "order": {
    "orderId": "v10089015vdb",
    "value": 15000,
    "creationDate": "2023-07-19T12:24:11.529Z",
    "items": [
      {
        "productId": 2434,
        "quantity": 2,
        "price": 1500
      }
    ]
  }
}
```

---

### 5. Deletar Pedido
- **Método:** `DELETE`
- **URL:** `/order/:orderId`
- **Exemplo:** `/order/v10089015vdb`

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Pedido deletado com sucesso",
  "deletedOrder": {
    "orderId": "v10089015vdb",
    "value": 10000,
    "creationDate": "2023-07-19T12:24:11.529Z",
    "items": [...]
  }
}
```

#### Response (404 Not Found)
```json
{
  "success": false,
  "error": "Pedido não encontrado"
}
```

---

## Mapeamento de Campos

| Campo Entrada | Campo Saída | Tipo |
|---|---|---|
| `numeroPedido` | `orderId` | String (parte até o `-`) |
| `valorTotal` | `value` | Number |
| `dataCriacao` | `creationDate` | ISO Date String |
| `items[].idItem` | `items[].productId` | Number |
| `items[].quantidadeItem` | `items[].quantity` | Number |
| `items[].valorItem` | `items[].price` | Number |

---

## Códigos de Status HTTP

| Status | Descrição |
|---|---|
| 200 | OK - Requisição bem-sucedida |
| 201 | Created - Recurso criado com sucesso |
| 400 | Bad Request - Erro na requisição |
| 404 | Not Found - Recurso não encontrado |
| 500 | Internal Server Error - Erro no servidor |

---

## Variáveis de Ambiente

```bash
# Porta do servidor (padrão: 3000)
PORT=3000

# Tipo de banco de dados (padrão: memory)
DB_TYPE=postgres

# URL de conexão PostgreSQL
DATABASE_URL=postgres://user:password@localhost:5432/orders_db
```

---

## Notas

- O campo `orderId` é extraído da primeira parte de `numeroPedido` (antes do `-`)
- As datas são convertidas para formato ISO 8601
- IDs de itens são convertidos para números inteiros
- Duplicação de `orderId` retorna erro 400
