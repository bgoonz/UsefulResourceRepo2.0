"use strict";

DAWCore.actions.changeNewSynthType = ( id, type, get ) => {
    const syn = get.synth( id );

    // syn.type = type;
    console.log(syn);

    document.querySelector(`.gsuiPatterns-synth[data-id="${ id }"] > .gsuiPatterns-synth-head > .gsuiPatterns-synth-synthSelect`).value = type;
    
    return [
        { synths: { [ id ]: { type } } },
        [ "synths", "renameSynth", syn.name, type ],
    ];
};
