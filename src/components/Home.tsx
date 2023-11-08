import React, { useState, useEffect } from "react"
import {
    Button,
    Center,
    Heading,
    Text,
    Icon,
    Input,
    ScaleFade,
    Divider,
    Spinner,
    InputGroup, // Some Chakra components that might be usefull
    VStack,
    StackDivider,
    InputLeftElement,
    Menu,
    MenuButton,
    MenuList,
    MenuOptionGroup,
    MenuItemOption
} from "@chakra-ui/react"
import { BsSearchHeart } from "react-icons/bs"

import { Card } from '@components/design/Card'
import { searchSchoolDistricts, searchSchools, NCESDistrictFeatureAttributes, NCESSchoolFeatureAttributes } from "@utils/nces"
import Pagination from "./Pagination"
import SchoolsList from "./SchoolsList"
import SingleSchool from "./SingleSchool"
import "./design/SchoolsList.css";


const Home: React.FC = () => {
    const [searching, setSearching] = React.useState(false)
    const [districtSearch, setDistrictSearch] = React.useState<NCESDistrictFeatureAttributes[]>([]);
    const [schoolSearch, setSchoolSearch] = React.useState<NCESSchoolFeatureAttributes[]>([]);
    const [schoolSearchBypass, setSchoolSearchBypass] = React.useState<NCESSchoolFeatureAttributes[]>([]);
    const [query, setQuery] = useState("");
    const [schoolQuery, SetSchoolQuery] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [districtChecked, setDistrictChecked] = useState(true);
    const [schoolChecked, setSchoolChecked] = useState(false);

    const [showSchools, setShowSchools] = useState(false);
    const [singleSchool, setSingleSchool] = React.useState<NCESSchoolFeatureAttributes[]>([]);
    const [showSingleSchool, setShowSingleSchool] = useState(false);

    // The following are pagination related useStates and variables
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(5);
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

    // All button handlers located here

    const handleOnClick = async (district) => {
        setQuery(district);
        setSearching(false);
        setShowSchools(true);
        setSelectedDistrict(district);
        
        console.log("District example 2:", districtSearch);
        console.log("Schools in District", schoolSearch.length)
        
    }

    const handleSchoolOnClick = (school) => {
        setSingleSchool(school);
        setSearching(false);
        setShowSingleSchool(true);
        setSchoolChecked(false);
        
        
        console.log("District example 2:", districtSearch);
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
        setShowSingleSchool(false);
        setCurrentPage(1);
    }

    const handleReturnToSearchSchools = () => {
        setShowSchools(false);
        setShowSingleSchool(false);
        setCurrentPage(1);
        setSchoolChecked(true);
    }

    useEffect(() => {
        if(query !=="" && (districtChecked || schoolChecked) )
        demo();
        setCurrentPage(1);
    }, [query, districtChecked, schoolChecked])
    
    return (
        <Center padding="100px" height="90vh">
            <ScaleFade initialScale={0.9} in={true}>
                <Card variant="rounded" borderColor="#F45746">
                    <Heading>School Data Finder</Heading>
                    <Divider margin={4} />
                    <Text>
                        {searching ? <Spinner /> : <></>}< br />
                        <>

                        {/* Our search bar */}

                        {!showSchools && <InputGroup>
                        <InputLeftElement pointerEvents='none'>
                            <Icon as={BsSearchHeart} />
                        </InputLeftElement>
                        <Input value={query} onChange={e => setQuery(e.target.value)} type="search" className="search_input" placeholder="Search..." focusBorderColor="#F45746" />
                        <Menu>
                            <MenuButton as={Button} colorScheme='#F45746' margin="0px 5px">Filters
                            </MenuButton>
                            <MenuList>
                                <MenuOptionGroup defaultValue='dis' title='Filters' type='radio'>
                                <MenuItemOption onClick={handleChangeDistrict} value='dis'>Districts</MenuItemOption>
                                <MenuItemOption onClick={handleChangeSchool} value='sch'>Schools</MenuItemOption>
                                </MenuOptionGroup>
                            </MenuList>
                        </Menu>
                        </InputGroup> }
                        <br/>
                        
                        {/* If we search by districts, we return the following: */}

                        {(districtChecked && query!="") && <VStack> 
                        {!showSchools && <>
                        <Heading>
                        <br /> {districtSearch.length} Districts Found <br />
                        </Heading>
                        <Divider margin={4} />
                    
                        <VStack
                        divider={<StackDivider borderColor='gray.200' />}
                        spacing={1}
                        align='stretch'
                        > 
                            {currentDistricts.map((value, index) => {
                                return (
                                    <div className="cardBox">
                                    <button
                                    key={index}
                                    onClick={(district) => handleOnClick(value.NAME)}
                                    ><b>{value.NAME}</b><Text>Located in {value.LCITY}, {value.LSTATE}</Text>
                                    </button>
                                    </div>
                                );
                            })} 
                        </VStack>
                        
                        <Divider margin={4} />
                        <Pagination 
                            totalResults={districtSearch.length} 
                            resultsPerPage={resultsPerPage} 
                            setCurrentPage={setCurrentPage} 
                            currentPage={currentPage} 
                        /> </>}

                        {/* When we click on a specific district, it renders the schools within the district using this: */}
                            
                            <VStack>
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
                            </VStack>
                        </VStack> } 

                        {/* If we search by schools, we return the following: */}

                        {(schoolChecked && query!="") && <VStack>
                            <Heading>
                           {schoolSearchBypass.length} Schools Found
                           </Heading>
                            <Divider margin={4} />
                            
                            
                            <VStack
                            divider={<StackDivider borderColor='gray.200' />}
                            spacing={1}
                            align='center'
                            > 
                            {currentSchools.map((value, index) => {
                                    return(
                                        <div className="cardBox">
                                        <button
                                        key={index}
                                        onClick={(school) => handleSchoolOnClick(value)}
                                        >
                                        <b>{value.NAME}</b> <br/>
                                        Located at {value.STREET}, {value.CITY}, {value.STATE}, {value.ZIP}
                                        </button>
                                        </div>
                                        
                                    );
                                })}
                            </VStack>

                           <Divider margin={4} />
                           <Pagination
                            totalResults={schoolSearchBypass.length} 
                            resultsPerPage={resultsPerPage} 
                            setCurrentPage={setCurrentPage} 
                            currentPage={currentPage} 
                           /> 
                        </VStack> }

                        {/* To show a single school */}
                        <VStack>
                                {showSingleSchool && <SingleSchool 
                                school={singleSchool}
                                />}
                                {showSingleSchool && <Button
                                onClick={handleReturnToSearchSchools}
                                >
                                Return to Search
                                </Button> }
                        </VStack>

                        </>
                    </Text>
                </Card>
            </ScaleFade>
        </Center>
    );
};

export default Home