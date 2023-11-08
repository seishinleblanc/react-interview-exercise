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
import SchoolsList from "./SchoolsList"


const Home: React.FC = () => {
    const [searching, setSearching] = React.useState(false)
    const [districtSearch, setDistrictSearch] = React.useState<NCESDistrictFeatureAttributes[]>([]);
    const [schoolSearch, setSchoolSearch] = React.useState<NCESSchoolFeatureAttributes[]>([]);
    const [schoolSearchBypass, setSchoolSearchBypass] = React.useState<NCESSchoolFeatureAttributes[]>([]);
    const [query, setQuery] = useState("");
    const [schoolQuery, SetSchoolQuery] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [districtChecked, setDistrictChecked] = useState(false);
    const [schoolChecked, setSchoolChecked] = useState(false);

    const [showSchools, setShowSchools] = useState(false);

    // The following are pagination related useStates and variables
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(10);

    const lastResultIndex = currentPage * resultsPerPage;
    const firstResultIndex = lastResultIndex - resultsPerPage;
    const currentDistricts = districtSearch.slice(firstResultIndex, lastResultIndex);
    const currentSchools = schoolSearchBypass.slice(firstResultIndex, lastResultIndex);
    const schoolsInDistrict = schoolSearch.slice(firstResultIndex, lastResultIndex);
    
    const demo = async () => { // see console for api result examples
        if (schoolChecked) {
            const schoolSearchBypassData = await searchSchools(query)
            setSchoolSearchBypass(schoolSearchBypassData)
            console.log("School Bypass Data:", schoolSearchBypassData)
        } else  {

            setSearching(true)
            const demoDistrictSearch = await searchSchoolDistricts(query)
            setDistrictSearch(demoDistrictSearch)
            console.log("District example", demoDistrictSearch)
            
            const demoSchoolSearch = await searchSchools(schoolQuery, demoDistrictSearch[0].LEAID)
            setSchoolSearch(demoSchoolSearch)
            console.log("School Example", demoSchoolSearch)
            setSearching(false)
        }
    }

    const handleOnClick = async (district) => {
        setQuery(district);
        setSearching(false);
        setShowSchools(true);
        setSelectedDistrict(district);
        

        // const clickedQuery = district
        // const demoDistrictSearch = await searchSchoolDistricts(clickedQuery)
        // setDistrictSearch(demoDistrictSearch)
        console.log("District example 2:", districtSearch);

        // const districtSchoolSearch = await searchSchools(schoolQuery, demoDistrictSearch[0].LEAID)
        // setSchoolSearch(districtSchoolSearch)
        console.log("Schools in District", schoolSearch.length)
        
    }
    
    const handleChangeDistrict = () => {
        setDistrictChecked(!districtChecked);
        setSchoolChecked(false);
    }

    const handleChangeSchool = async () => {
        setSchoolChecked(!schoolChecked);
        setSearching(false)
        setDistrictChecked(false);

    }

    const handleReturnToSearch = () => {
        setShowSchools(false);
    }

    useEffect(() => {
        if(query !=="" && (districtChecked || schoolChecked) )
        demo()
    }, [query, districtChecked, schoolChecked])
    
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
                        {/* {schoolSearch.length} Demo Schools<br /> */}
                        <>Search: 
                        <Input value={query} onChange={e => setQuery(e.target.value)} type="search" className="search_input" placeholder="Search..." />
                        <br />
                            <input 
                            type="checkbox"
                            checked={districtChecked}
                            onChange={handleChangeDistrict}
                             />Districts 
                              <input 
                            type="checkbox"
                            checked={schoolChecked}
                            onChange={handleChangeSchool}
                             />Schools <br />

                        {/* If we search by districts, we return the following: */}

                        {districtChecked && <VStack> 
                        {!showSchools && <>
                        <div>
                        <br /> {districtSearch.length} Districts Found <br />
                        </div>
                            {currentDistricts.map((value, index) => {
                            return (
                            <button
                            key={index}
                            onClick={(district) => handleOnClick(value.NAME)}
                            >{value.NAME}</button>
                            );
                            })} 
                            <Divider margin={4} />
                            <Pagination 
                            totalResults={districtSearch.length} 
                            resultsPerPage={resultsPerPage} 
                            setCurrentPage={setCurrentPage} 
                            currentPage={currentPage} 
                            /> </>}
                            
                            <div>
                            {showSchools && 
                            <SchoolsList
                            schoolSearch={schoolsInDistrict}
                            districtSearch={selectedDistrict} /> }
                            {showSchools && <Button
                            onClick={handleReturnToSearch}
                            >
                                Return to Search
                            </Button> }

                            {showSchools && <Pagination 
                            totalResults={schoolSearch.length} 
                            resultsPerPage={resultsPerPage} 
                            setCurrentPage={setCurrentPage} 
                            currentPage={currentPage} 
                            /> }
                            </div>
                        </VStack> } 

                        {/* If we search by schools, we return the following: */}

                        {schoolChecked && <VStack>
                            <div>
                           {schoolSearchBypass.length} Schools Found
                           </div>
                           {currentSchools.map((value) => {
                            return(
                                <div>
                                {value.NAME}
                                {/* <h2> 
                                {value.CITY}, {value.STATE}
                                </h2> */}
                                </div>
                                
                            );
                           })}
                           <Divider margin={4} />
                           <Pagination
                            totalResults={schoolSearchBypass.length} 
                            resultsPerPage={resultsPerPage} 
                            setCurrentPage={setCurrentPage} 
                            currentPage={currentPage} 
                           />
                        </VStack> }


                        </>
                    </Text>
                </Card>
            </ScaleFade>
        </Center>
    );
};

export default Home