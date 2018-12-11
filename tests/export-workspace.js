function renderSimple(workspace) {
    aleph = workspace.svgBlockCanvas_.cloneNode(true);
    aleph.removeAttribute("width");
    aleph.removeAttribute("height");
    if (aleph.children[0] !== undefined) {
        aleph.removeAttribute("transform");
        aleph.children[0].removeAttribute("transform");
        aleph.children[0].children[0].removeAttribute("transform");
        var linkElm = document.createElementNS("http://www.w3.org/1999/xhtml", "style");
        var stylesTxt = Blockly.Css.CONTENT.join('') + '\n\n';
        stylesTxt = stylesTxt.replace('$colour_text', '#575E75');
        linkElm.textContent = stylesTxt; 
        aleph.insertBefore(linkElm, aleph.firstChild);
        var bbox = document.getElementsByClassName("blocklyBlockCanvas")[0].getBBox();
        var xml = new XMLSerializer().serializeToString(aleph);
        console.log('replace $colour_text with #575E75 ');
        xml = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="'+bbox.width+'" height="'+bbox.height+'" viewBox="0 0 '+bbox.width+' '+bbox.height+'"><rect width="100%" height="100%" fill="white"></rect>'+xml+'</svg>';
        var data = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(xml)));
        var img  = document.createElement("img");
        console.log(xml);
        img.setAttribute('src', data);
        document.body.appendChild(img);
    }
}

