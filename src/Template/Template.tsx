import React from 'react'
import './Template.css'
import unionImage from './../assets/Union.png' 

function Template({children}:any) {
  return (
    <div>
        <div className='header row evenly center'>
            <div className='row title center gap10'>
                <img className='logo' src={unionImage} />
                <p>Jobored</p>
            </div>
            <div className='row buttons gap10'>
                <a href='https://boisterous-blancmange-1403c4.netlify.app'>Поиск вакансий</a>
                <a href='https://boisterous-blancmange-1403c4.netlify.app/favourite'>Избранное</a>
            </div>
        </div>
        {children}
    </div>
  )
}

export default Template