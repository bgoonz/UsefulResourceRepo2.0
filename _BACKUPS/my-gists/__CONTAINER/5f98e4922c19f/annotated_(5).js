// all arguments in _meters_
function /*bokeh*/(
    a, // distance to target
    b, // circle of confusion @see https://gist.github.com/gists/1327415 - z_coc.js for details
    c, // aperture (f/2.8 - 2.8 etc)
    d, // lenses focal
    f, // camera sensor height @see https://gist.github.com/gists/1327415 - z_sensor.js for details
    x, // distance from target to background, default 1e6 (only finity positive number is allowed)
    z
){
    x = x || 1e6;
    return x / ((z = ((a * f / d) / f + 1) * d) + x) * d * d / c / (z - d) / b
};