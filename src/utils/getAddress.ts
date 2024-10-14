import { provinces } from "@/data/provinces"

export const getProvince = (id: string) => {
  return provinces.find(p => p.idProvince === id)
}
export const getDistrict = (pId: string, dId: string) => {
  const province = getProvince(pId)
  if(!province) return null
  return province.districts.find(d => d.idDistrict === dId)
}
export const getCommune = (pId: string, dId: string, cId: string) => {
  const district = getDistrict(pId, dId)
  if(!district) return null
  return district.communes.find(c => c.idCommune === cId)
}