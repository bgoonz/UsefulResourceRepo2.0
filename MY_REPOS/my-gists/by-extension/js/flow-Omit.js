// Source: https://github.com/facebook/flow/issues/3367#issuecomment-397933288

// We can replicate $Omit non dynamic functionality by doing the following:

type T0 = {
  k0: string,
  k1: number,
  k2: boolean
};

// this would be the same as type T1 = $Omit<T0, ["k0", "k1"]>
type T1 = $Diff<T0, {
  k0: *,
  k1: *
}>;