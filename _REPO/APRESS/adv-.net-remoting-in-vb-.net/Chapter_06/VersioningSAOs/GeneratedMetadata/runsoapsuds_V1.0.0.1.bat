@echo off
copy ..\Server1.0.0.1\bin\VersionedSAO.dll .
SoapSuds -ia:VersionedSAO -nowp -oa:generated_meta_V1_0_0_1.dll
del VersionedSAO.dll

