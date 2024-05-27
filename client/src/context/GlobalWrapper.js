import { createContext, useState } from 'react';
import axios from 'axios';
import { useDisclosure, useToast } from '@chakra-ui/react';

export const GlobalContext = createContext();

export default function Wrapper({ children }) {
  const [filePreview, setFilePreview] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [errors, setErrors] = useState({})
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const toast = useToast()

  const FetchUser = () => {
    axios
      .get('/api/users')
      .then(response => {
        setUsers(response.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const Search = (query) => {
    axios
      .post(`/api/users/search?key=${query}`)
      .then(response => {
        setUsers(response.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  const Delete = (id) => {
    axios
      .delete(`/api/users/${id}`)
      .then(response => {
        setUsers(users.filter(u => u._id !== id))
        toast({
          title: 'Account Deleted',
          status: 'success',
          duration: 4000,
          isClosable: true
        })
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  const Save = (form, setForm) => {
    axios
      .post(`/api/users`, form)
      .then(response => {
        toast({
          title: 'User Created',
          status: 'success',
          duration: 4000,
          isClosable: true
        })
        setErrors({})
        onClose()
        setUsers([...users, response.data])
        setForm({})
        setFilePreview(null)
      })
      .catch(error => {
        setErrors(error.response.data.error)
      });
  }

  const FindOne = async (id) => {
    await axios
      .get(`/api/users/${id}`)
      .then(response => {
        setUser(response.data)
      })
      .catch(error => {
        setErrors(error.response.data.error)
      });
  }

  const Update = (form, setForm, id) => {
    axios
      .put(`/api/users/${id}`, form)
      .then(response => {
        toast({
          title: 'User Updated',
          status: 'success',
          duration: 4000,
          isClosable: true
        })
        setErrors({})
        onClose()
        FetchUser()
        setForm({})
        setFilePreview(null)
      })
      .catch(error => {
        setErrors(error.response.data.error)
      });
  }
  return (
    <GlobalContext.Provider value={{ FetchUser, Search, Save, Delete, users, isOpen, onOpen, onClose, errors, setErrors, FindOne, user, setUser, Update, filePreview, setFilePreview }}>
      {children}
    </GlobalContext.Provider>
  );
}
