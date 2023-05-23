import React, { useState } from 'react'
import { useLocalStorage } from '../hooks/UseLocalStorage'
import { Vacancy, VacancyProps } from '../MainScreen/MainScreen'
import './Vacancy.css'
import cityIcon from './../assets/CityIcon.png'
import starIcon1 from './../assets/Star 1.png'
import starIcon2 from './../assets/Star 2.png'

function VacancyComponent(props:VacancyProps) {
  const [favorites, setFavorites] = useLocalStorage('favorites',[])

  return (
    <div className='vacancy' data-elem={`vacancy-${props.vacancy}`}>
      <div className='row between'>
        <h1 onClick={()=>{
            localStorage.setItem('vacancy',JSON.stringify(props.vacancy))
            window.location.href = 'https://boisterous-blancmange-1403c4.netlify.app/vacancy'
          }}>{props.vacancy.profession}</h1>
        {
          favorites.find((currentVacancy:Vacancy) => currentVacancy.id === props.vacancy.id) ?
          <button className='starButton' data-elem={`vacancy-${props.vacancy}-shortlist-button`} onClick={()=>{
            const newFavs = favorites.filter((fav:Vacancy)=>fav.id!==props.vacancy.id)
            setFavorites(newFavs)
          }}>
            <img src={starIcon1} alt="" />
          </button> :
          <button className='starButton' data-elem={`vacancy-${props.vacancy}-shortlist-button`} onClick={()=>{
            const newFavs = [...favorites, props.vacancy]
            setFavorites(newFavs)
          }}>
            <img src={starIcon2} alt="" />
          </button>
        }
      </div>
        
        {
            props.vacancy.payment_from&&props.vacancy.payment_to ? <p>{`з/п ${props.vacancy.payment_from}-${props.vacancy.payment_to}`}</p> : <></>
        }
        {
            props.vacancy.payment_from&&!props.vacancy.payment_to ? <p>{`з/п ${props.vacancy.payment_from}`}</p> : <></>
        }
        <p>{props.vacancy.type_of_work.title}</p>
        <div className='row'>
          <img className='cityIcon' src={cityIcon} alt="city icon" />
          <span className='cityName'>{props.vacancy.town.title}</span>
        </div>
    </div>
  )
}

export default VacancyComponent