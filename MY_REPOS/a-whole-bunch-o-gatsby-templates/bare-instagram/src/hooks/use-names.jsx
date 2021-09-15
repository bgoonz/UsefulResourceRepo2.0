import { createLocalStorageStateHook } from 'use-local-storage-state'
import { USE_NAMES_DEFAULT } from '../constants'

export default createLocalStorageStateHook('names', USE_NAMES_DEFAULT)
