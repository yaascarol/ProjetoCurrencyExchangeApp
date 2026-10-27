export const API='https://api.frankfurter.dev/v2';
export async function request(path,signal) {
 const response=await fetch(API+path,{signal,headers:{Accept:'application/json'}});
 if(!response.ok)throw new Error(`Não foi possível consultar a Frankfurter (HTTP ${response.status}). Tente novamente.`);
 return response.json();
}
function validRate(r){return r&&/^\d{4}-\d{2}-\d{2}$/.test(r.date)&&typeof r.base==='string'&&typeof r.quote==='string'&&Number.isFinite(r.rate)&&r.rate>0;}
export async function getCurrencies(signal) {
 const data=await request('/currencies',signal);
 if(!Array.isArray(data)||!data.every(c=>typeof c.iso_code==='string'&&typeof c.name==='string'))throw new Error('A API retornou uma lista de moedas inválida.');
 return data.sort((a,b)=>a.iso_code.localeCompare(b.iso_code));
}
export async function getRate(base,quote,signal) {
 const data=await request(`/rate/${encodeURIComponent(base)}/${encodeURIComponent(quote)}`,signal);
 if(!validRate(data)||data.base!==base||data.quote!==quote)throw new Error('A API retornou uma cotação inválida.');
 return data;
}
export async function getHistory(base,quote,from,to,signal) {
 const params=new URLSearchParams({base,quotes:quote,from,to});
 const data=await request('/rates?'+params,signal);
 if(!Array.isArray(data)||!data.every(r=>validRate(r)&&r.base===base&&r.quote===quote))throw new Error('A API retornou um histórico inválido.');
 // Alguns endpoints retornam a observação anterior ao início: conservar só o intervalo pedido.
 return data.filter(r=>r.date>=from&&r.date<=to).sort((a,b)=>a.date.localeCompare(b.date));
}
