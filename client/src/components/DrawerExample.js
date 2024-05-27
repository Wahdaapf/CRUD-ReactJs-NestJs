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
import { GlobalContext } from '../context/GlobalWrapper';
import { useContext, useEffect, useState } from 'react';
import InputsGroup from './InputsGroup';

export default function DrawerExample() {
  const { isOpen, onClose, errors, setErrors, Save, user, Update, filePreview, setFilePreview } = useContext(GlobalContext);
  const [form, setForm] = useState({});
  const [file, setFile] = useState(null);
  
  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onFileChangeHandler = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setFilePreview(URL.createObjectURL(file));
  };

  const onAdd = async () => {
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    if (file) {
      formData.append('file', file);
    }
    await Save(formData, setForm);
  };

  const onUpdate = async () => {
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    if (file) {
      formData.append('file', file);
    }
    await Update(formData, setForm, form._id);
  }

  useEffect(() => {
    setForm(user)
    if(user?.filename) {
      setFilePreview(`/images/users/${user.filename}`)
    }
  }, [user, setFilePreview])

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={() => {onClose(); setErrors({}); setForm({}); setFilePreview(null)}} />
          <DrawerHeader>Add / Edit User</DrawerHeader>

          <DrawerBody>
            <Stack spacing={'24px'}>
              <InputsGroup name="fullname" onChangeHandler={onChangeHandler} errors={errors?.fullname} value={form?.fullname} type="text" />
              <InputsGroup name="email" onChangeHandler={onChangeHandler} errors={errors?.email} value={form?.email} type="text" />
              <InputsGroup name="age" onChangeHandler={onChangeHandler} errors={errors?.age} value={form?.age} type="text" />
              <InputsGroup name="country" onChangeHandler={onChangeHandler} errors={errors?.country} value={form?.country} type="text" />
              {filePreview && <img src={filePreview} alt="Preview" style={{ marginTop: '10px', maxWidth: '100%' }} />}
              <InputsGroup name="file" onChangeHandler={onFileChangeHandler} errors={errors?.file} value={form?.file} type="file" />
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
