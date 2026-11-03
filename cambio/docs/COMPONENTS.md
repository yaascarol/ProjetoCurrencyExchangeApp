# Componentes implementados

| Componente | Responsabilidade | JSX / CSS Module | Props | Estado |
| --- | --- | --- | --- | --- |
| App | Layout e dados compartilhados | src/App.jsx / App.module.css | — | pair, period, consultas via hook |
| Converter | Valor, par, inversão e conversão | src/components/Converter.jsx / Converter.module.css | pair, onPairChange, currencies, query | input |
| CurrencySelect | Select controlado reutilizável | Exportado em Converter.jsx / Converter.module.css | label, value, onChange, currencies, disabled | — |
| History | Períodos, gráfico e estatísticas | src/components/History.jsx / History.module.css | pair, period, onPeriodChange, query | Dados derivados |
| HistoryData | Filtros, tabela, paginação, ordenação e CSV | src/components/HistoryData.jsx / HistoryData.module.css | query | filters, sort, page, notice |
| QueryState | Loading, erro, vazio, retry | src/components/QueryState.jsx / QueryState.module.css | status, message, onRetry, compact | — |

Relações: App → Converter → CurrencySelect; App → History/HistoryData; todos usam QueryState conforme necessário.

O par fica no ancestral App porque conversor e histórico dependem dele. Callbacks propagam alterações dos filhos. Inversão atualiza ambas as propriedades em uma operação. A key de HistoryData reinicia filtros/página ao mudar par/período.

## Hook e funções
useFrankfurter(kind, params, enabled) retorna data/status/error/retry. useEffect depende da chave de consulta, habilitação e tentativa. AbortController e flag de atividade impedem respostas obsoletas. Timeout de 30 segundos; cache em memória por cinco minutos.

services/frankfurter.js centraliza fetch/async/await e validação. utils/data.js contém funções de conversão, calendário, filter/sort, CSV e apresentação; constants/periods.js define os oito períodos.

Filtros usam condição E e limites inclusivos. sort opera em novo array. map renderiza listas com chaves estáveis. CSV usa o mesmo conjunto filtrado/ordenado da tabela, antes da paginação. Gráfico recebe série cronológica integral.

Arquitetura simplificada em relação ao planejamento inicial; não há componentes previstos listados como já implementados.


## Idiomas — 03/11/2026
LanguageProvider (`src/i18n/LanguageContext.jsx`) envolve App e mantém o idioma em useState. useLanguage fornece tradução e formatação aos componentes. Um useEffect atualiza o atributo lang, título e localStorage, com fallback quando armazenamento é bloqueado. Dicionários em messages.js. O seletor vive em App.jsx e usa App.module.css. A preferência não faz parte das dependências de consulta da API.
