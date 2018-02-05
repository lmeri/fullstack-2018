import React from 'react'
import Country from './Country';

const Countries = ({ countries, filter, click}) => {
    let list = countries.filter((country) => {
        return country.name.toLowerCase().includes(filter.toLowerCase());
    });

    if (list.length === 1 ) {
        return (
            <div>
                <Country country={list[0]}/>
            </div>
        )
    } else if (list.length === 0 ) {
        return (
            <div>
                <p>no countries match the search</p>
            </div>
        )
    } else if (list.length <= 10 ) {
        return (
            <div>
                {list.map(country => <p key={country.name} onClick={click(country.name)}>{country.name}</p>)}
            </div>
        )
    } else {
        return (
            <div>
                <p>too many matches, please specify another filter</p>
            </div>
        )
    }    
}

export default Countries