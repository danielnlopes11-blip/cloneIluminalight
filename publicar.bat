@echo off
chcp 65001 >nul
title IluminaBoard · Publicar no GitHub

echo.
echo  ╔════════════════════════════════════════════════════════════════╗
echo  ║   ILUMINABOARD · Publicar atualizações no GitHub              ║
echo  ╚════════════════════════════════════════════════════════════════╝
echo.
echo  Este script envia TODOS os arquivos alterados para o GitHub.
echo  Use sempre que atualizar planilhas ou qualquer arquivo do projeto.
echo.

:: ── Pasta do repositório (pasta onde está este .bat)
set PASTA=%~dp0
cd /d "%PASTA%"

:: ── Verifica se é um repositório git
git status >nul 2>&1
if errorlevel 1 (
    echo  [ERRO] Esta pasta nao e um repositorio Git.
    echo  Clone o repositorio primeiro com:
    echo    git clone https://github.com/operacionaldaniel/IluminaBoard.git
    echo.
    pause & exit /b 1
)

:: ── Verifica alterações
echo  Verificando alteracoes...
git status --short > tmp_check.txt 2>&1
for %%A in (tmp_check.txt) do set SIZE=%%~zA
del tmp_check.txt 2>nul

if %SIZE%==0 (
    echo.
    echo  Nenhuma alteracao detectada.
    echo  Verifique se salvou os arquivos antes de publicar.
    echo.
    pause & exit /b 0
)

:: ── Mostra o que vai ser publicado
echo.
echo  Arquivos com alteracoes:
echo  ─────────────────────────────────────────────────────
git status --short
echo  ─────────────────────────────────────────────────────
echo.

:: ── Mensagem automática com data e hora
for /f "tokens=1-3 delims=/" %%a in ("%date%") do (set DIA=%%a&set MES=%%b&set ANO=%%c)
for /f "tokens=1-2 delims=: " %%a in ("%time%") do (set HORA=%%a&set MIN=%%b)
set MSG=Atualizacao %DIA%/%MES%/%ANO% %HORA%:%MIN%

echo  Mensagem do commit: "%MSG%"
echo.
set /p CONFIRM= Publicar agora? [S/N]: 
if /i not "%CONFIRM%"=="S" (
    echo  Cancelado.
    pause & exit /b 0
)

echo.
echo  [1/3] Adicionando arquivos...
git add .
if errorlevel 1 ( echo  [ERRO] Falha ao adicionar arquivos. & pause & exit /b 1 )

echo  [2/3] Criando commit...
git commit -m "%MSG%"
if errorlevel 1 ( echo  [ERRO] Falha ao criar commit. & pause & exit /b 1 )

echo  [3/3] Enviando para o GitHub...
git push origin main
if errorlevel 1 (
    echo.
    echo  [ERRO] Falha ao enviar. Possiveis causas:
    echo    - Verifique sua conexao com a internet
    echo    - Confirme suas credenciais do GitHub
    echo    - Use o GitHub Desktop se preferir
    pause & exit /b 1
)

echo.
echo  ════════════════════════════════════════════════════════════════
echo   PUBLICADO COM SUCESSO!
echo   Acesse em aproximadamente 1 minuto:
echo   https://operacionaldaniel.github.io/IluminaBoard/menu.html
echo  ════════════════════════════════════════════════════════════════
echo.
pause
