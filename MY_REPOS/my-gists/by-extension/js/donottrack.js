const allowsTracking = () => {
    const dnt =
        window.doNotTrack ||
        navigator.doNotTrack ||
        navigator.msDoNotTrack
    if (dnt === 1 || dnt === '1' || dnt === 'yes') {
        return false
    }
    if ('msTrackingProtectionEnabled' in window.external) {
        return !window.external.msTrackingProtectionEnabled()
    }
    return true
}

if (allowsTracking()) {
  // Analytics Tracking Code Here 
}