import {
  Box,
  Button,
  Container,
  FormControl,
  Input,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import Row from './components/Row';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from './context/GlobalWrapper';
import DrawerExample from './components/DrawerExample';

function App() {
  const { FetchUser, Search, users, onOpen } = useContext(GlobalContext);
  const [ query, setQuery ] = useState('');

  useEffect(() => {
    FetchUser();
  }, [FetchUser]);

  const SearchHandler = () => {
    Search(query);
  };

  const onChangeHandler = (e) =>{
    setQuery(e.target.value)
  }

  return (
    <div className="App">
      <Container maxW={'full'} p="4" fontSize={'18px'}>
        <Box rounded="lg" boxShadow="base" p="4">
          <Box mt="2" gap="2" mb="4" display="flex">
            <FormControl>
              <Input type="text" onChange={onChangeHandler} />
            </FormControl>
            <Button
              leftIcon={<AiOutlineSearch />}
              colorScheme="teal"
              variant="outline"
              maxW="300px"
              minW="150px"
              onClick={() => SearchHandler()}
            >
              Search
            </Button>
          </Box>
        </Box>
        <Box mt="5" rounded="lg" boxShadow="base">
          <Box p="4" display="flex" justifyContent="space-between">
            <Text fontSize="xl" fontWeight="bold">
              List Users
            </Text>
            <Button
              colorScheme="teal"
              variant="outline"
              maxW="300px"
              minW="150px"
              leftIcon={<AiOutlinePlus fontSize="20px" />}
              onClick={onOpen}
            >
              Add User
            </Button>
          </Box>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Avatar</Th>
                  <Th>Fullname</Th>
                  <Th>Email</Th>
                  <Th>Age</Th>
                  <Th>Country</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users?.map(({ _id, fullname, email, age, country, filename }) => {
                  return (
                    <Row
                      id={_id}
                      fullname={fullname}
                      email={email}
                      age={age}
                      country={country}
                      filename={filename}
                    />
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <DrawerExample />
      </Container>
    </div>
  );
}

export default App;
