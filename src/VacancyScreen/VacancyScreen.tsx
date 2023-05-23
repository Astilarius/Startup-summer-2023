import React, { useEffect, useState } from 'react'
import { useLocalStorage } from '../hooks/UseLocalStorage'
import { Vacancy, VacancyProps } from '../MainScreen/MainScreen'
import VacancyComponent from '../Vacancies/Vacancy'
import './VacancyScreen.css'

function VacancyScreen() {
    const [vacancy, setVacancy] = useLocalStorage('vacancy',{})
    const [favorites, setFavorites] = useLocalStorage('favorites',[])
    console.log(vacancy)
    console.log(favorites)
    const vacancyProps:VacancyProps = {
      vacancy:vacancy,
      favourites:favorites,
      setFavorites:setFavorites,
    }
  return (
    <div>
        {
        vacancy!==undefined ? 
        <div>
            <div className='margin20'><VacancyComponent {...vacancyProps} /></div>
            <div className='secondCard margin20' dangerouslySetInnerHTML={{ __html: vacancy.vacancyRichText }} ></div>
        </div> : 
        <></>
        }

    </div>
  )
}

export default VacancyScreen