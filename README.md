# 💡 IluminaBoard · Içara/SC

Sistema completo de gestão e visualização de indicadores de **Iluminação Pública Municipal** com dois dashboards integrados, alimentados por planilhas Excel exportadas dos sistemas operacionais.

🔗 **Acesse:** `https://operacionaldaniel.github.io/IluminaBoard/menu.html`

---

## Dashboards disponíveis

| Dashboard | Link | Dados de entrada |
|---|---|---|
| 📋 **SLAs Contratuais** | `index.html` | `template_dashboard_ip_2026.xlsx` |
| ⚙️ **Operacional** | `dashboard_operacional.html` | `ocorrencias.xlsx` + `materiais.xlsx` + `prazos.xlsx` |
| 🏠 **Menu** | `menu.html` | — |

---

## Estrutura do Repositório

```
IluminaBoard/
│
├── 📄 menu.html                        ← Página inicial (link para os dois dashboards)
├── 📄 index.html                       ← Dashboard SLAs Contratuais (IE, CME, 5 SLAs)
├── 📄 dashboard_operacional.html       ← Dashboard Operacional (OS, materiais, prazos)
│
├── 📊 dados.json                       ← Dados SLAs (atualizado pelo gerar_dados.py)
├── 📊 dados_operacional.json           ← Dados operacionais (atualizado pelo processar_operacional.py)
├── 📊 template_dashboard_ip_2026.xlsx  ← Template Excel para SLAs (preencha mensalmente)
│
├── 🐍 gerar_dados.py                   ← Converte template SLAs → dados.json + push GitHub
├── 🦇 gerar_dados.bat                  ← Atalho Windows para gerar_dados.py
├── 🐍 processar_operacional.py         ← Processa 3 planilhas → dados_operacional.json + push
├── 🦇 processar_operacional.bat        ← Atalho Windows para processar_operacional.py
│
└── 📄 README.md
```

---

## Dashboard SLAs Contratuais

### Indicadores calculados automaticamente

| SLA | Fórmula | Peso |
|---|---|---|
| **SLA 1** — Pontos IP Acesos | `PPA = 1 − (Nf − Ni) / Pt` | 40% |
| **SLA 2** — Chamados Emergência | `PCE = NCEa / NCEi` | 20% |
| **SLA 3** — Chamados Não Emerg. | `PCNE = NCNEa / NCNEi` | 20% |
| **SLA 4** — Disponib. Sistema | `TOS = (1440×Dm − Ti) / (1440×Dm)` | 10% |
| **SLA 5** — Pesquisa Satisfação | `% Ótimo + % Bom ≥ 90%` | 10% |

```
IE  = (SLA1×0,4) + (SLA2×0,2) + (SLA3×0,2) + (SLA4×0,1) + (SLA5×0,1)
CME = CMM × FM × IE
```

### Atualização mensal (SLAs)

```
1. Abra template_dashboard_ip_2026.xlsx
2. Preencha a linha do mês com os dados dos sistemas
3. Salve na pasta do repositório
4. Duplo clique em gerar_dados.bat
5. ✓ Dashboard atualizado em ~1 minuto
```

---

## Dashboard Operacional

### O que é exibido

- **Visão Geral** — 6 KPIs, distribuição de status, origens, top 10 bairros
- **Índices de Trabalho** — produtividade por equipe, OS/dia, tipos de ocorrência
- **Origens & Manutenções** — 5 canais (Ronda, Call Center, Chatbot, App, Tele Gestão)
- **Materiais** — 13 tipos de material com quantidades e gráficos
- **Prazos** — desempenho por origem, atrasos detalhados
- **Comparativo** — manutenções, bairros, resumo executivo

### Atualização mensal (Operacional)

**Opção A — Via import no browser (sem script):**
```
1. Acesse dashboard_operacional.html
2. Clique "⬆ Nova importação"
3. Arraste as planilhas nos slots correspondentes:
   • Ocorrências → exportação completa do sistema
   • Materiais   → materiais aplicados no mês (opcional)
   • Prazos      → relatório de prazos (opcional)
4. Clique "▶ Gerar Dashboard"
   → Dados ficam na sessão do browser apenas
```

**Opção B — Publicar para todos (recomendado):**
```
1. Coloque na pasta do repositório:
   • ocorrencias.xlsx
   • materiais.xlsx   (opcional)
   • prazos.xlsx      (opcional)
2. Duplo clique em processar_operacional.bat
3. ✓ JSON atualizado e publicado — todos veem os dados novos
```

### Barra de meses

- Jan a Dez de 2026 sempre visíveis na barra horizontal
- Meses **sem dados** aparecem acinzentados (desabilitados)
- Meses **com dados** ficam clicáveis — alterne com um clique
- Importar novos meses acumula sem apagar os anteriores

---

## Configuração inicial (uma vez)

### 1. Instalar Git
- Windows: https://git-scm.com/download/win
- Mac: `git --version` no Terminal (instala automaticamente)

### 2. Configurar identidade
```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

### 3. Clonar o repositório
```bash
git clone https://github.com/operacionaldaniel/IluminaBoard.git
```

### 4. Gerar token de acesso (GitHub)
- Acesse: https://github.com/settings/tokens
- **Generate new token (classic)** → marque `repo`
- Use o token como senha na primeira execução dos scripts

---

## Atualizar arquivos no GitHub manualmente

```
1. Acesse o repositório no GitHub
2. Clique no arquivo → botão "..." → Upload new file
3. Faça o upload da versão nova
4. Commit changes
   → Atualização disponível em ~1 minuto
```

---

## Tecnologias

- **HTML5 + CSS3 + JavaScript** — sem frameworks, sem instalação
- **SheetJS (xlsx.js)** — leitura de Excel no browser via CDN
- **Canvas API** — gráficos nativos sem bibliotecas externas
- **GitHub Pages** — hospedagem gratuita

---

*IluminaBoard · Gestão de Iluminação Pública · Içara/SC · 2026*
