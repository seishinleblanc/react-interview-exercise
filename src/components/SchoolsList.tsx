import React from 'react'

const SchoolsList = ({schoolSearch}) => {
  return (
    <>
        {schoolSearch.map((value) => {
                    return (
                        <>
                    <h1>{value.NAME}</h1>
                    </>
                    );
                    })} 
                    </>
)
}

export default SchoolsList