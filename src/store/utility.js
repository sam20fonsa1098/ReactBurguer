export const updateObject = (oldObject, udpdatedProperties) => {
    return {
        ...oldObject,
        ...udpdatedProperties
    }
}