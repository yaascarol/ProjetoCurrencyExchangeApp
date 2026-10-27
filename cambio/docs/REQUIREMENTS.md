# Requisitos — versão de reconstrução

Base: partes 1 a 10 do enunciado e os 16 cartões do Board de Desenvolvimento enviados pelo aluno. Reconstrução completa autorizada pelo usuário em 27/10/2026 após perda dos arquivos; critérios e decisões abaixo consolidam o produto.

## Problema e objetivo

Centralizar consulta de câmbio, conversão de valores e análise histórica em uma SPA React, evitando cálculos manuais e cópia de dados para planilhas. Fonte de dados: API Frankfurter.

## Público-alvo

Pessoas que precisam consultar taxas, simular conversões e analisar/exportar o histórico de um par de moedas. Perfis específicos não foram definidos no enunciado; a ferramenta não realiza operações financeiras.

## Escopo do produto

Conversor com seleção e inversão de moedas, histórico com oito períodos, gráfico, tabela com filtros combinados e ordenação e exportação CSV no navegador. Os critérios de aceite estão associados aos requisitos funcionais abaixo.

## Requisitos funcionais e critérios de aceite

| ID | Requisito | Critério de aceite |
| --- | --- | --- |
| RF01 | Selecionar moeda de origem e destino | Ao alterar uma seleção, o par utilizado na conversão e na análise corresponde às moedas selecionadas. |
| RF02 | Informar valor e converter | Para valor válido e taxa disponível, o resultado corresponde ao valor informado multiplicado pela taxa do par. |
| RF03 | Exibir taxa e data da cotação | A conversão apresenta a taxa efetivamente utilizada e a data retornada pela API. |
| RF04 | Consultar histórico do par | A consulta retorna observações do par selecionado para o período solicitado. |
| RF05 | Alterar período | Oferecer 7 dias, 15 dias, 30 dias, 3 meses, 6 meses, 1 ano, 5 anos e 10 anos. O gráfico é atualizado ao alterar o par ou o período; a tabela representa a série consultada. |
| RF06 | Exibir gráfico e tabela | Os dois formatos representam a mesma série consultada, com datas e taxas identificáveis. Filtros afetam somente tabela e CSV, preservando o gráfico do período. |
| RF07 | Filtrar registros | Permitir intervalo de datas e cotação mínima/máxima, isoladamente ou em combinação. Exibir apenas os registros que satisfaçam todos os filtros ativos. |
| RF08 | Ordenar registros | Permitir ordenação por data e por cotação, sem modificar os valores. Direções ascendente e descendente; padrão por data decrescente. |
| RF09 | Exportar CSV filtrado | Gerar o arquivo no navegador, com cabeçalhos e apenas os registros filtrados. Impedir exportação sem registros e usar nome identificável. Preservar a ordem exibida e incluir todas as páginas filtradas. |
| RF10 | Informar estados da consulta | Durante a requisição há indicação de carregamento; em falha há mensagem de erro; sem resultados há mensagem específica, sem apresentar dados fictícios. |
| RF11 | Inverter moedas | Ao acionar a inversão, origem e destino trocam de posição; resultado, taxa e histórico passam a corresponder ao novo par. |
| RF12 | Validar entradas | Entradas inválidas apresentam orientação e não produzem conversão enganosa. Valor de 0 a 1 trilhão, até oito casas, ponto/vírgula decimal sem milhar; moedas iguais bloqueadas. |
| RF13 | Limpar filtros | Uma ação remove todos os filtros de data e cotação, restaurando os registros da série consultada. |
| RF14 | Contar resultados | Exibir a quantidade de registros após aplicar os filtros, inclusive zero. |
| RF15 | Apresentar colunas mínimas | Cada registro da tabela contém data, moeda de origem, moeda de destino e cotação. |

## Regras de negócio adotadas

- RN01: calcular conversão como `valor × taxa`; conservar a precisão do cálculo e arredondar apenas na apresentação/exportação conforme a precisão definida.
- RN02: mostrar a data da cotação recebida, sem confundi-la com a data da consulta. A API fornece dados de referência diários, não preços em tempo real.
- RN03: não inventar observações para datas sem cotação; informar o intervalo efetivamente disponível.
- RN04: validar valor vazio, não numérico ou fora do intervalo permitido antes de converter. Zero permitido; negativos rejeitados; máximo 1 trilhão.
- RN05: validar início menor ou igual ao fim e datas válidas. Os períodos terminam no dia atual de São Paulo. Dias incluem o dia final; meses/anos recuam no calendário e ajustam dia ao último válido do mês. Filtros têm limites inclusivos; datas futuras não produzem registros inexistentes.
- RN06: impedir que uma resposta atrasada de uma seleção anterior substitua os dados do par atual.
- RN07: não apresentar falha de consulta como resultado zero; distinguir erro de ausência de dados.
- RN08: exportar os dados derivados dos filtros e da ordenação, sem uma segunda consulta que possa produzir resultados diferentes.
- RN09: bloquear conversão e histórico quando origem e destino forem iguais.
- RN10: combinar filtros com condição lógica E; cotação mínima não pode ser maior que a máxima. Limites são inclusivos.
- RN11: gerar nome identificável para o CSV; formato: `hermes_USD_BRL_2026-10-01_2026-10-27.csv`, usando o par e as datas correspondentes aos dados exportados.
- RN12: nunca habilitar exportação de um conjunto vazio. CSV UTF-8 com BOM, ponto e vírgula como separador, vírgula decimal e aspas escapadas; sem arredondar a taxa recebida.

## Fora do escopo

Não implementar autenticação, cadastro de usuários, back-end próprio, banco de dados, pagamentos ou compra/venda real de moedas. As requisições e a geração de CSV serão realizadas no navegador.

## Requisitos técnicos confirmados

- SPA em React com JavaScript, JSX e CSS Modules.
- Vite para criação, desenvolvimento e build; componentes React funcionais.
- Componentes com imports/exports, props, eventos e renderização de listas com chaves estáveis.
- `useState` para estado de interface; lifting state up para informações compartilhadas.
- `useEffect` para sincronização com API; `fetch` e `async/await` para requisições.
- Hooks customizados para encapsular lógica reutilizável de consulta e seus estados.
- Manipulação de arrays/objetos para filtros, ordenação e transformação dos dados.
- Biblioteca de gráficos: Recharts.
- Lucide React, date-fns e Papa Parse são exemplos de bibliotecas auxiliares permitidas, não obrigações.
- Testes de API no Postman; documentação técnica; Git e GitHub.
- O aluno deve conseguir explicar conversão, estados, efeitos, filtros, ordenação, consumo da API e exportação. Bibliotecas devem apoiar a implementação sem substituir a aprendizagem desses conceitos.

## Processo incremental de aprendizagem

Para cada conceito estudado: compreender → implementar uma etapa pequena → testar → registrar um commit real descrevendo a mudança.

Não simular datas, aulas realizadas ou histórico de desenvolvimento. A aplicação foi reconstruída e testada; commits registram a evolução real desta sessão.

| Conteúdo | Aplicação prevista | Verificação prevista |
| --- | --- | --- |
| JSX, componentes, imports/exports e CSS Modules | Estrutura e interface inicial | Renderização e estilos isolados |
| Props, listas, eventos e useState | Seletores e formulário | Interações e atualização do estado |
| Lifting state up | Par e período compartilhados | Conversor e análise coerentes |
| useEffect, fetch e async/await | Integração Frankfurter | Resposta, carregamento, falha e vazio |
| Hooks customizados | Extração da lógica de consulta | Preservar comportamento e cancelar requisições obsoletas |
| Arrays e objetos | Transformações, filtros e ordenação | Conferir conjunto e ordem dos registros |
| Bibliotecas React | Gráfico histórico | Datas e valores coerentes com a tabela |
| Exportação CSV | Download do conjunto filtrado | Conferir conteúdo e caracteres especiais |
| Postman e documentação | Collection e guia técnico | Executar requests e reproduzir instalação |

A tabela acima relaciona conceitos e aplicações; a sequência de execução é a dos 16 cartões recebidos, registrada em [DEVELOPMENT_BOARD.md](DEVELOPMENT_BOARD.md), acompanhando o avanço das aulas.

### Board e fluxo Git

Não há datas intermediárias obrigatórias. O board é um guia de desenvolvimento, não uma solução pronta. Para cada conteúdo de aula: identificar a atividade no board → aplicar o conceito → testar → fazer um commit representativo → mover o cartão conforme a evolução real.

Fluxo sugerido pelo enunciado: `main` para versão estável, `dev` para integração e branches de feature/refactor quando necessário. Usar commits pequenos e semânticos (`feat:`, `refactor:`, `test:`, `docs:`), sem simular etapas ou testes. Branches main/dev configuradas; acompanhamento local, sem alteração dos cartões externos.

O board prevê interface estática com dados fictícios na etapa 3, componentização na 4, props na 5, interatividade na 6, Postman na 7, funções de negócio na 8, integração na 9, efeitos na 10 e extração de hooks na 11. Os dados fictícios devem ser identificados como demonstração e removidos da aplicação final; nunca devem substituir silenciosamente uma consulta real com falha.

### Estrutura sugerida

```text
src/
  assets/
  components/
  hooks/
  services/
  utils/
  constants/
  App.jsx
  App.module.css
  main.jsx
docs/
  REQUIREMENTS.md
  COMPONENTS.md
  FIGMA.md
  API_TESTS.md
  FUNCTION_TESTS.md
  AI_USAGE.md
README.md
```

A estrutura pode evoluir, mantendo responsabilidades claras. A Collection Postman exportada em JSON também é obrigatória; o local previsto é `docs/postman/`.

### Validação mínima antes da entrega

A cobertura e os limites reais de verificação estão em FUNCTION_TESTS.md. O checklist abaixo é a referência de aceite, não uma declaração de execução de todos os cenários.

- [ ] Conversão entre duas moedas.
- [ ] Inversão das moedas.
- [ ] Atualização dos dados ao alterar o par.
- [ ] Todos os oito períodos históricos.
- [ ] Gráfico com dados reais.
- [ ] Tabela com dados reais.
- [ ] Filtros individuais e combinados.
- [ ] Ordenação.
- [ ] Exportação CSV.
- [ ] Entradas inválidas.
- [ ] Ausência de dados.
- [ ] Falha na API.
- [ ] Estados de loading.
- [ ] Responsividade em desktop e celular.
- [ ] Instalação e execução a partir do README.

Documentar separadamente a investigação no Postman em `API_TESTS.md` e os testes das funções JavaScript em `FUNCTION_TESTS.md`. Registrar entradas, resultados esperados, resultados observados e evidências reais.

## Requisitos não funcionais propostos

| ID | Requisito | Verificação prevista |
| --- | --- | --- |
| RNF01 | Responsividade | Conferir desktop e mobile; evitar rolagem horizontal da página, admitindo contêiner próprio para a tabela. |
| RNF02 | Acessibilidade | Usar rótulos nos campos, foco visível, navegação por teclado e mensagens de estado acessíveis; manter tabela como alternativa textual ao gráfico. |
| RNF03 | Robustez | Tratar falha HTTP, rede, resposta inválida e resultado vazio; evitar resposta obsoleta ao trocar par/período. |
| RNF04 | Manutenibilidade | Componentes funcionais, CSS Modules e separação entre consulta, transformação de dados e apresentação. |
| RNF05 | Uso com séries longas | Verificar os períodos de 5 e 10 anos; eventual redução de pontos apenas visual não deve eliminar registros da tabela/exportação. |
| RNF06 | Reprodutibilidade | Documentar instalação, execução, build, dependências e testes; manter Collection Postman e histórico Git verdadeiro. |

Metas numéricas de desempenho e navegadores suportados ainda não foram estabelecidos.

## Investigação da API antes da integração

Utilizar Frankfurter v2. A aplicação calcula o valor convertido a partir da taxa obtida; não delegar a conversão do valor informado a um endpoint.

Antes da integração React, investigar no Postman:

| Consulta | Endpoint inicial | O que registrar |
| --- | --- | --- |
| Moedas disponíveis | `GET https://api.frankfurter.dev/v2/currencies` | Estrutura da lista e campos de identificação das moedas. |
| Cotação recente | `GET https://api.frankfurter.dev/v2/rate/EUR/USD` | Estrutura do objeto, taxa e data efetiva. |
| Histórico | `GET https://api.frankfurter.dev/v2/rates?from=2024-05-01&to=2024-05-31&base=EUR&quotes=USD` | Parâmetros, estrutura da série, datas disponíveis e ordem retornada. |
| Erros | Variações controladas com moeda/data/parâmetros inválidos | Status HTTP e corpo real da resposta, sem presumir formato único. |
| Dias sem publicação | Consultas de fim de semana e comparação com datas próximas | Se retorna data anterior, vazio ou outro comportamento; investigar separadamente cotação pontual e intervalo. |

Registrar requisição, parâmetros, status, amostra do JSON e interpretação. Consultas anteriores pelo terminal não equivalem à investigação exigida no Postman. A Collection foi executada via Newman antes da integração; detalhes em API_TESTS.md. A interface gráfica do Postman não foi utilizada.

## Planejamento visual e componentes

- Criar wireframe de baixa fidelidade e protótipo de média fidelidade no Figma, com desktop, adaptação mobile e estados de carregamento, erro e ausência de dados.
- Os anexos são sugestões visuais: marca HERMES; direção editorial; paleta Ink `#172A24`, Forest `#175F49`, Paper `#F6F7F5`, Surface `#FFFFFF`, Line `#DCE4DF` e Accent `#DCECE3`; tipografia Inter; grade de 8 px.
- Fluxo sugerido: conversor → gráfico/período → filtros/tabela → CSV.
- O seletor PT/EN/ES aparece nas referências, mas não foi confirmado no escopo mínimo. Não tratar internacionalização como requisito obrigatório sem confirmação.
- O planejamento de componentes está em [COMPONENTS.md](COMPONENTS.md). O documento descreve os arquivos efetivamente implementados.
- As referências recebidas não equivalem a um protótipo Figma criado e entregue. A entrega Figma permanece pendente.

## Entregas e pendências

Aplicação, build, documentação, Collection, testes e protótipos SVG estão disponíveis. Repositório público GitHub e arquivo/link Figma dependem de acesso às contas. Conferir DELIVERY.md, FIGMA.md e FUNCTION_TESTS.md para limites da validação. Idiomas adicionais não implementados.

## Referências

- Enunciado: partes 1 a 10, imagens de wireframe/design guide e 16 cartões do board fornecidos na conversa.
- Documentação oficial: https://frankfurter.dev/
- Link do Notion fornecido, ainda sem leitura bem-sucedida: https://deluxe-blue-bc1.notion.site/Projeto-01-Currency-Exchange-App-3e4dfca74d8d819ebfeedbdbe661d76e

