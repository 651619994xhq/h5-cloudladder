const cityCode = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外'
}
const weightnessArr = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
const arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']

const validIDNumber = (idnumber) => {
    if (typeof idnumber !== 'string') {
        return false
    }
    var birthday = idnumber.substr(6, 4) + '/' + Number(idnumber.substr(10, 2)) + '/' + Number(idnumber.substr(12, 2))
    var d = new Date(birthday)
    var newBirthday = d.getFullYear() + '/' + Number(d.getMonth() + 1) + '/' + Number(d.getDate())
    var currentTime = new Date().getTime()
    var time = d.getTime()

    var sum = 0
    var i
    var residue
    if (!/^\d{17}(\d|x)$/i.test(idnumber)) {
        return false
    }

    if (cityCode[idnumber.substr(0, 2)] === undefined) {
        return false
    }

    if (time >= currentTime || birthday !== newBirthday) {
        return false
    }

    for (i = 0; i < 17; i++) {
        sum += idnumber.substr(i, 1) * weightnessArr[i]
    }
    residue = arrCh[sum % 11]
    if (residue !== idnumber.substr(17, 1)) {
        return false
    }
    return true
}

const validChinese = (str) => {
    var reg = /^[\u4e00-\u9fa5]{0,}$/
    return reg.test(str)
}

const validAddress = (address) => {
    if (address === '') {
        return false
    }
    var pattern = /^[\u4E00-\u9FA50-9]{0,}$/
    return pattern.test(address)
}

const validGender = (gender) => {
    return ['男', '女'].indexOf(gender) >= 0
}

const validName = (name) => {
    if (typeof name !== 'string') {
        return false
    }
    if (name.length < 2) {
        return false
    }
    return true
}

const validDate = (date) => {
    if (typeof date !== 'string') {
        return false
    }
    var arrStr = date.split('-')
    if (arrStr.length !== 2) {
        return false
    }
    var numberPattern = /^[1,2][0-9]{7}$/
    if (!numberPattern.test(arrStr[0])) {
        return false
    }

    if (arrStr[1] !== '长期' && !numberPattern.test(arrStr[1])) {
        return false
    }
    return true
}

const validBirth = (birth) => {
    var datePattern = /^\d{4}['年']\d{1,2}['月']\d{1,2}['日']/
    if (!datePattern.test(birth)) {
        return false
    }

    var arrStr = birth.split('年')

    if (arrStr.length !== 2) {
        return false
    }

    var yearPattern = /^[1,2][0-9]{3}$/
    if (!yearPattern.test(arrStr[0])) {
        return false
    }

    arrStr = arrStr[1].split('月')

    if (arrStr.length !== 2) {
        return false
    }

    var monthPattern = /^(0?[1-9]|1[0-2])$/
    if (!monthPattern.test(arrStr[0])) {
        return false
    }

    var dayPattern = /^((0?[1-9])|((1|2)[0-9])|30|31)$/
    if (!dayPattern.test(arrStr[1].replace('日', ''))) {
        return false
    }
    return true
}

export {
    validIDNumber,
    validChinese,
    validGender,
    validAddress,
    validName,
    validDate,
    validBirth
}
