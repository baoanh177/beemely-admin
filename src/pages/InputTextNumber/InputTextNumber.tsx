import FormInput from "@/components/form/FormInput"

const InputTextNumber = () => {
  return (
    <div>
      <FormInput placeholder="Đây là input number" type="number" />
      <FormInput placeholder="Đây là input number bị disabled" isDisabled type="number" />
      <FormInput placeholder="Đây là input text" type="text" />
      <FormInput error="error!!!" placeholder="Đây là input text bị lỗi" type="text" />
      <FormInput placeholder="Đây là input text bị readonly" isReadonly type="text" />
    </div>
  )
}

export default InputTextNumber