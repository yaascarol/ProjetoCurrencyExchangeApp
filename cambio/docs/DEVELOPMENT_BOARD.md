# Board de Desenvolvimento

Transcrição resumida dos 16 cartões enviados pelo usuário. Nas imagens, todos estão em **A fazer**, com checklist desmarcado. Este arquivo é acompanhamento local; nenhum cartão externo foi alterado.

## Sequência e evidências

| Ordem | Atividade | Resultado esperado / orientação | Situação local |
| --- | --- | --- | --- |
| 1 | Entender o problema e definir os requisitos | REQUIREMENTS.md com escopo, RF, RNF, regras e critérios verificáveis; primeiro commit | Em elaboração: documento criado; decisões pendentes e sem commit |
| 2 | Criar os protótipos e planejar a interface | Figma de baixa e média fidelidade, desktop, mobile e estados; planejar cabeçalho, conversor, períodos, gráfico, filtros, tabela e CSV antes de programar | A fazer; referências recebidas e componentes propostos |
| 3 | Montar a primeira interface com JSX | Vite e interface estática com dados fictícios; não integrar API nesta etapa | A fazer; apenas estrutura inicial preparada |
| 4 | Refatorar a interface em componentes | Dividir a interface em blocos reutilizáveis com responsabilidades claras | A fazer |
| 5 | Configurar os componentes com Props | Dados fictícios por props e listas com map; evitar duplicação de informações | A fazer |
| 6 | Adicionar interatividade com eventos e useState | Seletores, valor, período e controles interativos; elevar estados compartilhados | A fazer |
| 7 | Investigar a API no Postman | Collection e documentação de moedas, taxa atual, histórico, parâmetros, erros e datas sem cotação, antes da integração React | A fazer |
| 8 | Criar funções de negócio e processamento | Conversão, períodos, filtros, ordenação e formatação fora do JSX; testar com dados conhecidos | A fazer |
| 9 | Integrar a API com fetch e async/await | Camada de serviço para moedas, taxa e histórico; substituir gradualmente dados fictícios por reais | A fazer |
| 10 | Controlar efeitos com useEffect | Consultar nas dependências corretas; loading e erro; evitar requisições desnecessárias | A fazer |
| 11 | Extrair lógica para Custom Hooks | Pelo menos um hook reutilizável para consulta ou processamento, respeitando as regras dos Hooks | A fazer |
| 12 | Implementar o histórico e o gráfico | Gráfico dinâmico nos oito períodos; transformar dados para a biblioteca; loading, erro e vazio | A fazer |
| 13 | Construir tabela, filtros e ordenação | Tabela sincronizada, filtros combinados, ordenação por data/cotação; map/filter/sort; contagem e limpeza | A fazer |
| 14 | Exportar os resultados filtrados em CSV | Download exatamente dos registros filtrados da tabela; impedir vazio e conferir arquivo | A fazer |
| 15 | Revisar testes, responsividade e estados | Validar desktop/mobile, erros, loading, vazio e entradas inválidas; registrar evidências e correções | A fazer |
| 16 | Preparar a entrega final | README, Figma, Postman, documentação e repositório público executável; revisar requisitos, remover mocks/logs temporários e verificar instalação por outra pessoa | A fazer |

## Checklist aplicado a cada cartão

- [ ] Revisar o conteúdo correspondente da aula.
- [ ] Aplicar o conceito no projeto.
- [ ] Testar o que foi desenvolvido.
- [ ] Fazer um commit representando a evolução.
- [ ] Atualizar a documentação quando necessário.

Após essas verificações, atualizar o cartão conforme o progresso real. Registrar junto à atividade o commit e as evidências. O acompanhamento do conteúdo de aula depende da informação do aluno; não presumir que ele já estudou os 16 tópicos.

## Regras de execução

- Seguir a ordem recebida e o avanço das aulas, sem datas intermediárias obrigatórias.
- O mapa de componentes descreve a arquitetura pretendida, mas a decomposição será aplicada na etapa 4; props na 5 e extração de hooks na 11.
- Dados fictícios são material de desenvolvimento nas etapas iniciais: identificá-los como demonstração e não apresentá-los como cotações reais nem como fallback em falhas da API.
- Investigar no Postman antes de integrar ao React. Consultas de terminal não concluem o cartão 7.
- Registrar alterações pequenas e commits semânticos reais; não fabricar histórico de aulas, datas ou testes.
- Fluxo Git sugerido: `main` estável, `dev` para integração e branches específicas quando necessário.
- A presença de um documento de planejamento não conclui a funcionalidade descrita nele.

## Próxima etapa

Consolidar o cartão 1, revisando regras pendentes e critérios de aceite; depois produzir os protótipos do cartão 2. Confirmar com o aluno até qual conteúdo a turma avançou para ajustar o ritmo das etapas seguintes.
