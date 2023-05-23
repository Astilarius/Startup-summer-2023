import React, { useState } from 'react'
import { KeyWordFormProps } from './MainScreen'
import './KeyWordForm.css'

function KeyWordForm(props:KeyWordFormProps) {

    const onKeywordChange = (e:React.ChangeEvent<HTMLInputElement>)=>{props.setKeyword(e.target.value)}
    const onSearchClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
      props.setPage(1)
      let newUrl = props.url;
      if(props.keyword){
        newUrl+=`keyword=${props.keyword}&`
      }
      if(props.searchInfo.salary.from){
        newUrl+=`payment_from=${props.searchInfo.salary.from}&`
      }
      if(props.searchInfo.salary.to){
        newUrl+=`payment_to=${props.searchInfo.salary.to}&`
      }
      if(props.searchInfo.industry){
        newUrl+=`catalogues=${props.searchInfo.industry}&`
      }
      props.setUrl(newUrl)
      
    }
  return (
    <div className='keyWordForm'>
        <input data-elem="search-input" onChange={onKeywordChange} value={props.keyword} id="keyword" placeholder='Введите название вакансии:'/>
        <button data-elem="search-button" onClick={onSearchClick}>Поиск</button>
    </div>
  )
}

export default KeyWordForm