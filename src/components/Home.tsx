import React, { useState, useEffect } from "react"
import {
    Button,
    Center,
    Heading,
    Text,
    Icon,
    Input,
    ScaleFade,
    OrderedList,
    Divider,
    ListItem,
    Spinner,
    InputGroup, // Some Chakra components that might be usefull
    HStack,
    VStack,
    InputRightAddon,
} from "@chakra-ui/react"
import { Card } from '@components/design/Card'
import { searchSchoolDistricts, searchSchools, NCESDistrictFeatureAttributes, NCESSchoolFeatureAttributes } from "@utils/nces"
import Pagination from "./Pagination"


const Home: React.FC = () => {
    const [searching, setSearching] = React.useState(false)
    const [districtSearch, setDistrictSearch] = React.useState<NCESDistrictFeatureAttributes[]>([]);
    const [schoolSearch, setSchoolSearch] = React.useState<NCESSchoolFeatureAttributes[]>([]);
    const [query, setQuery] = useState("");
    const [schoolQuery, SetSchoolQuery] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);
    const [districtsPerPage, setDistrictsPerPage] = useState(10);
    const lastDistrictIndex = currentPage * districtsPerPage;
    const firstDistrictIndex = lastDistrictIndex - districtsPerPage;
    const currentDistricts = districtSearch.slice(firstDistrictIndex, lastDistrictIndex);
    
    const demo = async () => { // see console for api result examples
        setSearching(true)
        const demoDistrictSearch = await searchSchoolDistricts(query)
        setDistrictSearch(demoDistrictSearch)
        console.log("District example", demoDistrictSearch)

        const demoSchoolSearch = await searchSchools(schoolQuery, demoDistrictSearch[1].LEAID)
        setSchoolSearch(demoSchoolSearch)
        console.log("School Example", demoSchoolSearch)
        setSearching(false)
    }

    useEffect(() => {
        if(query !=="")
        demo()
    }, [query])
    
    return (
        <Center padding="100px" height="90vh">
            <ScaleFade initialScale={0.9} in={true}>
                <Card variant="rounded" borderColor="blue">
                    <Heading>School Data Finder</Heading>
                    <Text>
                        How would you utilize React.useEffect with the searchSchoolDistricts and searchSchools functions? <br />
                        Using <a href="https://chakra-ui.com/docs/principles" target="_blank">Chakra-UI</a> or your favorite UI toolkit, build an interface that allows the user to: <br />
                        <OrderedList>
                            <ListItem>Search for a district</ListItem>
                            <ListItem>Search for a school within the district (or bypass district filter)</ListItem>
                            <ListItem>View all returned data in an organized way</ListItem>
                        </OrderedList>
                    </Text>
                    <Divider margin={4} />
                    <Text>
                        Check the console for example of returned data. <b>Happy coding!</b>< br />
                        {searching ? <Spinner /> : <></>}< br />
                        {districtSearch.length} Districts Found<br />
                        {/* {schoolSearch.length} Demo Schools<br /> */}
                        <>Search: 
                        <input value={query} onChange={e => setQuery(e.target.value)} type="search" className="search_input" placeholder="Search..." />
                        <VStack>
                            {currentDistricts.map((value, index) => {
                            return (
                            <button
                            key={index}
                            onClick={() => console.log(value.LEAID)}
                            >{value.NAME}</button>
                            );
                            })} 
                            <Pagination 
                            totalDistricts={districtSearch.length} 
                            districtsPerPage={districtsPerPage} 
                            setCurrentPage={setCurrentPage} 
                            currentPage={currentPage} 
                            />
                        </VStack>
                        </>
                    </Text>
                </Card>
            </ScaleFade>
        </Center>
    );
};

export default Home