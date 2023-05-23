import React from 'react'
import { SearchFormProps } from './MainScreen'



function SearchForm(props:SearchFormProps) {
  const industriesOptions = props.industries.map(industry=><option key={industry.key} value={industry.title_rus}/>)

  const onIndustryChange = (e:React.ChangeEvent<HTMLInputElement>)=>{props.setIndustry(e.target.value)}
  const onSalaryFromChange = (e:React.ChangeEvent<HTMLInputElement>)=>{props.setSalaryFrom(e.target.value)}
  const onSalaryToChange = (e:React.ChangeEvent<HTMLInputElement>)=>{props.setSalaryTo(e.target.value)}

  const onClearFiltersClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    props.setIndustry('')
    props.setSalaryFrom('')
    props.setSalaryTo('')
    props.setKeyword('')
  }
  
  return (
    <div>
        <form>
            <h1>Фильтры</h1>
            <label htmlFor="clear">Сбросить все</label>
            <button onClick={onClearFiltersClick} id='clear' className='clear' type='button'>x</button>
            <label htmlFor="industry">Отрасль:</label>
            <input onChange={onIndustryChange} value={props.industry} list="industry-options" placeholder='Выберите отрасль' id="industry" name="industry"></input>
            <datalist id='industry-options' className='industry-options'>
                {industriesOptions}
            </datalist>
            <label htmlFor="salary">Оклад:</label>
            <input onChange={onSalaryFromChange} value={props.salaryFrom} id="salary-from" placeholder='От' name="salary-from" type='number'/>
            <input onChange={onSalaryToChange} value={props.salaryTo} id="salary-to" placeholder='До' name="salary-to" type='number'/>
            <button type='submit'>Применить</button>
        </form>
    </div>
  )
}

export default SearchForm


  // fetch('https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/?count=100',{
  //     headers: {
  //         'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
  //         'X-Api-App-Id':'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
  //         },
  // }).then(r=>r.json())
  // .then(r=>console.log(r))  