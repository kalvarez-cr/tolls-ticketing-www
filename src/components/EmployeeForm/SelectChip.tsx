// import  React from 'react'
import { Theme, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Chip from '@mui/material/Chip'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: '100%',
        },
    },
}

function getStyles(
    name: string,
    optionSelected: readonly string[],
    theme: Theme
) {
    return {
        fontWeight:
            optionSelected.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    }
}

export default function MultipleSelectChip({
    options,
    optionSelected,
    setOptionSelected,
}) {
    const theme = useTheme()
    // const [personName, setPersonName] = React.useState<string[]>([])

    const handleChange = (event: SelectChangeEvent<typeof optionSelected>) => {
        const {
            target: { value },
        } = event
        setOptionSelected(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value
        )
    }

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={optionSelected}
                    onChange={handleChange}
                    input={
                        <OutlinedInput id="select-multiple-chip" label="Chip" />
                    }
                    renderValue={(selected) => {
                        return (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 0.5,
                                }}
                            >
                                {selected.map((value) => {
                                    const findLabel = options.find(
                                        (option) => option.id === value
                                    )

                                    return (
                                        <Chip
                                            key={value}
                                            label={findLabel.name}
                                        />
                                    )
                                })}
                            </Box>
                        )
                    }}
                    MenuProps={MenuProps}
                >
                    {options.map((option) => (
                        <MenuItem
                            key={option.id}
                            value={option.id}
                            style={getStyles(option, optionSelected, theme)}
                        >
                            {option.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}
