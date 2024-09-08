import { Button } from 'antd'

const ButtonComponent = ({
  type,
  icon,
  size,
  styleButton,
  buttonText,
  styleTextButton,
  onClick,
  disabled = false,
  ...rests
}) => {
  return (
    <Button
      type={type}
      icon={icon}
      size={size}
      style={{
        ...styleButton,
        backgroundColor: disabled ? '#ccc' : styleButton?.backgroundColor,
      }}
      onClick={onClick}
      disabled={disabled}
      className={disabled ? '' : 'hover:opacity-85'}
      {...rests}
    >
      <span style={styleTextButton}>{buttonText}</span>
    </Button>
  )
}

export default ButtonComponent
