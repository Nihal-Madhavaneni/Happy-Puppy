import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};


function getStyles(name, breedName, theme) {
  return {
    fontWeight:
    breedName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect({data,handleChange,value,dropdownTitle}) {

  const theme = useTheme();

  return (
    <div>
      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel id="demo-multiple-name-label">{dropdownTitle}</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          // multiple
          value={value}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {data.map((item) => (
            <MenuItem
              key={item}
              value={item}
              style={getStyles(item, value, theme)}
            >
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
