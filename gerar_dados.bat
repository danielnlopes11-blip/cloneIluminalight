@echo off
chcp 65001 >nul
title Atualizar Dashboard · Iluminação Pública

echo.
echo  ╔═══════════════════════════════════════════════════════╗
echo  ║  DASHBOARD IP · Atualizar dados no GitHub             ║
echo  ╚═══════════════════════════════════════════════════════╝
echo.

:: ── Pasta do repositório (ajuste se necessário)
set PASTA=%~dp0

cd /d "%PASTA%"

:: Verifica se Python está instalado
python --version >nul 2>&1
if errorlevel 1 (
    echo  [ERRO] Python nao encontrado.
    echo  Instale em: https://www.python.org/downloads/
    echo  Marque "Add Python to PATH" durante a instalacao.
    pause & exit /b 1
)

echo  Convertendo planilha para JSON...
python gerar_dados.py

if errorlevel 1 (
    echo.
    echo  [ERRO] Falha ao processar a planilha.
    pause & exit /b 1
)

echo.
pause
