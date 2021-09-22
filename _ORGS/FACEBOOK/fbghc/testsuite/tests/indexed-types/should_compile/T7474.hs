
{-# LANGUAGE TypeFamilies, GADTs, FlexibleContexts, MultiParamTypeClasses #-}

module T7474 where

import Data.Kind (Type)

type family T :: Type -> Type

data E :: Type -> Type where
    E :: C p => T (T p) -> E p

class C' b a where c :: T b -> a

class C' (T a) a => C a

-- f :: C' (T p) a => E p -> a
f (E d) = c d

