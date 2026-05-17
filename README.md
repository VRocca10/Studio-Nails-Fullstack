# Studio Nails Fullstack

Aplicacao web para estudio de unhas com:
- Landing page (hero, servicos, galeria e contato)
- Autenticacao (login e cadastro)
- Painel administrativo com CRUD de servicos, galeria e agendamentos
- Integracao com Supabase (Auth + Postgres)

## Tecnologias

- React 18
- Vite 5
- React Router DOM
- Supabase JS
- CSS puro

## Estrutura principal

```txt
src/
  contexts/
    AuthContext.jsx
  features/
    contact/
    gallery/
    hero/
    layout/
    navigation/
    services/
  lib/
    supabase.js
  pages/
    Login.jsx
    Register.jsx
    AdminLogin.jsx
    AdminDashboard.jsx
  services/
    api.js
  App.jsx
  main.jsx
  styles.css
```

## Requisitos

- Node.js 20+
- NPM 10+
- Projeto Supabase ativo

## Instalacao

```bash
npm install
```

## Configuracao de ambiente

Crie um arquivo `.env` com:

```env
VITE_SUPABASE_URL=https://SEU-PROJECT-REF.supabase.co
VITE_SUPABASE_ANON_KEY=SUA_ANON_PUBLIC_KEY
```

Use os valores em: **Supabase > Settings > API**.

## Banco de dados (Supabase)

Execute o arquivo `supabase-schema.sql` no SQL Editor do Supabase para criar as tabelas:
- `services`
- `gallery`
- `contacts`
- `appointments`

## RLS e policies (essencial)

Se o RLS estiver ativo sem policies, o front vai falhar com erro de permissao.

Exemplo minimo para funcionar em desenvolvimento:

```sql
alter table services enable row level security;
alter table gallery enable row level security;
alter table contacts enable row level security;
alter table appointments enable row level security;

create policy "services_all" on services for all to anon, authenticated using (true) with check (true);
create policy "gallery_all" on gallery for all to anon, authenticated using (true) with check (true);
create policy "contacts_insert" on contacts for insert to anon, authenticated with check (true);
create policy "appointments_all" on appointments for all to anon, authenticated using (true) with check (true);
```

> Em producao, restrinja policies para perfis autenticados/admin.

## Rodando o projeto

```bash
npm run dev
```

Build:

```bash
npm run build
npm run preview
```

## Rotas

- `/login` -> login principal
- `/register` -> cadastro de usuario
- `/` -> landing protegida por login (se nao autenticado, redireciona para `/login`)
- `/admin/login` -> login administrativo
- `/admin` -> painel admin (protegido)

## Credencial de teste local

O projeto possui usuario de teste no frontend:

- Email: `teste@studionails.com`
- Senha: `StudioNails@123`

Com essa credencial, o acesso funciona localmente sem depender do Supabase Auth.

## Funcionalidades implementadas

- Login e logout
- Cadastro de usuario via Supabase Auth
- Envio de contato para tabela `contacts`
- CRUD de servicos no painel admin
- CRUD de galeria no painel admin
- CRUD de agendamentos no painel admin

## Observacoes importantes

- Se aparecer `Failed to fetch`, verifique URL/chave do Supabase e se o projeto esta online.
- Se aparecer `DNS_PROBE_FINISHED_NXDOMAIN`, a `VITE_SUPABASE_URL` esta incorreta.
- Em ambiente Windows/OneDrive pode ocorrer bloqueio do Vite/esbuild por permissao.

## Sugestoes de proximos passos

- Separar painel admin por paginas (`/admin/services`, `/admin/gallery`, `/admin/appointments`)
- Adicionar confirmacao antes de excluir
- Adicionar upload de imagem (Supabase Storage)
- Criar perfil de usuario/admin em tabela `profiles`
- Restringir policies para maior seguranca
