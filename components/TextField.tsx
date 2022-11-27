import { styled } from '@mui/material/styles';
import MuiTextField from '@mui/material/TextField';

export const TextField = styled((props: any) => (
  <MuiTextField
    inputRef={props.ref}
    InputProps={{ disableUnderline: true, endAdornment: props.endAdornment } as Partial<any>}
    {...props}
  />
))(({ theme }) => ({
  '& label': {
    color: '#DADADA',
    fontSize: 18,
  },
  '& label.Mui-focused': {
    color: '#56636D',
    // fontSize: 10,
  },
  '& label.Mui-error': {
    color: '#EC3360',
    // fontSize: 10,
  },
  '& .MuiFormHelperText-root': {
    marginLeft: 0,
  },
  '& .MuiFormLabel-filled': {
    color: '#56636D',
  },
  '& .MuiFilledInput-root': {
    height: 60,
    border: '1px #56636D solid',
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: 'white',
    // transition: theme.transitions.create([
    //   'border-color',
    //   'background-color',
    //   'box-shadow',
    // ]),
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&.Mui-focused': {
      backgroundColor: 'transparent',
      boxShadow: `0.25 0 0 0 2px`,
      borderColor: '#56636D',
    },
    '&.Mui-error': {
      borderColor: '#EC3360',
    },
    input: {
      fontSize: 18,
    },
  },
  '& .MuiFilledInput-input': {
    '&:focus': {
      backgroundColor: 'transparent',
    },
    '&:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 30px #fff inset',
      WebkitTextFillColor: '#56636D',
    },
  },
  '& .MuiInputLabel-root': {
    fontSize: 18,
    fontFamily: 'Open Sans',
  },
  '& .MuiInputLabel-input': {
    '&:focus': {
      outline: 1,
    },
  },
  '& input:invalid + fieldset': {
    borderColor: 'red',
    borderWidth: 2,
  },
}));
