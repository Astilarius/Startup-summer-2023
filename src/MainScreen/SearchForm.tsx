import React from 'react'
import { SearchFormProps } from './MainScreen'
import './SearchForm.css'



function SearchForm(props:SearchFormProps) {
  const industriesOptions = props.industries.map(industry=><option key={industry.key} value={industry.title_rus}/>)

  const onIndustryChange = (e:React.ChangeEvent<HTMLInputElement>)=>{props.setIndustry(e.target.value)}
  const onSalaryFromChange = (e:React.ChangeEvent<HTMLInputElement>)=>{props.setSalaryFrom(e.target.value)}
  const onSalaryToChange = (e:React.ChangeEvent<HTMLInputElement>)=>{props.setSalaryTo(e.target.value)}

  const onClearFiltersClick = (e:React.MouseEvent<HTMLParagraphElement, MouseEvent>)=>{
    props.setIndustry('')
    props.setSalaryFrom('')
    props.setSalaryTo('')
    props.setKeyword('')
  }

  const onSearchClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    e.preventDefault()
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
    <form className='searchForm column evenly gap10'>
        <div className='row between'>
          <p>Фильтры</p>
          <p className='clearFiltersButton' onClick={onClearFiltersClick}>Сбросить все x</p>
        </div>
        <label htmlFor="industry">Отрасль:</label>
        <input data-elem="industry-select" onChange={onIndustryChange} value={props.industry} list="industry-options" placeholder='Выберите отрасль' id="industry" name="industry"></input>
        <datalist id='industry-options' className='industry-options'>
            {industriesOptions}
        </datalist>
        <label htmlFor="salary">Оклад:</label>
        <input data-elem="salary-from-input" onChange={onSalaryFromChange} value={props.salaryFrom} id="salary-from" placeholder='От' name="salary-from" type='number'/>
        <input data-elem="salary-to-input" onChange={onSalaryToChange} value={props.salaryTo} id="salary-to" placeholder='До' name="salary-to" type='number'/>
        <button type='button' data-elem="search-button" onClick={onSearchClick}>Применить</button>
    </form>
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