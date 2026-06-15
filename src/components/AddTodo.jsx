import React from 'react';
import { useDispatch } from 'react-redux';
import { addTodoAsync } from '../store/slices/todoSlice';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Box,
  Paper,
  Typography
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

const validationSchema = Yup.object({
  text: Yup.string()
    .trim()
    .required('Введите задачу')
    .max(10, 'Задача не должна превышать 10 символов'),
});

const AddTodo = () => {
  const dispatch = useDispatch();

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <Formik
        initialValues={{ text: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          dispatch(addTodoAsync(values.text.trim()));
          resetForm();
        }}
      >
        {({ values, errors, touched, handleChange, isValid, dirty }) => (
          <Form>
            <Box display="flex" gap={1} alignItems="flex-start">
              <Box flex={1}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Добавить новую задачу..."
                  name="text"
                  value={values.text}
                  onChange={handleChange}
                  error={touched.text && Boolean(errors.text)}
                  size="small"
                />
                <ErrorMessage name="text">
                  {(msg) => (
                    <Typography
                      variant="caption"
                      color="error"
                      sx={{ display: 'block', mt: 0.5 }}
                    >
                      {msg}
                    </Typography>
                  )}
                </ErrorMessage>
              </Box>
              <Button
                type="submit"
                variant="contained"
                startIcon={<AddIcon />}
               // disabled={!dirty || !isValid}
              >
                Добавить
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default AddTodo;