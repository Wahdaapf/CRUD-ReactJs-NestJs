import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Stack,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalWrapper';
import InputsGroup from './InputsGroup';

export default function DrawerExample() {
  const { isOpen, onOpen, onClose, errors, setErrors, Save, user, Update } = useContext(GlobalContext);
  const [form, setForm] = useState({});
  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onAdd = () => {
    Save(form, setForm);
  };

  const onUpdate = () => {
    Update(form, setForm, form._id)
  }

  useEffect(() => {
    setForm(user)
  }, [user])

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={() => {onClose(); setErrors({}); setForm({});}} />
          <DrawerHeader>Add / Edit User</DrawerHeader>

          <DrawerBody>
            <Stack spacing={'24px'}>
              <InputsGroup name="fullname" onChangeHandler={onChangeHandler} errors={errors?.fullname} value={form?.fullname} />
              <InputsGroup name="email" onChangeHandler={onChangeHandler} errors={errors?.email} value={form?.email} />
              <InputsGroup name="age" onChangeHandler={onChangeHandler} errors={errors?.age} value={form?.age} />
              <InputsGroup name="country" onChangeHandler={onChangeHandler} errors={errors?.country} value={form?.country} />
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={() => form._id ? onUpdate() : onAdd()}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
