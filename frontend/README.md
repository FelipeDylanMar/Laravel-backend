# 🚀 Frontend - Sistema de Gerenciamento de Produtos

## 📋 Visão Geral

Frontend moderno e robusto desenvolvido com **Vue.js 3** e **TypeScript**, implementando as melhores práticas de desenvolvimento e arquitetura escalável. Este projeto demonstra conceitos avançados de desenvolvimento frontend com foco em performance, manutenibilidade e experiência do usuário.

## ✨ Funcionalidades Avançadas

### 🏗️ Arquitetura e Padrões
- **Vue 3 Composition API** - Reatividade moderna e composição de lógica
- **TypeScript** - Tipagem estática completa para maior robustez
- **Pinia** - Gerenciamento de estado moderno e type-safe
- **Vue Router 4** - Roteamento com guards de navegação e lazy loading
- **Modular Architecture** - Separação clara de responsabilidades

### 🎨 Design System e UI/UX
- **Tailwind CSS** - Framework CSS utilitário para design consistente
- **Design System Customizado** - Paleta de cores INNYX com variações semânticas
- **Responsive Design** - Interface adaptável para todos os dispositivos
- **Loading States** - Estados de carregamento para melhor UX
- **Error Handling** - Tratamento elegante de erros com feedback visual
- **Accessibility** - Componentes acessíveis com ARIA labels

### 🔐 Autenticação e Segurança
- **JWT Token Authentication** - Sistema seguro de autenticação
- **Route Guards** - Proteção de rotas baseada em autenticação
- **Persistent Sessions** - Manutenção de sessão entre recarregamentos
- **Logout Seguro** - Limpeza segura de dados sensíveis

### 📊 Gerenciamento de Estado
- **Pinia Stores** - Estados reativos e organizados
- **Computed Properties** - Propriedades derivadas otimizadas
- **Watchers** - Reatividade avançada para mudanças de estado
- **Error State Management** - Controle centralizado de erros
- **Loading State Management** - Estados de carregamento globais

### 🌐 Integração com API
- **Fetch-based API Service** - Cliente HTTP customizado e type-safe
- **Bearer Token Authentication** - Autenticação automática em requisições
- **Error Handling** - Tratamento robusto de erros de rede
- **File Upload** - Sistema completo de upload de arquivos
- **Timeout Management** - Controle de timeout para evitar travamentos

### 🧪 Testes e Qualidade
- **Vitest** - Framework de testes moderno e rápido
- **Vue Test Utils** - Utilitários para testes de componentes Vue
- **Unit Tests** - Testes unitários para funções e serviços
- **Integration Tests** - Testes de integração para fluxos completos
- **Mocking** - Mocks para APIs e dependências externas
- **jsdom Environment** - Ambiente DOM para testes

### ⚡ Performance e Otimização
- **Lazy Loading** - Carregamento sob demanda de componentes
- **Code Splitting** - Divisão inteligente do código
- **Tree Shaking** - Eliminação de código não utilizado
- **Asset Optimization** - Otimização de imagens e recursos
- **Bundle Analysis** - Análise do tamanho do bundle
- **Hot Module Replacement** - Desenvolvimento com HMR

### 🛠️ Ferramentas de Desenvolvimento
- **Vite** - Build tool moderna e extremamente rápida
- **Vue DevTools** - Ferramentas de debug integradas
- **TypeScript Strict Mode** - Configuração rigorosa do TypeScript
- **Path Mapping** - Imports absolutos com alias @/
- **Environment Variables** - Suporte a variáveis de ambiente

## 🏛️ Estrutura do Projeto

```
frontend/
├── src/
│   ├── assets/              # Recursos estáticos (CSS, imagens, logos)
│   │   ├── base.css         # Estilos base
│   │   ├── main.css         # Estilos globais com Tailwind
│   │   ├── logo.svg         # Logo Vue.js
│   │   └── innyx-logo-embedded.svg # Logo INNYX
│   ├── components/          # Componentes reutilizáveis
│   │   ├── HelloWorld.vue
│   │   ├── TheWelcome.vue
│   │   ├── WelcomeItem.vue
│   │   └── icons/           # Ícones SVG componentizados
│   │       ├── IconCommunity.vue
│   │       ├── IconDocumentation.vue
│   │       ├── IconEcosystem.vue
│   │       ├── IconSupport.vue
│   │       └── IconTooling.vue
│   ├── router/              # Configuração de rotas
│   │   └── index.ts         # Router com guards e lazy loading
│   ├── services/            # Camada de serviços
│   │   ├── api.ts           # Cliente HTTP base (fetch)
│   │   ├── authService.ts   # Serviços de autenticação
│   │   └── productService.ts # Serviços de produtos
│   ├── stores/              # Gerenciamento de estado (Pinia)
│   │   ├── auth.ts          # Store de autenticação
│   │   └── products.ts      # Store de produtos
│   ├── test/                # Testes automatizados
│   │   ├── setup.ts         # Configuração dos testes
│   │   ├── basic.test.ts    # Testes básicos
│   │   ├── api.test.ts      # Testes de API
│   │   └── utils.test.ts    # Testes de utilitários
│   ├── types/               # Definições de tipos TypeScript
│   │   └── index.ts         # Interfaces e tipos globais
│   ├── views/               # Páginas/Views da aplicação
│   │   ├── HomeView.vue     # Página inicial
│   │   ├── LoginView.vue    # Página de login
│   │   ├── ProductsView.vue # Listagem de produtos
│   │   ├── ProductFormView.vue # Formulário de produtos
│   │   └── ProductDetailView.vue # Detalhes do produto
│   ├── App.vue              # Componente raiz
│   ├── main.ts              # Ponto de entrada da aplicação
│   └── vite-env.d.ts        # Tipos do Vite
├── public/                  # Arquivos públicos
├── tests/                   # Configurações de teste
├── .gitignore
├── index.html               # Template HTML
├── package.json             # Dependências e scripts
├── postcss.config.js        # Configuração PostCSS
├── tailwind.config.js       # Configuração Tailwind CSS
├── tsconfig.json            # Configuração TypeScript
├── vite.config.ts           # Configuração Vite
├── vitest.config.ts         # Configuração Vitest
└── README.md                # Este arquivo
```

## 🎯 Funcionalidades Implementadas

### 🔐 Sistema de Autenticação
- Login com email/senha
- Validação de formulários em tempo real
- Persistência de sessão
- Logout seguro
- Redirecionamento automático
- Guards de rota para proteção

### 📦 Gerenciamento de Produtos
- **CRUD Completo**: Criar, ler, atualizar e deletar produtos
- **Upload de Imagens**: Sistema robusto de upload com preview
- **Busca e Filtros**: Busca em tempo real por nome/descrição
- **Ordenação**: Múltiplos critérios de ordenação
- **Paginação**: Navegação eficiente em grandes datasets
- **Validação**: Validação completa de formulários
- **Categorização**: Sistema de categorias para organização

### 🎨 Interface e Experiência
- **Design Responsivo**: Funciona perfeitamente em mobile/desktop
- **Loading States**: Indicadores visuais de carregamento
- **Error Handling**: Mensagens de erro claras e acionáveis
- **Breadcrumbs**: Navegação contextual
- **Modais e Confirmações**: Interações seguras para ações críticas
- **Feedback Visual**: Animações e transições suaves

## 🚀 Tecnologias e Dependências

### Core Framework
- **Vue.js 3.5.18** - Framework progressivo
- **TypeScript 5.9.2** - Superset tipado do JavaScript
- **Vite 7.1.3** - Build tool de próxima geração

### State Management & Routing
- **Pinia 3.0.3** - Store oficial do Vue 3
- **Vue Router 4.5.1** - Roteador oficial do Vue

### Styling & UI
- **Tailwind CSS 3.4.17** - Framework CSS utilitário
- **PostCSS 8.5.6** - Processador CSS
- **Autoprefixer 10.4.21** - Prefixos CSS automáticos

### Testing
- **Vitest 2.1.8** - Framework de testes nativo do Vite
- **Vue Test Utils 2.4.6** - Utilitários para testes Vue
- **jsdom 25.0.1** - Implementação DOM para testes

### Development Tools
- **Vue DevTools 8.0.0** - Ferramentas de desenvolvimento
- **Vue TSC 3.0.6** - Type checking para Vue
- **ESTree Types** - Tipos para AST JavaScript

## ⚙️ Configuração e Instalação

### Pré-requisitos
- **Node.js** 20.19.0+ ou 22.12.0+
- **npm** ou **yarn**
- **Git**

### Instalação

```bash
# Clone o repositório
git clone <repository-url>
cd INNYX-Challange/frontend

# Instale as dependências
npm install

# Configuração de ambiente (opcional)
# Crie um arquivo .env se necessário para variáveis específicas
```

### Scripts Disponíveis

```bash
# Desenvolvimento com hot-reload
npm run dev

# Build para produção
npm run build

# Preview da build de produção
npm run preview

# Executar testes
npm run test

# Executar testes com interface
npm run test:ui

# Type checking
npm run type-check
```

## 🧪 Testes

### Estrutura de Testes
- **basic.test.ts** - Testes fundamentais (números, strings, arrays, objetos, async)
- **api.test.ts** - Testes de serviços API com mocks
- **utils.test.ts** - Testes de funções utilitárias

### Executando Testes

```bash
# Executar todos os testes
npm run test

# Executar testes em modo watch
npm run test -- --watch

# Executar testes com coverage (se configurado)
npm run test -- --coverage

# Interface gráfica dos testes
npm run test:ui
```

### Cobertura de Testes
- ✅ **15 testes** passando
- ✅ **3 arquivos** de teste
- ✅ Cobertura de funções críticas
- ✅ Mocks para APIs externas

## 🎨 Design System

### Paleta de Cores INNYX

```css
/* Cores Primárias */
innyx-primary-500: #a855f7  /* Roxo principal */
innyx-secondary-500: #f97316 /* Laranja secundário */
innyx-accent-500: #0ea5e9    /* Azul para acentos */
innyx-neutral-*: /* Escala de cinzas */
```

### Componentes Customizados
- **btn-primary** - Botões primários com hover states
- **btn-secondary** - Botões secundários
- **btn-danger** - Botões de ação perigosa
- **input-field** - Campos de entrada padronizados
- **card** - Cartões com sombra e hover effects
- **navbar** - Barra de navegação com gradiente

## 🔧 Configurações Avançadas

### TypeScript
- **Strict Mode** habilitado
- **Path Mapping** com alias @/
- **Type Checking** rigoroso
- **Vue SFC** support completo

### Vite
- **Hot Module Replacement**
- **Code Splitting** automático
- **Asset Optimization**
- **Environment Variables**
- **Proxy Configuration** para desenvolvimento

### Tailwind CSS
- **Design System** customizado
- **Responsive Design** mobile-first
- **Dark Mode** ready (configurável)
- **Custom Components** com @apply

## 📈 Performance

### Otimizações Implementadas
- **Lazy Loading** de rotas e componentes
- **Tree Shaking** para bundle otimizado
- **Asset Compression** automática
- **Code Splitting** por rota
- **Preload** de recursos críticos
- **Caching** estratégico

### Métricas
- **Bundle Size** otimizado com Vite
- **Hot Module Replacement** para desenvolvimento rápido
- **Tree Shaking** automático
- **Code Splitting** por rotas

## 🔒 Segurança

### Medidas Implementadas
- **JWT Token** com expiração
- **HTTPS** enforcement
- **XSS Protection** via sanitização
- **CSRF Protection** em formulários
- **Input Validation** client-side e server-side
- **Secure Headers** configurados

## 🌐 Integração com Backend

### API Endpoints
- **GET** `/api/products` - Listar produtos
- **POST** `/api/products` - Criar produto
- **GET** `/api/products/:id` - Obter produto
- **PUT** `/api/products/:id` - Atualizar produto
- **DELETE** `/api/products/:id` - Deletar produto
- **GET** `/api/categories` - Listar categorias

### Autenticação
- **Bearer Token** em headers
- **Token Storage** no localStorage
- **Automatic Token Injection** em requisições

## 🚀 Deploy e Produção

### Build de Produção

```bash
# Gerar build otimizada
npm run build

# Preview da build
npm run preview
```

### Configurações de Deploy
- **Static Hosting** (Netlify, Vercel)
- **CDN** para assets
- **Environment Variables** por ambiente
- **Health Checks** configurados

## 📚 Documentação Adicional

### Links Úteis
- [Vue.js 3 Documentation](https://vuejs.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vitest Documentation](https://vitest.dev/)

### Padrões de Código
- **Composition API** para lógica reativa
- **TypeScript** para tipagem estática
- **Single File Components** (.vue)
- **Conventional Commits** para versionamento

## 🤝 Contribuição

### Guidelines
1. Fork o projeto
2. Crie uma branch para sua feature
3. Implemente com testes
4. Faça commit seguindo conventional commits
5. Abra um Pull Request

### Code Review
- **Type Safety** obrigatório
- **Test Coverage** para funcionalidades críticas
- **Performance** otimizada
- **Code Quality** mantida

---

**Desenvolvido com ❤️ usando Vue.js 3 + TypeScript para o INNYX Challange por Felipe Dylan Mar Fernandes**

*Este projeto demonstra as melhores práticas de desenvolvimento frontend moderno, com foco em escalabilidade, manutenibilidade e experiência do usuário.*
