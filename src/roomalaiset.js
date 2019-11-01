const romanNums = {
  "M": 1000,
  "D": 500,
  "C": 100,
  "L": 50,
  "X": 10,
  "V": 5,
  "I": 1
}


const tokenize = (arr) => {
  const first = arr[0]
  const index = arr.findIndex(el => el !== first)
  if (index === -1) {
    return [arr]
  } else {
  return [arr.slice(0,index), ...tokenize(arr.slice(index))]
  }
}

const verifyInput = (counts) => {
  const head = counts[0]
  const tail = counts.slice(1)

  // can only contain numerals MDCLXVI
  if (!counts.every(char => "MDCLXVI".includes(char.character))) {
    return false
  }

  // a maximum of 3 of the same numeral in a row, excluding the largest one
  if (head.character !== 'M' && head.count > 3) {
    return false
  }

  if (tail.some(num => num.count > 3)) {
    return false
  }

  // a numeral cannot be over 10 times larger than the numeral to its left
  if (tail.some((char, index) => char.value / counts[index].value > 10)) {
    return false
  }

  /*check that the number is in a simple form e.g. no xxixixix or other loosely additive forms
    more accurately, check that each positive value is larger than the sum of everything right of it
    this goes beyond the scope of the spec (the wikipedia page) and probably requires a definition of the simplest form for all roman numerals */
  if (!tail.every((char, index) => {
    if(char.sign === 1) {
      return true
    } else {
      return counts[index].value > tail.slice(index).map(char => char.value*char.count*char.sign).reduce((sum, value) => sum + value)
    }
  })) {
    return false
  }

  return true
}

const inferSigns = (counts) => {
  // the last numeral will always be positive so iterating over the first n - 1 values is sufficient
  const helper = counts.slice(0, counts.length - 1)
  return helper.map((count, index) => ({ ...count, sign: count.value > counts[index+1].value ? 1 : -1})).concat(counts[counts.length - 1])
}

const transform = (str) => {
  const numerals = tokenize(str.toUpperCase().split(''))
  const counts = numerals.map(num => (
    { 
      character: num[0],
      count: num.length,
      value: romanNums[num[0]],
      sign: 1
    }
  ))
  const signedCounts = inferSigns(counts)
  if (!verifyInput(signedCounts)) {
    return -1
  }

  
  return signedCounts.reduce((acc, count) => acc + count.count*count.value*count.sign, 0)

}

export default { transform }