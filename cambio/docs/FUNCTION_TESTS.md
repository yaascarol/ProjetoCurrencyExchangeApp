# Testes de funções e interface

## Automatizados
`npm test`, Node 24.19.0: **8 testes aprovados, zero falhas**, em 27/10/2026.

- data.test.js: conversão, zero, inválidos, ponto/vírgula, limite; oito períodos, mês curto e ano bissexto.
- data.test.js: filtros inclusivos combinados, limpeza, vazio, ordenação numérica e imutabilidade.
- data.test.js: intervalos inválidos, CSV com cabeçalho/BOM/escaping, seleção e nome, bloqueio de vazio.
- service.test.js: HTTP 503, JSON inválido, vazio, datas fora do intervalo, erro de rede e aborto.

## Navegador
- USD/BRL: 1000 × 5,3126 = R$ 5.312,60; 10,50 resulta em R$ 55,78.
- Inversão mudou os dois seletores e disparou consultas do novo par.
- Valor -1 exibiu erro e suprimiu o resultado.
- Loading observado nas consultas.
- Todos os oito períodos carregaram gráfico/tabela; dez anos mostrou 3653 registros.
- Mínimo 999 resultou em vazio e CSV desabilitado; Limpar restaurou dados.
- Filtros de 20–27/10/2026 e cotação 5,1–5,4 produziram duas linhas, de 26 e 27/10.
- CSV baixado e lido no disco: cabeçalhos e exatamente essas duas linhas.
- Ordenação por cotação reorganizou numericamente as linhas.
- Desktop 1280 px e mobile 390 px sem largura de documento excedente ao viewport.
- Evidências: [desktop](screenshots/desktop.png), [mobile](screenshots/mobile.png).

## Correções
Configurado JSX automático no Vite após detectar React is not defined. Adicionado onInput aos campos date para sincronizar estado no preenchimento; filtros e download repetidos com sucesso.

## Limites
Falhas HTTP/rede e lista vazia da API foram simuladas no serviço, não em modo offline do navegador. Vazio por filtro e loading foram verificados na interface. Instalação executada pelo assistente; conferência por segunda pessoa pendente. Build executado; isso não comprova hospedagem pública.

