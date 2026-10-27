# Mapeamento de componentes — proposta preliminar

Planejamento consolidado com as partes 1 a 10 e o board recebido. Não representa funcionalidades implementadas. Caminhos relativos à raiz do projeto; cada componente tem seu CSS Module junto ao JSX. Este é o mapa da arquitetura pretendida: iniciar com JSX estático na etapa 3, refatorar em componentes na 4, configurar props na 5 e extrair custom hooks na 11, conforme [DEVELOPMENT_BOARD.md](DEVELOPMENT_BOARD.md).

## Componentes

| Componente | Responsabilidade | Arquivo JSX | CSS Module | Principais props | Estados próprios |
| --- | --- | --- | --- | --- | --- |
| App | Coordenar par, período e consultas; distribuir dados compartilhados | `src/App.jsx` | `src/App.module.css` | — | `base`, `quote`, `period`; estados de consulta via hooks |
| Header | Identidade visual e apresentação da ferramenta | `src/components/Header/Header.jsx` | `src/components/Header/Header.module.css` | `title` | Nenhum |
| CurrencyConverter | Entrada do valor, seleção/inversão do par e resultado | `src/components/CurrencyConverter/CurrencyConverter.jsx` | `src/components/CurrencyConverter/CurrencyConverter.module.css` | `base`, `quote`, `currencies`, `rate`, `rateDate`, `status`, `onPairChange` | `amountInput`; validação derivada |
| CurrencySelect | Campo de moeda controlado e reutilizável | `src/components/CurrencySelect/CurrencySelect.jsx` | `src/components/CurrencySelect/CurrencySelect.module.css` | `id`, `label`, `value`, `currencies`, `disabled`, `onChange` | Nenhum |
| HistorySection | Organizar seletor de período, gráfico e estados da consulta | `src/components/HistorySection/HistorySection.jsx` | `src/components/HistorySection/HistorySection.module.css` | `base`, `quote`, `period`, `history`, `status`, `error`, `onPeriodChange`, `onRetry` | Nenhum |
| PeriodSelector | Oferecer os oito períodos obrigatórios | `src/components/PeriodSelector/PeriodSelector.jsx` | `src/components/PeriodSelector/PeriodSelector.module.css` | `value`, `onChange` | Nenhum |
| HistoryChart | Renderizar a série cronológica usando biblioteca de gráficos | `src/components/HistoryChart/HistoryChart.jsx` | `src/components/HistoryChart/HistoryChart.module.css` | `data`, `base`, `quote` | Apenas interação visual interna da biblioteca |
| HistoryData | Compartilhar conjunto filtrado/ordenado entre tabela, contador e CSV | `src/components/HistoryData/HistoryData.jsx` | `src/components/HistoryData/HistoryData.module.css` | `history`, `base`, `quote`, `status`, `error`, `onRetry` | `filters`, `sort` |
| HistoryFilters | Campos de intervalo de datas, mínimo/máximo e limpeza | `src/components/HistoryFilters/HistoryFilters.jsx` | `src/components/HistoryFilters/HistoryFilters.module.css` | `value`, `errors`, `onChange`, `onClear` | Nenhum; campos controlados |
| RatesTable | Exibir colunas obrigatórias, contagem e controles de ordenação | `src/components/RatesTable/RatesTable.jsx` | `src/components/RatesTable/RatesTable.module.css` | `rows`, `sort`, `onSortChange` | Nenhum |
| ExportCsvButton | Iniciar download no navegador; impedir exportação vazia | `src/components/ExportCsvButton/ExportCsvButton.jsx` | `src/components/ExportCsvButton/ExportCsvButton.module.css` | `rows`, `base`, `quote`, `disabled` | Erro local de geração, se necessário |
| QueryState | Apresentar loading, erro ou vazio com mensagem contextual | `src/components/QueryState/QueryState.jsx` | `src/components/QueryState/QueryState.module.css` | `status`, `message`, `onRetry` | Nenhum |

## Relações e fluxo de dados

```text
App
├── Header
├── CurrencyConverter
│   ├── CurrencySelect (origem)
│   ├── CurrencySelect (destino)
│   └── QueryState
├── HistorySection
│   ├── PeriodSelector
│   ├── HistoryChart
│   └── QueryState
└── HistoryData
    ├── HistoryFilters
    ├── RatesTable
    ├── ExportCsvButton
    └── QueryState
```

`App` mantém o par porque conversor e histórico dependem dele (lifting state up). Alterações são comunicadas pelos filhos via callbacks. Inverter moedas deve atualizar o par em uma única operação coerente.

`HistoryData` mantém filtros e ordenação porque tabela e exportação dependem do mesmo conjunto. `rows` é derivado da série e dos filtros, sem duplicar esses registros em outro estado. Contagem equivale a `rows.length`; exportação recebe exatamente `rows`.

Proposta: filtros afetam somente tabela e CSV, enquanto o gráfico apresenta todo o período selecionado. Essa decisão ainda será consolidada com o restante do enunciado. A série do gráfico permanece em ordem cronológica independentemente da ordenação da tabela.

## Hooks e funções auxiliares previstos

| Arquivo | Responsabilidade | Estado/retorno |
| --- | --- | --- |
| `src/hooks/useCurrencies.js` | Consultar moedas disponíveis | `data`, `status`, `error`, `retry` |
| `src/hooks/useExchangeRate.js` | Consultar taxa do par atual | `data`, `status`, `error`, `retry` |
| `src/hooks/useRateHistory.js` | Consultar histórico conforme par e período | `data`, `status`, `error`, `retry` |
| `src/services/frankfurter.js` | Centralizar endpoints e tratamento HTTP com fetch/async/await | Funções assíncronas; aceitam AbortSignal |
| `src/utils/history.js` | Filtrar e ordenar sem modificar a série original | Funções puras; não exigem hook |
| `src/utils/periods.js` | Calcular limites dos oito períodos | Datas para consulta; regras de calendário a definir |
| `src/utils/csv.js` | Serializar cabeçalhos/linhas e gerar download | CSV escapado, Blob e liberação da object URL |
| `src/utils/formatters.js` | Formatar valores e datas para apresentação | Strings; sem alterar dados originais |

Hooks de consulta usarão `useEffect`, `useState` e cancelamento/controle de respostas obsoletas. Loading, erro e vazio serão distintos. Conversão será calculada pela aplicação com a taxa recebida; alterar apenas o valor não deve exigir outra consulta.

## Validação do planejamento

- Confirmar formatos e erros no Postman antes de codificar os serviços/hooks.
- Definir regras pendentes de validação, períodos e moedas iguais no documento de requisitos.
- Conferir os componentes contra protótipos desktop/mobile e estados de consulta.
- Escolher biblioteca de gráficos após completar o enunciado.
- Aplicar e testar cada conceito conforme a sequência das aulas, registrando commits reais.
