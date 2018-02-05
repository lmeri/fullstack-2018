import React from 'react'
import Otsikko from './Otsikko'
import Sisalto from './Sisalto'
import Yhteensa from './Yhteensa'


const Kurssi = ({ kurssi }) => {
  return (
    <div>
        <Otsikko otsikko={kurssi.nimi}/>
        <Sisalto sisalto={kurssi.osat}/>
        <Yhteensa tehtavia={kurssi.osat}/>
    </div>
  )
}

export default Kurssi