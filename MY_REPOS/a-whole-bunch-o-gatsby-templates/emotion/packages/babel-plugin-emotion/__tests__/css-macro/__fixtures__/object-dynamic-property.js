import css from '@emotion/css/macro'

function doThing() {
  return {
    [css({ color: 'hotpink' })]: 'coldblue',
  }
}
