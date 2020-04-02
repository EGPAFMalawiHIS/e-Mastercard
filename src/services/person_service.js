export default (() => ({
  ATTR_LANDMARK: 19,
  ATTR_CELLPHONE_NUMBER: 12,
  ATTR_NEXT_OF_KIN: 24,
  ATTR_NEXT_OF_KIN_CONTANT_NUMBER: 25,

  getPersonAttribute(person, attribute_id) {
    for (const attribute of person.person_attributes) {
      if (attribute.person_attribute_type_id == attribute_id) {
        return attribute.value;
      }
    }
  }
}))();