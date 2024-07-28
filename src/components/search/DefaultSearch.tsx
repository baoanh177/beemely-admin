import FilterTableStatus, { IFilterTableStatusOption } from '../table/FilterTableStatus'
import FormInput from '../form/FormInput'
import { IoSearchOutline } from 'react-icons/io5'
import { BiSliderAlt } from 'react-icons/bi'
import RoundedIcon from '../common/RoundedIcon'
export interface IDefaultSearchProp {
  option: IFilterTableStatusOption[]
}
const DefaultSearch = ({ option }: IDefaultSearchProp) => {



  return (
    <div>
      <div className="flex justify-between">
        <FilterTableStatus options={option} />
        <div className="flex gap-4">
          <FormInput icon={IoSearchOutline} placeholder="Tìm kiếm. . ." type="text" />
          <RoundedIcon icon={BiSliderAlt} shape='square' size="filter" color='primary' />
        </div>
      </div>
    </div>
  )
}

export default DefaultSearch
