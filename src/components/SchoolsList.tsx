import React from 'react';
import { 
    Heading,
    VStack, 
    StackDivider,
    Text 
} from "@chakra-ui/react";
import "./design/SchoolsList.css";

const SchoolsList = ({schoolSearch, districtSearch}) => {
    return (
       <VStack>
       <Heading>{districtSearch}</Heading>
        <Text>Schools within District:</Text>
        <VStack
            divider={<StackDivider borderColor='gray.200' />}
            spacing={1}
            align='center'
        > 
        {schoolSearch.map((value) => {
                    return (
                        <div className="cardBox">
                     <b>{value.NAME}</b><br/>
                    Located at {value.STREET},
                     {value.CITY}, {value.STATE}, {value.ZIP}
                    </div>
                    );
                    })} 
        </VStack>
        </VStack>
)
}

export default SchoolsList