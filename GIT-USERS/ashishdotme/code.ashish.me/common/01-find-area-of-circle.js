function areaOfCircle(radius) {
  return 3.14 * radius ** 2
}

test('area of circle', () => {
  expect(areaOfCircle(1)).toEqual(3.14)
})
