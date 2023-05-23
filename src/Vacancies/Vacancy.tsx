import React, { useState } from 'react'
import { useLocalStorage } from '../hooks/UseLocalStorage'
import { Vacancy, VacancyProps } from '../MainScreen/MainScreen'

function Vacancy(props:VacancyProps) {
  const [favorites, setFavorites] = useLocalStorage('favorites',[])

  return (
    <div>
        <h1 onClick={()=>{
      localStorage.setItem('vacancy',JSON.stringify(props.vacancy))
      window.location.href = 'http://127.0.0.1:5173/vacancy'
      }}>{props.vacancy.profession}</h1>
        {
          favorites.find((currentVacancy:Vacancy) => currentVacancy.id === props.vacancy.id) ?
          <button onClick={()=>{
            const newFavs = favorites.filter((fav:Vacancy)=>fav.id!==props.vacancy.id)
            setFavorites(newFavs)
          }}>⭐</button> :
          <button onClick={()=>{
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