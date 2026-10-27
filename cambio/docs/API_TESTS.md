# Investigação Frankfurter v2

Executada em 27/10/2026 **via Newman, executor de Collections Postman**, antes da integração React. A interface gráfica do Postman não foi utilizada.

**7 requisições, 13 assertions, zero falhas.**

| Consulta (GET; base https://api.frankfurter.dev/v2) | Resultado |
| --- | --- |
| /currencies | 200; lista com iso_code, name e metadados |
| /rate/EUR/USD | 200; objeto date/base/quote/rate |
| /rates?from=2024-05-01&to=2024-05-31&base=EUR&quotes=USD | 200; série em lista |
| /rate/INVALID/USD | 422; invalid currency: INVALID |
| /rates?date=invalid&base=EUR&quotes=USD | 422; invalid date |
| /rate/EUR/USD?date=2024-05-05 | 200; date 2024-05-05 e rate 1.0739 |
| /rates?from=2024-05-04&to=2024-05-05&base=EUR&quotes=USD | 200; observações nos dois dias |

Objeto observado: {"date":"2026-10-27","base":"EUR","quote":"USD","rate":1.1186}.
A aplicação calcula valor × rate. base é origem; quotes limita destino; from/to delimitam intervalo.

## Datas sem publicação
Não presumir que todo fim de semana fica sem dados: v2 retornou observações nos dias testados. Disponibilidade varia por fonte/par. A aplicação conserva datas reais, não fabrica observações e filtra resultados fora do intervalo. Não foi identificado um caso real sem publicação nesta execução; lista vazia foi testada com resposta controlada no serviço.

## Reprodução e evidência
Importar [Collection JSON](postman/Frankfurter.postman_collection.json) no Postman e executar, ou usar `npm run test:api`. [results.json](postman/results.json) contém respostas, status e assertions reais.

Oito períodos USD/BRL também verificados no navegador: 7, 15, 30, 93, 184, 366, 1827 e 3653 registros, respectivamente, com término em 27/10/2026. As quantidades não são constantes universais.

Documentação oficial: https://frankfurter.dev/

