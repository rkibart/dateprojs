function validationDateFormat(inputDateFormat) {

    if(typeof inputDateFormat !== "string") {
        throw TypeError(" Input date format must be a string.")
    }

    const regexCheckDay = /^[^D]*D{2}[^D]*$/g  
    const regexCheckMonth = /^[^M]*M{2}[^M]*$/g
    const regexCheckYearYY = /^[^Y]*Y{2}[^Y]*$/g
    const regexCheckYearYYYY = /^[^Y]*Y{4}[^Y]*$/g
    const regexCheckYearY = /[Y]/g

    if (inputDateFormat.search(regexCheckDay) === -1) {
        throw new Error(`Input day should be formated: DD`)
    }
    
    if (inputDateFormat.search(regexCheckMonth) === -1) {
        throw new Error(`Input month should be formated: MM`)
    }

    if ((inputDateFormat.search(regexCheckYearYYYY) === -1) && (inputDateFormat.search(regexCheckYearYY) === -1)) {
        console.log('tutaj');
        
        if (inputDateFormat.search(regexCheckYearY) !== -1) {
            throw new Error(`Input year should be formated: YYYY, YY or absence of Y which means actual year`)
        }
    }
    
    return true
    
}




const inputDateFormat1 = 'MM.DD.YY'
const inputDateFormat2 = 'MM.DD.YYYY'
const inputDateFormat3 = 'MM.DD.'
const inputDateFormat4 = '-MM-DD--YYYY'
const inputDateFormat5 = 'MMM.DD.YY'
const inputDateFormat6 = 'MM.D.YY'
const inputDateFormat7 = 'DD--YY'
const inputDateFormat8 = 'DD--MM'

validationDateFormat(inputDateFormat1)