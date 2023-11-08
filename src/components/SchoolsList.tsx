import React from 'react'

const SchoolsList = ({schoolSearch, districtSearch}) => {
    return (
       <> <h1>District: {districtSearch}</h1>
        <h1>Schools within District:</h1>
        {schoolSearch.map((value) => {
                    return (
                        <>
                    <h3>{value.NAME}</h3>
                    </>
                    );
                    })} 
                    </>
)
}

export default SchoolsList