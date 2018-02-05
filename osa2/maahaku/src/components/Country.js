import React from 'react'

const Country = ({ country }) => {
  return (
    <div>
        <h2>{country.name}</h2>
        <img src={country.flag} width="400" />
        <p>population: {country.population}</p>
        <p>capital: {country.capital}</p>
    </div>
  )
}

export default Country