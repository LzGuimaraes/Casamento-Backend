# 🎁 Backend - Lista de Presentes e Confirmação de Presença

Este backend foi criado com **Node.js + Express** e utiliza **Google Sheets** como banco de dados para gerenciar uma lista de presentes e confirmações de presença para eventos.

---

## 📁 Estrutura de Pastas

```
backend/
├── controllers/           # Lógica dos endpoints
├── routes/                # Definição das rotas
├── services/              # Comunicação com Google Sheets
├── config/                # Autenticação com a API do Google
├── .env                   # Variáveis de ambiente
├── app.js                 # Entrada principal do servidor
└── package.json
```

---

## 🚀 Como Rodar

### 1. Clone o repositório e instale as dependências:
```bash
npm install
```

### 2. Crie o arquivo `.env` com:
```
GOOGLE_SHEET_ID=SEU_ID_DA_PLANILHA
```

### 3. Gere as credenciais da conta de serviço no Google Cloud:
- Vá em [https://console.cloud.google.com](https://console.cloud.google.com)
- Crie um projeto e ative a API do Google Sheets
- Crie uma conta de serviço com permissão "Editor"
- Gere e baixe o arquivo `credentials.json`
- Compartilhe sua planilha com o e-mail da conta de serviço (ex: `nome@projeto.iam.gserviceaccount.com`)

Coloque esse arquivo em: `backend/credentials.json`

### 4. Inicie o servidor
```bash
node app.js
```
O backend rodará por padrão na porta `3001`.

---

## 📡 Endpoints da API

### 🎁 Presentes
- `GET /presentes` → Lista todos os presentes cadastrados
  - **Resposta:** Array de presentes
  - **Exemplo de resposta:**
    ```json
    [
      { "id": 1, "nome": "Cafeteira", "valor": "200", "status": "pendente", "reservadoPor": "" },
      { "id": 2, "nome": "Jogo de Toalhas", "valor": "150", "status": "reservado", "reservadoPor": "Maria - maria@email.com - Parabéns!" }
    ]
    ```

- `POST /presentes` → Adiciona um novo presente
  - **Body:**
    ```json
    { "nome": "Cafeteira", "presente": "Cafeteira", "valor": "200" }
    ```
  - **Resposta:**
    ```json
    { "message": "Presente adicionado com sucesso!" }
    ```

- `PATCH /presentes/status` → Atualiza o status de um presente
  - **Body:**
    ```json
    { "rowIndex": 2, "status": "reservado" }
    ```
  - **Resposta:**
    ```json
    { "message": "Status atualizado com sucesso!" }
    ```

### 🥳 Presenças
- `POST /presencas` → Confirma presença de convidado
  - **Body:**
    ```json
    { "nome": "João", "email": "joao@email.com", "acompanhantes": 2, "mensagem": "Ansioso!", "presente": "Cafeteira" }
    ```
  - **Resposta:**
    ```json
    { "message": "Presença confirmada com sucesso!" }
    ```

- `GET /presencas` → Lista todas as presenças confirmadas
  - **Resposta:** Array de presenças
  - **Exemplo de resposta:**
    ```json
    [
      { "nome": "João", "presenca": "Confirmado", "observacao": "Email: joao@email.com, Acompanhantes: 2, Mensagem: Ansioso!, Presente: Cafeteira" }
    ]
    ```

---

## Exemplos de Uso com curl

### Listar presentes
```bash
curl http://localhost:3001/presentes
```

### Adicionar presente
```bash
curl -X POST http://localhost:3001/presentes -H "Content-Type: application/json" -d '{"nome":"Cafeteira","presente":"Cafeteira","valor":"200"}'
```

### Atualizar status do presente
```bash
curl -X PATCH http://localhost:3001/presentes/status -H "Content-Type: application/json" -d '{"rowIndex":2,"status":"reservado"}'
```

### Confirmar presença
```bash
curl -X POST http://localhost:3001/confirmar-presenca -H "Content-Type: application/json" -d '{"nome":"João","email":"joao@email.com","acompanhantes":2,"mensagem":"Ansioso!","presente":"Cafeteira"}'
```

### Listar presenças
```bash
curl http://localhost:3001/confirmar-presenca
```

### 🥳 Confirmar Presença
- `POST /confirmar-presenca` → Registra uma presença
  - Body: `{ nome, email, acompanhantes, mensagem }`

---

## 📦 Dependências
```bash
npm install express cors dotenv googleapis google-auth-library dayjs
```

---

## ✅ Planilha esperada

### Aba "Presentes"
| Reservado Por    | Presente | Valor      |  Status  |
|------------------|----------|------------|-------   |  
| Panela Elétrica  | R$200    | disponível |          |                        |
| Jogo de Toalhas  | R$100    | reservado  | pendente |

### Aba "Convidados"
| Nome Completo  | Email            | Status |
|----------------|------------------|--------|
| João           | joao@email.com   | 1      |