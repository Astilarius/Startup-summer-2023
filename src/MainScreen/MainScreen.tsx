import React, { useEffect, useState } from "react"
import { useLocalStorage } from "../hooks/UseLocalStorage";
import { MainScreenProps } from "../main";
import VacancyComponent from "../Vacancies/Vacancy";
import KeyWordForm from "./KeyWordForm"
import SearchForm from "./SearchForm"
import './MainScreen.css'

export interface SearchInfo{
  keyword:string,
  industry:number | undefined,
  salary:{
    from:number, to:number
  },
}
interface Catalogue{
  key:number,
  positions:[],
  title:string,
  title_rus:string,
  title_trimmed:string,
  url_rus:string,
}
export interface SearchFormProps{
  setKeyword:React.Dispatch<React.SetStateAction<string>>,
  industries:Catalogue[],
  industry:string,
  setIndustry:React.Dispatch<React.SetStateAction<string>>,
  salaryFrom:string,
  setSalaryFrom:React.Dispatch<React.SetStateAction<string>>,
  salaryTo:string,
  setSalaryTo:React.Dispatch<React.SetStateAction<string>>,
  setPage:React.Dispatch<React.SetStateAction<number>>,
  url:string,
  searchInfo:SearchInfo,
  keyword:string,
  setUrl:React.Dispatch<React.SetStateAction<string>>,
}
export interface KeyWordFormProps{
  keyword:string,
  setKeyword:React.Dispatch<React.SetStateAction<string>>,
  setPage:React.Dispatch<React.SetStateAction<number>>,
  url:string,
  setUrl:React.Dispatch<React.SetStateAction<string>>,
  searchInfo:SearchInfo,
  setVacancies:React.Dispatch<React.SetStateAction<Vacancy[]>>,
}
export interface Vacancy {
  id : number,
  payment_from:number ,
  payment_to:number ,
  profession : string,
  town : {
    id: number;
    title: string;
    declension: string;
    hasMetro: boolean;
    genitive: string;
  },
  type_of_work : {
    id: number;
    title: string;
  },
  vacancyRichText : string,
}
export interface VacancyProps{
  vacancy:Vacancy,
  favourites:Vacancy[],
  setFavorites:Function,
}

function MainScreen(props:MainScreenProps){
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState(page)
  const [vacancies, setVacancies] = useState<Vacancy[]>([])
  const [favorites, setFavorites] = useLocalStorage('favorites',[])
  console.log(favorites)
  const [url, setUrl] = useState<string>(`https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/?count=4&published=1&`)
  useEffect(()=>{
    if(props.isFavourite){
      setVacancies(favorites.slice(4*(page-1),4*page))
      setTotalPages(Math.max(favorites.length/4))
      console.log(totalPages)
    } else {
      fetch(url+new URLSearchParams({page:String(page)}),{
        headers: {
            'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
            'X-Api-App-Id':'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
        },
      }).then(r=>r.json())
        .then(r=>{
          setTotalPages(Math.floor(r.total/4)>125 ? 125 : Math.floor(r.total/4))
          setVacancies(r.objects)
        })
    }
  },[url, page, favorites])
  
  const [industries, setIndustries] = useState<Catalogue[]>([])
  useEffect(()=>{
    fetch('https://startup-summer-2023-proxy.onrender.com/2.0/catalogues/',{
        headers: {
            'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
            'X-Api-App-Id':'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
        },
    }).then(r=>r.json())
    .then(r=>{
      setIndustries(r!)
    })
  },[])  

  const [industry, setIndustry] = useState<string>('')
  const [salaryFrom, setSalaryFrom] = useState<string>('')
  const [salaryTo, setSalaryTo] = useState<string>('')

  const searchInfo:SearchInfo = {
    keyword:'',
    industry:industries.find(currIndustry=>currIndustry.title_rus===industry)?.key,
    salary:{from:Number(salaryFrom),to:Number(salaryTo)}
  }
  const [keyword, setKeyword] = useState('')
  const searchFormProps:SearchFormProps = {
    keyword:keyword,
    setUrl:setUrl,
    url:url,
    searchInfo:searchInfo,
    setKeyword:setKeyword,
    industries:industries,
    industry:industry,
    setIndustry:setIndustry,
    salaryFrom:salaryFrom,
    setSalaryFrom:setSalaryFrom,
    salaryTo:salaryTo,
    setSalaryTo:setSalaryTo,
    setPage:setPage,
  }
  const keyWordFormProps:KeyWordFormProps = {
    keyword:keyword,
    setKeyword:setKeyword,
    setPage:setPage,
    url:url,
    setUrl:setUrl,
    searchInfo:searchInfo,
    setVacancies:setVacancies,
  }
  const vacanciesObject = vacancies.map(vacancy=>{
    const vacancyProps:VacancyProps = {
      vacancy:vacancy,
      favourites:favorites,
      setFavorites:setFavorites,
    }
    return <VacancyComponent key={vacancy.id} {...vacancyProps}/>
  })
  const pageButtons = []
  if(page>2){
    const newButton = <button key={'<'} className="pagebutton" onClick={()=>{setPage(1)}}>{'<'}</button>
    pageButtons.push(newButton)
  }
  for(let i = 0; i < 3; i++){
    if(page+i-2 > totalPages) continue;
    if(page===1&&i===0) continue;
    if(page===totalPages&&i===2) continue;
    if(page===page-1+i){
      const newButton = <button key={page-1+i} className="pagebutton pressed">{page-1+i}</button>
      pageButtons.push(newButton)
    } else {
      const newButton = <button key={page-1+i} className="pagebutton" onClick={()=>{setPage(page-1+i)}}>{page-1+i}</button>
      pageButtons.push(newButton)
    }
  }
  if(page<totalPages-1){
    const newButton = <button  key={'>'} className="pagebutton" onClick={()=>{setPage(totalPages)}}>{'>'}</button>
    pageButtons.push(newButton)
  }
  return (
    <>
      <div className="row evenly gap10">
        { !props.isFavourite ? <SearchForm {...searchFormProps}/> : <></>
        }
        <div className="column evenly gap10 flex2">
          {
            !props.isFavourite ? <KeyWordForm {...keyWordFormProps}/> : <></>
          }
          {vacanciesObject}
        </div>
      </div>
      <div className="row centerJustify gap10">
        {pageButtons}
      </div>
    </>
  )
}

export default MainScreen
