function _(e, all=false) {
    let divs = document.querySelectorAll(e);
    if (all || (divs.length > 1)) { return divs; }
    return divs[0];
}

_('input', true).forEach(element => {
    element.addEventListener('input', drawBordr);
});

const resultDiv = _('.result');

drawBordr();
function drawBordr() {

    let borderWidth = Number(_('[name="borderWidth"]').value);
    let color1 = _('[name="borderColor"]').value;
    let dashLength = Number(_('[name="dashLength"]').value);
    let spacing = Number(_('[name="spacing"]').value);
    let slanting = Number(_('[name="slanting"]').value);
    let borderFade = 100 - Number(_('[name="borderFade"]').value);
    let diraction = _('[name="diraction"]').checked;
    let animation = Number(_('[name="animation"]').value);

    let color2 = 'transparent';

    const backgroundImage = `
        repeating-linear-gradient(${slanting + (diraction ? 180 : 0) }deg, ${color1}, ${color1} ${Math.round(dashLength * borderFade) / 100}px, ${color2} ${dashLength}px, ${color2} ${dashLength + (Math.round(spacing * borderFade) / 100)}px, ${color1} ${dashLength + spacing}px),
        repeating-linear-gradient(${slanting + (diraction ? 270 : 90)}deg, ${color1}, ${color1} ${Math.round(dashLength * borderFade) / 100}px, ${color2} ${dashLength}px, ${color2} ${dashLength + (Math.round(spacing * borderFade) / 100)}px, ${color1} ${dashLength + spacing}px),
        repeating-linear-gradient(${slanting + (diraction ? 0 : 180) }deg, ${color1}, ${color1} ${Math.round(dashLength * borderFade) / 100}px, ${color2} ${dashLength}px, ${color2} ${dashLength + (Math.round(spacing * borderFade) / 100)}px, ${color1} ${dashLength + spacing}px),
        repeating-linear-gradient(${slanting + (diraction ? 90 : 270)}deg, ${color1}, ${color1} ${Math.round(dashLength * borderFade) / 100}px, ${color2} ${dashLength}px, ${color2} ${dashLength + (Math.round(spacing * borderFade) / 100)}px, ${color1} ${dashLength + spacing}px)`;

    const borderLengthPx = Math.round((dashLength + spacing) / Math.sin((90 - Math.abs(slanting)) * Math.PI / 180) * 100) / 100;
    const borderLength = (animation > 0) ? `calc(100% + ${borderLengthPx}px)` : '100%';
    const backgroundSize = `${borderWidth}px ${borderLength}, ${borderLength} ${borderWidth}px, ${borderWidth}px ${borderLength} , ${borderLength} ${borderWidth}px`;
    const backgroundPosition = `0 0, 0 0, 100% 0, 0 100%`;

    resultDiv.style.backgroundImage = backgroundImage;
    resultDiv.style.backgroundSize = backgroundSize;
    resultDiv.style.backgroundPosition = backgroundPosition;

    const animationPropery = (animation > 0) ? `borderAnimation ${Math.round((1.1 - animation) * 10) / 10}s infinite linear${diraction ? ' reverse' : ''}` : 'unset';
    resultDiv.style.animation = animationPropery;

    let animationTxt = '';
    if (animation > 0) {
        document.documentElement.style.setProperty('--AnimationLength', `-${borderLengthPx}px`);

        animationTxt = `
                <span><b>animation:</b> ${animationPropery};</span>
            }<br>
            <br>
            @keyframes <b>borderAnimation</b> {
                <span>from { background-position:  0 0, -${borderLengthPx}px 0, 100% -${borderLengthPx}px, 0 100%; }</span>
                <span>to { background-position:  0 -${borderLengthPx}px, 0 0, 100% 0, -${borderLengthPx}px 100%; }</span>
        `;
    }

    resultDiv.style.padding = `calc(1em + ${borderWidth}px)`;
    
    resultDiv.innerHTML = `
        <code>
            .box {
                <span><b>background-image:</b> ${backgroundImage};</span>
                <span><b>background-size:</b> ${backgroundSize};</span>
                <span><b>background-position:</b> ${backgroundPosition};</span>
                <span><b>background-repeat:</b> no-repeat; </span>
                ${animationTxt}
            }
        </code>
    `;
}