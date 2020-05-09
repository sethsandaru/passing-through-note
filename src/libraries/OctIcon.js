let octicon = require('@primer/octicons')

const OctIconFactory = {
    getSVG(iconName) {
        return octicon[iconName].toSVG()
    }
};


export  {
    OctIconFactory
}