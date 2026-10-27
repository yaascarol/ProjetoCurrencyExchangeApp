# Entrega

## Prévia publicada

https://cambio-currency-lab-271026.hazy-cow-7421.chatgpt.site

Publicação confirmada em 27/10/2026, com acesso privado à conta proprietária. Não é um link público para o professor.

## Backup do histórico

O pacote HERMES-entrega.zip inclui o código e HERMES-historico.bundle. Para recuperar um repositório com os commits, executar em uma pasta nova:

```sh
git clone HERMES-historico.bundle hermes-recuperado
cd hermes-recuperado/cambio
npm ci
npm run dev
```

O clone do bundle recupera a branch principal e as referências remotas; criar dev local a partir de origin/dev quando necessário. Não clonar sobre uma pasta existente com arquivos.

## Disponível
SPA React/Vite, build dist, documentação, Collection Postman e resultados Newman, testes, SVGs importáveis, capturas desktop/mobile e commits locais reais.

## Pendências externas

### GitHub público
Repositório público ainda não criado. Instalar/conectar GitHub ou criar repositório público vazio e publicar o Git local. A pasta Git é a pasta pai de cambio.

```sh
git remote add origin URL_DO_REPOSITORIO
git push -u origin main
git push -u origin dev
```

Substituir o placeholder pelo endereço real. Se origin existir, verificar antes de alterar. Não enviar node_modules, credenciais ou temporários.

### Figma
Importar SVGs conforme FIGMA.md e inserir link compartilhável. Apenas SVG local não conclui a exigência Figma.

### Postman
Collection testada por Newman; se exigida evidência da interface gráfica, importar, executar e capturar no Postman.

Conferir README a partir de um clone, revisar autoria/uso de IA e links. Prévia privada de hospedagem não substitui acesso do professor nem repositório público.

