import React from 'react'
import './Template.css'

function Template({children}:any) {
  return (
    <div>
        <div className='header'>
            <div className='title'>
                <div className='logo'>
                    <div className='ellipse1'></div>
                    <div className='ellipse2'></div>
                    <p>Jobored</p>
                </div>
            </div>
            <div className='headerButtons'>
                <a href='http://127.0.0.1:5173/favourite'>Избранное</a>
                <a href='http://127.0.0.1:5173/'>Поиск вакансий</a>
            </div>
        </div>
        {children}
    </div>
  )
}

export default Template