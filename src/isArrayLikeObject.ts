import isObjectLike from './isObjectLike'
import isArrayLike from './isArrayLike'

function isArrayLikeObject(value: unknown) {
  return isObjectLike(value) && isArrayLike(value)
}

export default isArrayLikeObject
