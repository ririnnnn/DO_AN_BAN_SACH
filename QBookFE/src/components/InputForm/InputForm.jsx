import { Input } from 'antd'

const InputForm = (props) => {
  const { placeholder, value, onChange, onKeyDown, ...rests } = props

  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      {...rests}
    />
  )
}

export default InputForm
