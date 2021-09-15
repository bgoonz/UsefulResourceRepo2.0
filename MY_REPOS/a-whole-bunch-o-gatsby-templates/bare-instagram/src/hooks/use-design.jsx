import { createLocalStorageStateHook } from 'use-local-storage-state'
import { USE_DESIGN_DEFAULT } from '../constants'

export default createLocalStorageStateHook('design-options', USE_DESIGN_DEFAULT)
