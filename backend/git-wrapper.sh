#!/bin/bash
# Git wrapper script para evitar warnings do proc_open()
# Este script é usado pelo sebastian/version para obter informações do git

if [ "$1" = "--version" ]; then
    echo "git version 2.34.1"
    exit 0
fi

if [ "$1" = "describe" ] && [ "$2" = "--tags" ]; then
    echo "v1.0.0"
    exit 0
fi

# Para outros comandos, tenta executar o git real se disponível
if command -v /usr/bin/git >/dev/null 2>&1; then
    exec /usr/bin/git "$@"
else
    # Se git não estiver disponível, retorna uma versão padrão
    echo "v1.0.0"
    exit 0
fi