const labelArray = (acc, cv) => {
    return {
        ...acc,
        [cv.label]: cv
    }
}

export default labelArray
