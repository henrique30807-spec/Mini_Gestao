# Mini Sistema de Gestão de Produtos

## Descrição

Mini Sistema de Gestão de Produtos desenvolvido como trabalho acadêmico.

O sistema permite realizar o cadastro e gerenciamento de usuários, fornecedores e produtos, além da criação de cestas de produtos.

## Tecnologias utilizadas

- PHP
- HTML
- CSS
- JavaScript
- Bootstrap
- AJAX com Fetch API
- MariaDB/MySQL
- PDO
- XAMPP
- Draw.io para criação do DER

## Banco de Dados

O sistema utiliza o banco de dados:

`mini_gestao`

O banco possui as seguintes tabelas:

- `usuarios`
- `fornecedores`
- `produtos`
- `cestas`
- `cesta_produtos`

### Relacionamentos

- Um usuário pode possuir várias cestas.
- Um fornecedor pode possuir vários produtos.
- Uma cesta pode possuir vários produtos.
- Um produto pode estar em várias cestas.
- A relação entre cestas e produtos é realizada pela tabela `cesta_produtos`.

## DER

O Diagrama Entidade-Relacionamento do sistema está representado abaixo:

![DER do Mini Sistema de Gestão de Produtos](docs/DER_Mini_Gestao.png)

O arquivo editável do diagrama também está disponível em:

`docs/DER_Mini_Gestao.drawio`

## Funcionalidades

### Usuários

- Cadastro de usuário
- Login
- Controle de sessão
- Logout

### Fornecedores

- Cadastro de fornecedores
- Listagem de fornecedores

### Produtos

- Cadastro de produtos
- Listagem de produtos
- Edição de produtos
- Exclusão de produtos
- Associação de produtos aos fornecedores

### Cestas

- Criação de cestas
- Definição do nome da cesta
- Seleção de produtos
- Adição de produtos à cesta
- Visualização dos produtos adicionados
- Exibição do fornecedor
- Exibição do preço
- Exibição da quantidade
- Exibição do total

## Estrutura do Banco de Dados

### Tabela `usuarios`

| Campo | Descrição |
|---|---|
| `id` | Identificador do usuário |
| `nome` | Nome do usuário |
| `email` | E-mail do usuário |
| `senha` | Senha do usuário |

### Tabela `fornecedores`

| Campo | Descrição |
|---|---|
| `id` | Identificador do fornecedor |
| `nome` | Nome do fornecedor |
| `cnpj` | CNPJ do fornecedor |

### Tabela `produtos`

| Campo | Descrição |
|---|---|
| `id` | Identificador do produto |
| `nome` | Nome do produto |
| `preco` | Preço do produto |
| `fornecedor_id` | Identificador do fornecedor relacionado |

### Tabela `cestas`

| Campo | Descrição |
|---|---|
| `id` | Identificador da cesta |
| `usuario_id` | Identificador do usuário relacionado |
| `nome` | Nome da cesta |

### Tabela `cesta_produtos`

| Campo | Descrição |
|---|---|
| `cesta_id` | Identificador da cesta |
| `produto_id` | Identificador do produto |

## Como executar o projeto

### Pré-requisitos

- XAMPP instalado
- Apache funcionando
- MariaDB/MySQL funcionando

### Instalação

1. Clone ou copie o projeto para a pasta:

`C:\xampp\htdocs\Mini_Gestao\`

2. Abra o XAMPP.

3. Inicie o **Apache**.

4. Inicie o **MySQL/MariaDB**.

5. O banco utilizado pelo sistema é:

`mini_gestao`

6. Caso seja necessário criar o banco e as tabelas, execute:

`backend/criar_banco.php`

### Acesso ao sistema

Após iniciar o Apache, acesse pelo navegador:

`http://localhost/Mini_Gestao/mini_gestao_front/`

## Organização do Projeto

A estrutura principal do projeto é organizada da seguinte forma:

```text
Mini_Gestao/
│
├── backend/
│   ├── conexao.php
│   ├── criar_banco.php
│   ├── cadastro_usuario.php
│   ├── login.php
│   ├── logout.php
│   ├── cadastro_fornecedor.php
│   ├── listar_fornecedores.php
│   ├── cadastro_produto.php
│   ├── criar_cesta.php
│   ├── adicionar_cesta.php
│   └── listar_cesta.php
│
├── docs/
│   ├── DER_Mini_Gestao.png
│   └── DER_Mini_Gestao.drawio
│
├── mini_gestao_front/
│
└── README.md

Segurança

O sistema utiliza:

PDO para conexão com o banco de dados.
Prepared Statements para execução das consultas.
Hash SHA-256 para armazenamento das senhas.
Sessões PHP para controle do usuário autenticado.
Comunicação entre Front-end e Back-end

O sistema utiliza JavaScript e a API fetch() para realizar requisições AJAX entre o front-end e os arquivos PHP do back-end.

Dessa forma, algumas operações são realizadas sem a necessidade de recarregar completamente a página.

Integrantes
Nome	RA
Henrique Leite Firmino 60005715

Figma
Protótipo/interface do sistema: https://www.figma.com/design/N62RgJn5iR9otEBkRzJLRk/MINI-GEST%C3%83O-DE-PRODUTOS?node-id=0-1&t=FVAXKZ6P7UOjfTrj-1