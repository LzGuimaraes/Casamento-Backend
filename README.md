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
- `GET /presentes` → Lista todos os presentes
- `POST /presentes/reservar` → Reserva um presente
  - Body: `{ id, nome, email, mensagem }`

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
| Nome do Presente | Valor | Status     | Reservado Por                     |
|------------------|-------|------------|-----------------------------------|
| Panela Elétrica  | R$200 | disponível |                                   |
| Jogo de Toalhas  | R$100 | reservado  | João - joao@email.com - mensagem |

### Aba "Presencas"
| Nome  | Email            | Acompanhantes | Mensagem           |
|-------|------------------|----------------|--------------------|
| João  | joao@email.com   | 1              | Estaremos lá!      |

---

Qualquer dúvida, me chame! 😉
