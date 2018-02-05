import React from 'react'

const Yhteensa = ({ tehtavia }) => {
    const tehtSumma = tehtavia.reduce((summa, obj) => summa + obj.tehtavia, 0);
    return (
        <div>
            <p>yhteensä {tehtSumma} tehtävää</p>
        </div>
    )
}

export default Yhteensa
