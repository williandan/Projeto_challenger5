import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Grid, IconButton, InputAdornment, Typography } from '@mui/material'
import { useState } from 'react'
import { CustomInputLabel, CustomTextField } from '../../styles/styles'
import { theme } from '../../theme/theme'

export default function DefaultTextField({
  start,
  type,
  disabled,
  multiline,
  text,
  inputName,
  placeHolderText,
  passwordInput,
  mask,
  register,
  errors,
  middle,
  feminine
}) {
  const [showPassword, setShowPassword] = useState(passwordInput ? false : true)

  function handleClickShowPassword() {
    setShowPassword((show) => !show)
  }

  function handleMouseDownPassword(event) {
    event.preventDefault()
  }

  return (
    <Grid item xs={12} sm={middle ?? 12}>
      <CustomInputLabel htmlFor={inputName}>{text}</CustomInputLabel>
      <CustomTextField
        multiline={multiline}
        rows={multiline ? 3 : 1}
        id={inputName}
        variant="outlined"
        disabled={disabled}
        placeholder={`Digite ${feminine ? 'sua' : 'seu'} ${placeHolderText}`}
        fullWidth
        color="grey"
        {...register(inputName)}
        error={!!errors[inputName]}
        type={type ? type : showPassword ? 'text' : 'password'}
        helperText={errors[inputName] ? errors[inputName].message : null}
        InputProps={{
          startAdornment: start && (
            <InputAdornment position="start">
              <Typography variant="title5">{start}</Typography>
            </InputAdornment>
          ),
          endAdornment: passwordInput && (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}
        inputProps={mask ? Object.assign({ onKeyUp: mask }, mask) : mask}
      />
    </Grid>
  )
}
