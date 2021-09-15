from __future__ import division
from numpy.fft import rfft
from numpy import argmax, mean, diff, log
from matplotlib.mlab import find
from scipy.signal import blackmanharris, fftconvolve
from time import time
import sys
try:
    import soundfile as sf
except ImportError:
    from scikits.audiolab import flacread

from parabolic import parabolic


def freq_from_crossings(sig, fs):
    """
    Estimate frequency by counting zero crossings
    """
    # Find all indices right before a rising-edge zero crossing
    indices = find((sig[1:] >= 0) & (sig[:-1] < 0))

    # Naive (Measures 1000.185 Hz for 1000 Hz, for instance)
    # crossings = indices

    # More accurate, using linear interpolation to find intersample
    # zero-crossings (Measures 1000.000129 Hz for 1000 Hz, for instance)
    crossings = [i - sig[i] / (sig[i+1] - sig[i]) for i in indices]

    # Some other interpolation based on neighboring points might be better.
    # Spline, cubic, whatever

    return fs / mean(diff(crossings))


def freq_from_fft(sig, fs):
    """
    Estimate frequency from peak of FFT
    """
    # Compute Fourier transform of windowed signal
    windowed = sig * blackmanharris(len(sig))
    f = rfft(windowed)

    # Find the peak and interpolate to get a more accurate peak
    i = argmax(abs(f))  # Just use this for less-accurate, naive version
    true_i = parabolic(log(abs(f)), i)[0]

    # Convert to equivalent frequency
    return fs * true_i / len(windowed)




filename = '440.wav'

print ('Reading file "%s"\n' % filename)
try:
    signal, fs = sf.read(filename)
except NameError:
    signal, fs, enc = flacread(filename)


print ('Calculating frequency from FFT:'),
start_time = time()
print ('%f Hz' % freq_from_fft(signal, fs))
print ('Time elapsed: %.3f s\n' % (time() - start_time))


print ('Calculating frequency from zero crossings:'),
start_time = time()
print ('%f Hz' % freq_from_crossings(signal, fs))
print ('Time elapsed: %.3f s\n' % (time() - start_time))

