import React from 'react';
import { 
    Heading,
    VStack, 
    StackDivider,
    Text 
} from "@chakra-ui/react";
import "./design/SchoolsList.css";


const SingleSchool = ({school}) => {
    return (
       <VStack>
       <Heading></Heading>
        <VStack
            divider={<StackDivider borderColor='gray.200' />}
            spacing={1}
            align='center'
        > 
        <div className="cardBox">
        <Heading>{school.NAME}</Heading><br/>
        Located at {school.STREET}, {school.CITY}, {school.STATE}, {school.ZIP}
         </div>
                    
        </VStack>
        </VStack>
)
}
export default SingleSchool