import SearchIcon from '@mui/icons-material/Search'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'
import * as React from 'react'

export default function CustomizedInputBase({ handleParams, text }) {
  const [value, setValue] = React.useState(text ? text : '')

  function changeValues(e) {
    if (e.code === 'Enter') {
      return handleParams('name', value)
    }
    setValue(e.target.value)
  }

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', maxWidth: '320px' }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Pesquisa"
        type='text'
        inputProps={{ 'aria-label': 'Pesquisar Clientes' }}
        defaultValue={text ? text : ''}
        onKeyUp={(e) => changeValues(e)}
        onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}
      />
      <IconButton
        onClick={() => handleParams('name', value)}
        type="button" sx={{ p: '10px' }}
        aria-label="Icone de pesquisa"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}
