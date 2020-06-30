// Stwórz klasę DatePro, która pozwala na łatwą operację na datach w różnych formatach


// Klasa DatePro zawiera konstruktora constructor(dateAsString, inputDateFormat='DD.MM.YYYY'),
// metodę format(outputDateFormat) i statyczną metodę howMenyDays(instanceDatePro1,instanceDatePro2)

// Konstruktor przyjmuje parametry dateAsString i inputDateFormat zdomyślnym formatem 'DD.MM.YYYY'
// Konstruktor sprawdza czy w inputDateformat znajduje się dokładnie jeden 'DD' i jeden 'MM', przy czym dopuszcza możliwość
// wystąpienia pojedynczych znaków 'D' i 'M' co umożliwia np inputDateFormat = "Dzień: DDMMYYYY".
// Konstruktor wyklucza wstawienie w inputDateFormat ciągów potrójnych oraz pięciu i więcej znaków 'Y",
// podwójny wzór 'YY' jest interpretowany jako końcówka bieżącego wieku  'YY' -> '20YY',
// a brak 'YY' lub 'YYYY' jest traktowany jako bieżący rok.
// Po zczytaniu danych z dateAsString następuje sprawdzenie czy dany dzień istnieje.
// Gdy wszystko jest ok ustawiane są właściwości klasy day, month, year oraz obiekt date

// Metoda format(outputStringFormat='DD.MM.YYYY') sprawdza outputStringFormat na występowanie
// przynajmniej jednego z ciągów znaków: 'DD', 'MM', 'YY', 'YYYY' i zwraca string zgodny z formatem.

// Statyczna metoda howMenyDays(instanceDatePro1,instanceDatePro2) zwraca ilość dni między dwiema instancjami klasy DatePro




class DatePro{
    constructor(dateAsString, inputDateFormat='DD.MM.YYYY'){
        
        
        const that = this

        function validationInputDateFormat(inputDateFormat) {
        
            if(typeof inputDateFormat !== "string") {
                throw TypeError(" Input date format must be a string.")
            }
        
            const regexCheckDay = /^(?:[^D]*D?[^D])*D{2}(?:[^D]D?[^D]*)*$/ //sprawdza czy jest raz DD w stringu
            const regexCheckMonth = /^(?:[^M]*M?[^M])*M{2}(?:[^M]M?[^M]*)*$/  //sprawdza czy jest raz MM
            const regexCheckYearYY = /^(?:[^Y]*Y?[^Y])*Y{2}(?:[^Y]Y?[^Y]*)*$/  //sprawdza czy jest raz YY
            const regexCheckYearYYYY = /^(?:[^Y]*Y?[^Y])*Y{4}(?:[^Y]Y?[^Y]*)*$/  //sprawdza czy jest raz YYYY
            const regexCheckYearY = /^[^Y]*Y{3}[^Y]*$|Y{5,}/  ////sprawdza czy Y występuje 3, 5 lub więcej razy w stringu
        
            if (!regexCheckDay.test(inputDateFormat)) {
                throw new Error(`Input day should be formated: DD`)
            }
            
            if (!regexCheckMonth.test(inputDateFormat)) {
                throw new Error(`Input month should be formated: MM`)
            }
        
            if (regexCheckYearY.test(inputDateFormat)) {               
                throw new Error(`Input year should be formated: YYYY, YY or absence of Y which means actual year`)
            }
            
            return true
            
        }
        
        function getDatePro(dateAsString, inputDateFormat) {
            
            const regexCheckDD = /D{2}/  
            const regexCheckMM = /M{2}/
            const regexCheckYY = /Y{2}/
            const regexCheckYYYY = /Y{4}/
            const regexTwoDigits = /\d{2}/
            const regexFourDigits = /\d{4}/
            let day, month, year
            const today = new Date()
            
            if (typeof dateAsString !== "string") {
                throw TypeError(`Input date must be a string.`)
            }

            if(dateAsString.length + 2 === inputDateFormat.length) {  // sytuacja gdy inputDateFormat ma rok YYYY a dateAsString ma YY
                inputDateFormat = inputDateFormat.replace(regexCheckYY, '')
            }
        
            if (dateAsString.length !== inputDateFormat.length) {
                throw new Error(`Input date must be the same as inputDateFormat or default: DD.MM.YYYY`)
            }
        
            
            const dayPosition = inputDateFormat.search(regexCheckDD)
            const dayString =  dateAsString.slice(dayPosition, dayPosition+2)
        
            if (regexTwoDigits.test(dayString)) {  //sprawdzam czy w stringu są 2 cyfry
                day = parseInt(dayString, 10)
            } else {
                throw new Error (`Input date does not match the date pattern`)
            }
            
            const monthPosition = inputDateFormat.search(regexCheckMM)
            const monthString =  dateAsString.slice(monthPosition, monthPosition+2)
            
            if (regexTwoDigits.test(monthString)) {  //sprawdzam czy w stringu są 2 cyfry 
                month = parseInt(monthString, 10)
            } else {
                throw new Error (`Input date does not match the date pattern`)
            }
        
        
            let yearPosition = inputDateFormat.search(regexCheckYYYY)
            if (yearPosition === -1) {
                yearPosition = inputDateFormat.search(regexCheckYY)
        
                if (yearPosition === -1 ) { // gdy rok nie jest podany ustawiamy na dzisiejszy
                    year = today.getFullYear()
        
                } else {  // gdy rok jest sformatowany YY
                    const yearString = dateAsString.slice(yearPosition, yearPosition + 2)
                    if (regexTwoDigits.test(yearString)) {  // sprawdzam czy w tringu są 2 cyfry
                        year = parseInt(yearString, 10) + 100*Math.floor(today.getFullYear() / 100)
                    } else {
                        throw new Error (`Input date does not match the date pattern`)
                    }
                }
        
            } else {    // gdy rok jest sformatowany YYYY
                const yearString = dateAsString.slice(yearPosition, yearPosition + 4)
                if (regexFourDigits.test(yearString)) {  // sprawdzam czy w tringu są 4 cyfry
                    year = parseInt(yearString, 10)
                } else {
                    throw new Error (`Input date does not match the date pattern`)
                }
            }

            // sprawdzamy czy dany dzień istnieje
            const daysInfebruary =  (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) ? 29 : 28   // jeśli rok przestępny to 29
            const daysInMonth = [31, daysInfebruary, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

            if ( day === 0 || month === 0 || month > 12 || day > daysInMonth[month - 1]) {
                throw new Error (`Day ${day} in month ${month} in year ${year} does not exist!`)
            }

            that.day = day
            that.month = month
            that.year = year
            that.date = new Date(year, month - 1, day)
            
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
        
            const regexCheckAll = /^(?:[^D]*D?[^D])*D{2}(?:[^D]D?[^D]*)*$|^(?:[^M]*M?[^M])*M{2}(?:[^M]M?[^M]*)*$|^(?:[^Y]*Y?[^Y])*Y{2}(?:[^Y]Y?[^Y]*)*$|^(?:[^Y]*Y?[^Y])*Y{4}(?:[^Y]Y?[^Y]*)*$/
        
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

    static howManyDays(date1, date2) {
        return Math.abs(Math.floor((date1.date.getTime() - date2.date.getTime()) / (1000 * 60 * 60 * 24)))
    }
}





// to powinno zadziałać:

const date1 = '23.03'
const formatDate1 = 'DD.MM'
const instance1 = new DatePro(date1, formatDate1)


const date2 = '03/23/20'
const formatDate2 = 'MM/DD/YY'
const instance2 = new DatePro(date2, formatDate2)


const date3 = '20-03-20'
const formatDate3 = 'DD-MM-YYYY'
const instance3 = new DatePro(date3, formatDate3)

const date4 = '29-10-2020'
const formatDate4 = 'DD-MM-YYYY'
const instance4 = new DatePro(date4, formatDate4)

const date5 = '29031920'
const formatDate5 = 'DDMMYYYY'
const instance5 = new DatePro(date5, formatDate5)

const date6 = 'Dzień 29, miesiąc 03, rok 2020'
const formatDate6 = 'Dzień DD, miesiąc MM, rok YYYY'
const instance6 = new DatePro(date6, formatDate6)


instance1.format() // '23.03.2020'
instance2.format() // '23.03.2020'
instance3.format() // '23.03.2020'
instance4.format() // '29.03.2020'

console.log(instance1.format())
console.log(instance2.format())
console.log(instance3.format())
console.log(instance4.format('DD dzień MM miesiąca YY roku'))
console.log(instance5.format('Dzień: MM/DD/YYYY'))
console.log(instance6.format('MM----DD--YYYY'))