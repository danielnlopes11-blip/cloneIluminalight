@echo off
chcp 65001 >nul
title Atualizar Dashboard Operacional · Iluminação Pública

echo.
echo  ╔══════════════════════════════════════════════════════════════╗
echo  ║   DASHBOARD OPERACIONAL IP · Processar Planilhas e Publicar  ║
echo  ╚══════════════════════════════════════════════════════════════╝
echo.
echo  Este script le as 3 planilhas exportadas do sistema e gera
echo  o arquivo dados_operacional.json, publicando no GitHub.
echo.

set PASTA=%~dp0
cd /d "%PASTA%"

python --version >nul 2>&1
if errorlevel 1 (
    echo  [ERRO] Python nao encontrado. Instale em python.org
    pause & exit /b 1
)

echo  Planilhas esperadas nesta pasta:
echo    - ocorrencias.xlsx  (exportacao completa do sistema)
echo    - materiais.xlsx    (materiais aplicados dia a dia)
echo    - prazos.xlsx       (relatorio de atendimentos por prazo)
echo.

:: Verifica arquivos
if not exist "ocorrencias.xlsx" (
    echo  [AVISO] ocorrencias.xlsx nao encontrada - buscando por nome similar...
)

echo  Processando...
python processar_operacional.py

if errorlevel 1 (
    echo.
    echo  [ERRO] Falha no processamento. Verifique os arquivos.
    pause & exit /b 1
)

echo.
pause
