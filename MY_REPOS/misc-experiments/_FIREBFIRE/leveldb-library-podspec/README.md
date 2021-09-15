# LevelDB Library podspec

This repository provides a podspec to create a CocoaPod for the
[LevelDB library](https://github.com/google/leveldb).

## Build Notes

CocoaPods 1.x currently does not support libraries with C++ headers. See
https://github.com/CocoaPods/CocoaPods/issues/5152. The workaround is to use
the CocoaPods option --skip-import-validation.

## Updating the podspec (assuming the library is not changing)

  * Update s.version below to the next semantic version
  * pod spec lint leveldb-library.podspec --skip-import-validation
  * Do pull request
  * pod trunk push leveldb-library.podspec --skip-import-validation
