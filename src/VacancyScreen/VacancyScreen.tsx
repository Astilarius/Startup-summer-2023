import React, { useEffect, useState } from 'react'
import { useLocalStorage } from '../hooks/UseLocalStorage'
import { Vacancy } from '../MainScreen/MainScreen'

function VacancyScreen() {
    const [vacancy, setVacancy] = useLocalStorage('vacancy',{})
    const [favorites, setFavorites] = useLocalStorage('favorites',[])
    console.log(vacancy)
    console.log(favorites)
  return (
    <div>
        {
        vacancy!==undefined ? 
        <div>
            <h1>{vacancy?.profession}</h1>
            {
            favorites.find((currentVacancy:Vacancy) => currentVacancy.id === vacancy.id) ?
            <button onClick={()=>{
                const newFavs = favorites.filter((fav:Vacancy)=>fav.id!==vacancy.id)
                setFavorites(newFavs)
            }}>⭐</button> :
            <button onClick={()=>{
                const newFavs = [...favorites, vacancy]
                setFavorites(newFavs)
            }}>⛥</button>
            }
            {
                vacancy?.payment_from ? 
                <p>от {vacancy?.payment_from}</p> :
                <></>
            }
            {
                vacancy?.payment_to ? 
                <p>до {vacancy?.payment_to}</p> :
                <></>
            }
            <p>{vacancy?.type_of_work.title}</p>
            <p>{vacancy?.town.title}</p>
            <p dangerouslySetInnerHTML={{ __html: vacancy.vacancyRichText }} ></p>
        </div> : 
        <></>
        }

    </div>
  )
}

export default VacancyScreen