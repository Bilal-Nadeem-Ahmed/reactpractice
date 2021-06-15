const palindrome = require('../utils/for_testing').palindrome

test('palindrome of a ', () => {
  const result = palindrome('a')

  expect(result).toBe('a')
})

test('palindrome of react',() => {
  const result = palindrome('react')

  expect (result).toBe('tcaer')
})

test('Palindrome of the word racecar',() => {
  const result=palindrome('racecar')
  expect(result).toBe('racecar')
})