# 🚀 Guia para Hospedar no GitHub

Siga os passos abaixo para conectar seu repositório local ao GitHub.

## 1. Criar Repositório no GitHub

1. Acesse [github.com](https://github.com)
2. Clique em **"New repository"** (ou o ícone **+** no canto superior direito)
3. **Nome:** `teste_api` (ou outro nome desejado)
4. **Descrição:** "API REST para gerenciar pedidos com Node.js e Express"
5. **Visibilidade:** Public (recomendado) ou Private
6. **NÃO** marque "Initialize this repository with:" (pois já temos commits locais)
7. Clique em **"Create repository"**

## 2. Configurar Remote no Git Local

Após criar o repositório, você verá um URL parecido com:
```
https://github.com/seu-usuario/teste_api.git
```

Execute no terminal (dentro de `e:\teste_api`):

```powershell
cd e:\teste_api

# Adicionar o remote
git remote add origin https://github.com/seu-usuario/teste_api.git

# Renomear branch main (se necessário)
git branch -M main

# Fazer push dos commits
git push -u origin main
```

## 3. Com SSH (Alternativa - Recomendado)

Se tiver SSH configurado no GitHub:

```powershell
git remote add origin git@github.com:seu-usuario/teste_api.git
git branch -M main
git push -u origin main
```

## 4. Commit History

O repositório contém os seguintes commits organizados:

```
c59e44c - test: Adicionar scripts de teste dos endpoints
4a2ecd7 - feat: Adicionar suporte a PostgreSQL (opcional)
ef0aac9 - feat: Implementar API REST com endpoints CRUD
a8a7821 - chore: Adicionar package.json com dependências
8f36d79 - docs: Adicionar documentação, licença e gitignore
```

### Convenções de Commit

Cada commit segue a convenção:

- **docs:** Documentação (README, DOCS, LICENSE)
- **chore:** Configurações e dependências
- **feat:** Novas features/funcionalidades
- **test:** Testes
- **fix:** Correções de bugs
- **refactor:** Refatoração de código

## 5. Verificar Status

Após fazer push, verifique:

```powershell
git status
# Deve mostrar: "nothing to commit, working tree clean"

git remote -v
# Deve mostrar a URL do GitHub
```

## 6. Trabalho Futuro

Para novos commits:

```powershell
# Fazer alterações nos arquivos...

# Adicionar alterações
git add .

# Commit com mensagem clara
git commit -m "tipo: Descrição do que foi feito"

# Fazer push
git push origin main
```

## 📝 Exemplo de Novos Commits

```powershell
# Corrigir bug
git commit -m "fix: Corrigir validação de pedido duplicado"

# Nova feature
git commit -m "feat: Adicionar autenticação com JWT"

# Documentação
git commit -m "docs: Atualizar README com exemplos"

# Refatoração
git commit -m "refactor: Extrair lógica em módulo separado"
```

## 🔑 Autenticação no GitHub (se necessário)

Se receber erro de autenticação:

### Via Token (Recomendado)
```powershell
# Gerar token em: https://github.com/settings/tokens
# Usar como password quando solicitado
git push -u origin main
```

### Via SSH
1. Gerar chave SSH:
```powershell
ssh-keygen -t ed25519 -C "seu-email@example.com"
```

2. Adicionar chave ao GitHub em: https://github.com/settings/ssh

## ✅ Pronto!

Seu repositório está agora hospedado no GitHub com histórico de commits bem organizado! 🎉

**Próximas ações:**
- Adicionar badges ao README
- Configurar GitHub Actions para CI/CD
- Criar releases e tags
- Adicionar mais testes automatizados
