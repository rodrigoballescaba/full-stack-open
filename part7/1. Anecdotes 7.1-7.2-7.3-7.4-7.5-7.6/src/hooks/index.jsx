import { useState } from "react"

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const changeValue = (result) => {
        setValue(result)
    }

    return {
        type,
        value,
        onChange,
        changeValue
    }
}