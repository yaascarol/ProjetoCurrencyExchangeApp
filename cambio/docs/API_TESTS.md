# Investigação e testes da API no Postman

Status: pendente. Nenhum teste foi executado no Postman. Consultas exploratórias anteriores pelo terminal e leitura da documentação não substituem esta etapa.

O roteiro inicial e os endpoints Frankfurter v2 estão em [REQUIREMENTS.md](REQUIREMENTS.md). Executar a investigação antes de integrar a API ao React.

## Casos previstos

| Caso | Objetivo | Status |
| --- | --- | --- |
| Moedas disponíveis | Identificar estrutura da lista e códigos | Não executado |
| Cotação EUR/USD | Conferir taxa e data efetiva | Não executado |
| Histórico de maio/2024 | Conferir parâmetros e série retornada | Não executado |
| Datas sem publicação | Comparar consulta pontual, intervalo e dias próximos | Não executado |
| Parâmetros inválidos | Registrar status HTTP e corpo de erro | Não executado |
| Oito períodos do produto | Verificar cobertura e comportamento de séries longas | Não executado |

Para cada execução registrar: data, método, URL/parâmetros, resultado esperado, status HTTP observado, amostra do JSON, interpretação, evidência e conclusão.

## Collection

Pendente: exportar a Collection do Postman em JSON para `docs/postman/`, conferir a importação e vincular aqui o arquivo real. Não registrar respostas presumidas como resultados observados.
