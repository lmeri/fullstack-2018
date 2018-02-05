import React from 'react'
import Osa from './Osa'

const Sisalto = ({ sisalto }) => {
  return (
    <div>
        {sisalto.map(osa => <Osa key={osa.id} nimi={osa.nimi} tehtavia={osa.tehtavia} />)}
    </div>
  )
}

export default Sisalto
