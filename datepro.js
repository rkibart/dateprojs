// Stwórz klasę DatePro, która pozwala na łatwą operację na datach w różnych formatach



class DatePro{
    constructor(dateAsString, inputDateFormat='DD.MM.YYYY'){
        
        
        const that = this

        function validationInputDateFormat(inputDateFormat) {
        
            if(typeof inputDateFormat !== "string") {
                throw TypeError(" Input date format must be a string.")
            }
        
            const regexCheckDay = /^[^D]*D{2}[^D]*$/g  //sprawdza czy jest DD w stringu i nie ma innych D
            const regexCheckMonth = /^[^M]*M{2}[^M]*$/g  //sprawdza czy jest MM w stringu i nie ma innych M
            const regexCheckYearYY = /^[^Y]*Y{2}[^Y]*$/g  //sprawdza czy jest YY w stringu i nie ma innych Y
            const regexCheckYearYYYY = /^[^Y]*Y{4}[^Y]*$/g  //sprawdza czy jest YYYY w stringu i nie ma innych Y
            const regexCheckYearY = /[Y]/g  ////sprawdza czy jest Y w stringu 
        
            if (inputDateFormat.search(regexCheckDay) === -1) {
                throw new Error(`Input day should be formated: DD`)
            }
            
            if (inputDateFormat.search(regexCheckMonth) === -1) {
                throw new Error(`Input month should be formated: MM`)
            }
        
            if ((inputDateFormat.search(regexCheckYearYYYY) === -1) && (inputDateFormat.search(regexCheckYearYY) === -1)) {
                
                if (inputDateFormat.search(regexCheckYearY) !== -1) {
                    throw new Error(`Input year should be formated: YYYY, YY or absence of Y which means actual year`)
                }
            }
            
            return true
            
        }
        
        function getDatePro(dateAsString, inputDateFormat) {
            if (typeof dateAsString !== "string") {
                throw TypeError(`Input date must be a string.`)
            }
        
            if (dateAsString.length !== inputDateFormat.length) {
                throw new Error(`Input date must be the same as inputDateFormat or default: DD.MM.YYYY`)
            }
        
            const regexCheckDD = /D{2}/g  
            const regexCheckMM = /M{2}/g
            const regexCheckYY = /Y{2}/g
            const regexCheckYYYY = /Y{4}/g
            const regexTwoDigits = /\d{2}/
            const regexFourDigits = /\d{4}/
            const today = new Date()
            
            const dayPosition = inputDateFormat.search(regexCheckDD)
            const dayString =  dateAsString.slice(dayPosition, dayPosition+2)
        
            if (regexTwoDigits.test(dayString)) {  //sprawdzam czy w stringu są 2 cyfry
                that.day = parseInt(dayString, 10)
            } else {
                throw new Error (`Input date does not match the date pattern`)
            }
            
            const monthPosition = inputDateFormat.search(regexCheckMM)
            const monthString =  dateAsString.slice(monthPosition, monthPosition+2)
            
            if (regexTwoDigits.test(monthString)) {  //sprawdzam czy w stringu są 2 cyfry 
                that.month = parseInt(monthString, 10)
            } else {
                throw new Error (`Input date does not match the date pattern`)
            }
        
        
            let yearPosition = inputDateFormat.search(regexCheckYYYY)
            if (yearPosition === -1) {
                yearPosition = inputDateFormat.search(regexCheckYY)
        
                if (yearPosition === -1 ) { // gdy rok nie jest podany ustawiamy na dzisiejszy
                    that.year = today.getFullYear()
        
                } else {  // gdy rok jest sformatowany YY
                    const yearString = dateAsString.slice(yearPosition, yearPosition + 2)
                    if (regexTwoDigits.test(yearString)) {  // sprawdzam czy w tringu są 2 cyfry
                        that.year = parseInt(yearString, 10) + 100*Math.floor(today.getFullYear() / 100)
                    } else {
                        throw new Error (`Input date does not match the date pattern`)
                    }
                }
        
            } else {    // gdy rok jest sformatowany YYYY
                const yearString = dateAsString.slice(yearPosition, yearPosition + 4)
                if (regexFourDigits.test(yearString)) {  // sprawdzam czy w tringu są 4 cyfry
                    that.year = parseInt(yearString, 10)
                } else {
                    throw new Error (`Input date does not match the date pattern`)
                }
            }
            
        }

        // wywolujemy funkcje
        if(validationInputDateFormat(inputDateFormat)) {
            getDatePro(dateAsString, inputDateFormat)
        }

    }

    format(outputStringFormat='DD.MM.YYYY'){
        const day = this.day
        const month = this.month
        const year = this.year
        function validationOutputDateFormat(outputStringFormat) {
        
            if(typeof outputStringFormat !== "string") {
                throw TypeError(" Input date format must be a string.")
            }
        
            const regexCheckAll = /^[^D]*D{2}[^D]*$|^[^M]*M{2}[^M]*$|^[^Y]*Y{2}[^Y]*$|^[^Y]*Y{4}[^Y]*$/
        
            if(!regexCheckAll.test(outputStringFormat)) {
                    throw new Error(`OutputStringFormat must contain at least one of DD MM YY YYYY`)
            }
            
            
            return true
            
        }
        
        function formatOutput (day, month, year, outputStringFormat ) {
           
            const regexCheckDD = /D{2}/g  
            const regexCheckMM = /M{2}/g
            const regexCheckYY = /Y{2}/g
            const regexCheckYYYY = /Y{4}/g
            let outputString
        
            outputString = outputStringFormat.replace(regexCheckDD, day.toString().padStart(2, '0'))
            outputString = outputString.replace(regexCheckMM, month.toString().padStart(2, '0'))
            if (regexCheckYYYY.test(outputString)) {
                outputString = outputString.replace(regexCheckYYYY, year.toString())
            } else {
                outputString = outputString.replace(regexCheckYY, year.toString().slice(2))
        
            }
        
        
            return outputString
            
        
        }

        // wywolujemy funkcje
        if (validationOutputDateFormat(outputStringFormat)) {
           return formatOutput(day, month, year, outputStringFormat)
        }
    }
}





// to powinno zadziałać:

const date1 = '23.03'
const formatDate1 = 'DD.MM'
const instance1 = new DatePro(date1, formatDate1)


const date2 = '03/23/20'
const formatDate2 = 'MM/DD/YY'
const instance2 = new DatePro(date2, formatDate2)


// const date3 = '20-03-20'
// const formatDate3 = 'DD-MM-YYYY'
// const instance3 = new DatePro(date3, formatDate3)


instance1.format() // '23.03.2020'
instance2.format() // '23.03.2020'
//instance3.format() // '23.03.2020'