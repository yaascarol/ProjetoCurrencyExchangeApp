import {useState} from 'react';
import {ArrowUpRight,Globe2,ArrowRight} from 'lucide-react';
import Converter from './components/Converter.jsx';
import History from './components/History.jsx';
import HistoryData from './components/HistoryData.jsx';
import QueryState from './components/QueryState.jsx';
import useFrankfurter from './hooks/useFrankfurter.js';
import {periodRange} from './utils/data.js';
import s from './App.module.css';
export default function App(){
 const [pair,setPair]=useState({base:'USD',quote:'BRL'}),[period,setPeriod]=useState('30d');
 const range=periodRange(period),different=pair.base!==pair.quote;
 const currencies=useFrankfurter('currencies');
 const rate=useFrankfurter('rate',[pair.base,pair.quote],different);
 const history=useFrankfurter('history',[pair.base,pair.quote,range.from,range.to],different);
 return <><a className={s.skip} href="#main">Pular para conteúdo</a><header className={s.header}><a className={s.brand} href="#main" aria-label="Hermes início"><span><ArrowUpRight size={25}/></span>HERMES<span className={s.brandDivider}/><small>CURRENCY EXCHANGE</small></a><span className={s.headerNote}><Globe2 size={14}/> Uma perspectiva global.</span></header>
 <main id="main" className={s.main}><div className={s.intro}><div><p className={s.eyebrow}>MOEDAS SEM FRONTEIRAS</p><h1>Clareza para cada conversão<span>.</span></h1><p className={s.description}>Converta valores, acompanhe tendências e explore o mundo em outras moedas.</p></div><div className={s.source}><span className={s.liveDot}/> Dados da Frankfurter <ArrowRight size={13}/></div></div>
 {currencies.status!=='success'&&<div className={s.globalState}><QueryState status={currencies.status} message={currencies.error||undefined} onRetry={currencies.retry} compact/></div>}
 <div className={s.sections}><Converter pair={pair} onPairChange={setPair} currencies={currencies.data||[]} query={rate}/>{different?<><History pair={pair} period={period} onPeriodChange={setPeriod} query={history}/><HistoryData key={`${pair.base}-${pair.quote}-${period}`} query={history}/></>:<section className={s.same}>Escolha moedas diferentes para consultar o histórico.</section>}</div>
 <aside className={s.info}><Globe2 size={18}/><div><strong>Informação que aproxima você do mundo.</strong><p>As taxas são atualizadas diariamente pelas fontes oficiais reunidas pela Frankfurter. A data exibida é a da cotação, não a do acesso.</p></div></aside></main>
 <footer className={s.footer}><span>HERMES <small>© {new Date().getFullYear()}</small></span><p>Projeto educacional · React & Frankfurter</p><a href="https://frankfurter.dev/" target="_blank" rel="noreferrer">Sobre os dados <ArrowUpRight size={13}/></a></footer></>;
}
