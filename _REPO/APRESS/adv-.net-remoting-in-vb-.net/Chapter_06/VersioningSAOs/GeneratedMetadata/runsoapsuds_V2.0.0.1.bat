@echo off
copy ..\Server2.0.0.1\bin\VersionedSAO.dll .
soapsuds -ia:VersionedSAO -nowp -oa:generated_meta_V2_0_0_1.dll
del VersionedSAO.dll
