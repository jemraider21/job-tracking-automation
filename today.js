let date = new Date();
let month = monthToString();
let day = date.getDate();
let year = date.getFullYear();
let dateToString = todayToString();

function monthToString(){
    switch(date.getMonth()){
        case 0: return "January"; break;
        case 1: return "Febuary"; break;
        case 2: return "March"; break;
        case 3: return "April"; break;
        case 4: return "May"; break;
        case 5: return "June"; break;
        case 6: return "July"; break;
        case 7: return "August"; break;
        case 8: return "September"; break;
        case 9: return "October"; break;
        case 10: return "November"; break;
        default: return "December";
    }
}

function todayToString(){
    return `${this.month} ${this.day}, ${this.year}`
}

exports.month = month;
exports.day = day;
exports.year = year;
exports.dateToString = dateToString;