import React, {useState} from 'react';
import { 
    Heading,
    VStack, 
    StackDivider,
    Text 
} from "@chakra-ui/react";
import "./design/SchoolsList.css";
import SingleSchool from "./SingleSchool"



const SchoolsList = ({schoolSearch, districtSearch}) => {
    const [showAllSchools, setShowAllSchools] = useState(true);
    const [showSingleSchool, setShowSingleSchool] = useState(false);
    const [school, setSchool] = useState("");

    const handleSchoolOnClick = (schoolName) => {
        setSchool(schoolName);
        setShowSingleSchool(true);
        setShowAllSchools(false)
    }
    
    return (
        <>
        {/* Render for all school within a district */}
       {showAllSchools && <VStack>
       <Heading>{districtSearch}</Heading>
        <Text>Schools within District:</Text>
        <VStack
            divider={<StackDivider borderColor='gray.200' />}
            spacing={1}
            align='center'
        > 
        {schoolSearch.map((value, index) => {
                    return (
                    <div className="cardBox">
                    <button
                        key={index}
                        onClick={(schoolName) => handleSchoolOnClick(value)}
                        >
                     <b>{value.NAME}</b><br/>
                    Located at {value.STREET}, {value.CITY}, {value.STATE}, {value.ZIP}
                    </button>
                    </div>
                    );
                    })} 
        </VStack>
        </VStack>}

        {/* Render for a single school */}
        {showSingleSchool && <SingleSchool
        school={school} 
        />}
        </>
        
)
}

export default SchoolsList