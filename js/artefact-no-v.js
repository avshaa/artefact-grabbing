function isIE() {
    ua = navigator.userAgent;
    var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    return is_ie; 
}

function goArtefact() {

    var testWrapperContainer = document.getElementById("artefact-test-wrapper");

    if (testWrapperContainer) {
        var testWrapperContainerWidth = testWrapperContainer.offsetWidth;
        var testWrapperContainerHeight = testWrapperContainerWidth * 0.5625;
        testWrapperContainer.style.height = testWrapperContainerHeight + "px";
        testWrapperContainer.style.backgroundColor = "#f8f8f8";
    }

    var artefactContainer = document.getElementById("artefact-vid");

    if (artefactContainer) {

        console.log("artefact container is here");

        var theCues = JSON.parse(artefactContainer.getAttribute("data-cues"));
        var startOn = artefactContainer.getAttribute("data-start")

        //    
        artefactContainer.innerHTML += "<div id='artefact-iframe-wrapper'></div>";
        var artefactIframeWrapper = document.getElementById("artefact-iframe-wrapper");
        //
        artefactIframeWrapper.innerHTML += "<div id='artefact-control'>קרב אלי</div>";
        var artefactControl = document.getElementById("artefact-control");
        //
        artefactControl.style.position = "absolute";
        artefactControl.style.width = "160px";
        artefactControl.style.height = "40px";
        artefactControl.style.top = "calc( 100% + 20px )";
        artefactControl.style.left = "50%";
        artefactControl.style.marginLeft = "-80px";
        artefactControl.style.border = "1px solid black";
        artefactControl.style.textAlign = "center";
        artefactControl.style.font = "16px/1.2 'simplerpro_v3regular',arial,sans-serif";
        artefactControl.style.lineHeight = "38px";
        artefactControl.style.cursor = "pointer";
        artefactControl.style.transition = "all .26s ease-out";
        artefactControl.style.visibility = "hidden";
        artefactControl.style.transform = "translateY(10px)";

        //
        artefactContainer.style.position = "relative";

        var vimeoId = artefactContainer.getAttribute("data-id");
        var vimeoOptions = {
            id: vimeoId,
            muted: true,
            background: true,
            loop: true,
            quality: 1080,
        }
        var artefactPlayer = new Vimeo.Player("artefact-iframe-wrapper", vimeoOptions);

        artefactPlayer.on('loaded', function() {
            console.log('artefact loaded!');
            //
            var artefactIframeWrapperChildren = artefactIframeWrapper.getElementsByTagName("iframe");
            var artefactIframe = artefactIframeWrapperChildren[0];
            //
            artefactIframeWrapper.style.paddingBottom = "56.25%";
            artefactIframeWrapper.style.position = "relative";
            //
            if (isIE()){
                artefactIframe.style.position = "absolute";
                artefactIframe.style.width = "110%";
                artefactIframe.style.height = "110%";
                artefactIframe.style.top = "-5%";
                artefactIframe.style.left = "-5%";
            } else {
                artefactIframe.style.position = "absolute";
                artefactIframe.style.width = "100%";
                artefactIframe.style.height = "100%";
                artefactIframe.style.top = "0";
                artefactIframe.style.left = "0";
            }
            //
            var cues = [
                {
                    cueTime: theCues[0],
                    buttonText: "קרב אלי"
                },
                {
                    cueTime: theCues[1],
                    buttonText: "מבט מהצד"
                },
                {
                    cueTime: theCues[2],
                    buttonText: "צד שני"
                },
                {
                    cueTime: theCues[3],
                    buttonText: "חזרה למדף"
                },
                {
                    cueTime: theCues[4],
                    buttonText: "חזרה למדף"
                },
            ]
            cues.forEach(function(step){
                artefactPlayer.addCuePoint(step.cueTime, {
                    customKey: step.buttonText
                });
            });
            //
            if (startOn == "special") {
                var firstCueFlag = false;
                artefactPlayer.on('cuepoint', function(data) {
                    var cueText = data.data.customKey;
                    artefactControl.textContent=cueText;
                    if (cueText == "מבט מהצד") {
                        firstCueFlag = true;
                    }
                    if (firstCueFlag == true) {
                        artefactPlayer.pause();
                    }
                });
            } else {
                artefactPlayer.on('cuepoint', function(data) {
                    var cueText = data.data.customKey;
                    artefactControl.textContent=cueText;
                    artefactPlayer.pause();
                });
            }
        });

        var firstPauseFlag = false;

        artefactPlayer.on('play', function() {
            console.log('artefact is playing!');
            //
            if (firstPauseFlag == false) {
                if (startOn == "special") {
                    artefactPlayer.play();
                } else {
                    artefactPlayer.pause();
                }
                firstPauseFlag = true;
            }
            //
            artefactControl.style.visibility = "visible";
            artefactControl.style.transform = "translateY(0)";
            //
            artefactControl.onmouseenter = function() { 
                artefactControl.style.background = "black";
                artefactControl.style.color = "white";
            };
            artefactControl.onmouseleave = function() { 
                artefactControl.style.background = "white";
                artefactControl.style.color = "black";
            };
            //
            artefactControl.onclick = function() { 
                artefactPlayer.play();
            };
            //
            if (testWrapperContainer) {
                testWrapperContainer.style.height = "auto";
            }
        });

    }

}