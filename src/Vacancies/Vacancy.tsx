import React, { useState } from 'react'
import { useLocalStorage } from '../hooks/UseLocalStorage'
import { Vacancy, VacancyProps } from '../MainScreen/MainScreen'

function Vacancy(props:VacancyProps) {
  const [favorites, setFavorites] = useLocalStorage('favorites',[])

  return (
    <div data-elem={`vacancy-${props.vacancy}`}>
        <h1 onClick={()=>{
      localStorage.setItem('vacancy',JSON.stringify(props.vacancy))
      window.location.href = 'https://boisterous-blancmange-1403c4.netlify.app/vacancy'
      }}>{props.vacancy.profession}</h1>
        {
          favorites.find((currentVacancy:Vacancy) => currentVacancy.id === props.vacancy.id) ?
          <button data-elem={`vacancy-${props.vacancy}-shortlist-button`} onClick={()=>{
            const newFavs = favorites.filter((fav:Vacancy)=>fav.id!==props.vacancy.id)
            setFavorites(newFavs)
          }}>⭐</button> :
          <button data-elem={`vacancy-${props.vacancy}-shortlist-button`} onClick={()=>{
            const newFavs = [...favorites, props.vacancy]
            setFavorites(newFavs)
          }}>⛥</button>
        }
        
        {
            props.vacancy.payment_from&&props.vacancy.payment_to ? <p>{`з/п ${props.vacancy.payment_from}-${props.vacancy.payment_to}`}</p> : <></>
        }
        {
            props.vacancy.payment_from&&!props.vacancy.payment_to ? <p>{`з/п ${props.vacancy.payment_from}`}</p> : <></>
        }
        <p>{props.vacancy.type_of_work.title}</p>
        <p>{props.vacancy.town.title}</p>
    </div>
  )
}

export default Vacancy