createArtefactElement = function(callback){
    artefactEl = document.createElement('DIV');
    artefactEl.setAttribute("id", "artefact-vid");
    artefactEl.setAttribute("data-id", "333572227");
    artefactEl.setAttribute("data-cues", "[0.0,2.2,4.8,11.2,11.2]");
    artefactEl.setAttribute("data-start", "special");
    artefactWrapper = document.querySelector("#artefact-test-wrapper");
    artefactWrapper.appendChild(artefactEl);
    callback();
}

setTimeout(function(){
    createArtefactElement(goArtefact);
}, 1000);