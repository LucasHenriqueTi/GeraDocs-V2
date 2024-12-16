# GerarDocsV2

## Objetivo do Sistema
O **GerarDocsV2** tem como objetivo principal gerar documentos, como:
- Termos de cessão de uso
- Contratos de compra e venda
- Listagem de beneficiários
- Listagem complementar

Esses documentos são gerados a partir dos dados informados pelos usuários. O sistema também permite a visualização de listas de beneficiários e dados complementares organizados em dashboards.

---

## Estrutura do Sistema

### Telas

#### 1. Tela de Login e Entrada
- Permite o acesso ao sistema.
- Após o login bem-sucedido, o usuário é direcionado para a dashboard referente ao seu setor.

#### 2. Dashboard SGA, STI
- **Termos de Cessão de Uso**: Área onde os dados necessários para gerar o documento devem ser preenchidos.
- **Contratos de Compra e Venda**: O usuário pode inserir os dados para gerar esse tipo de documento.

#### 3. Dashboard SRF, STI
- **Listagem de Beneficiários**: Mostra os beneficiários cadastrados no sistema.
- **Listagem Complementar**: Apresenta informações adicionais relacionadas aos beneficiários.

#### 4. Dashboard para Administradores (STI)
- **Funcionalidades disponíveis**:
  - **Listar usuários**: Apresenta uma listagem dos usuários cadastrados no sistema.
  - **Cadastrar usuários**: Permite que novos usuários sejam adicionados ao sistema.
  - **Acesso livre**: Permite acessar qualquer dashboard.

---

## Tecnologias Utilizadas

- **React**: Para a criação de interfaces dinâmicas e interativas.
- **JavaScript**: Como linguagem principal do desenvolvimento.
- **Figma**: Utilizado para o design e prototipagem do layout.
- **Vite**: Ferramenta utilizada para o empacotamento e construção do projeto, com foco em desempenho.
- **Material UI (MUI)**: Biblioteca de componentes estilizados para criar interfaces de usuário modernas e responsivas.

---

## Estrutura de Pastas

A organização das pastas no projeto segue o seguinte padrão:

- **`routes`**: Contém as rotas do sistema, definindo os caminhos para as páginas e componentes.
- **`components`**: Armazena os componentes reutilizáveis, como botões e elementos de interface.
- **`assets`**: Contém as imagens utilizadas no projeto.
- **`pages`**: Reúne as páginas principais do sistema, como login, dashboards e formulários.

---

## Funcionalidades do Sistema

### Login
- Validação do usuário para acesso ao sistema.
- Redirecionamento para a dashboard principal após autenticação.

### Geração de Documentos
- O usuário preenche os dados necessários nos formulários disponíveis.
- Documentos como termos de cessão de uso e contratos de compra e venda são gerados automaticamente.

### Visualização de Beneficiários
- Listagem dos beneficiários cadastrados, com opção de consultar informações complementares.

---

## Design

- **Protótipo**: O design foi desenvolvido no Figma e está disponível no link: [Figma - Formulário SGA](https://www.figma.com/design/fB9iafg6FddLlKOzEWzk4N/Formulário-SGA?node-id=0-1&node-type=canvas&t=0F3ZmxuVwcVJNiMe-0).
- **Estilo Visual**:
  - Layout limpo e organizado, com ênfase na usabilidade.
  - Paleta de cores e tipografia definidas no Figma.

---

## Fluxo do Usuário

1. O usuário acessa a tela de login, insere suas credenciais e é autenticado.
2. Após o login, é redirecionado para a dashboard referente ao seu setor.
3. Na dashboard, o usuário pode:
   - Preencher dados para gerar documentos (termos de cessão de uso, contratos de compra e venda, lista de beneficiários e lista complementar).
   - Visualizar listas de beneficiários e dados complementares.
4. O sistema gera o documento automaticamente e o disponibiliza para download ou consulta.

---

## Observações Técnicas

### Rotas
- As rotas foram implementadas utilizando a biblioteca do React Router (presumido).
- Localizadas na pasta `routes`, facilitando a manutenção e adição de novas páginas.

### Componentes
- Botões e outros elementos de interface estão modularizados na pasta `components`, permitindo reutilização.

### Imagens
- Todos os recursos visuais estão organizados na pasta `assets`, mantendo a estrutura limpa.
