const Cube = require('cano-cube');
const requireAll = require('require-all');
const map = require('lodash/map');
const path = require('path');

/**
  * @class ControllersCube
  * @classdesc This cube is for instance and load controllers to the cano app core
  * @extends Cube
  * @author Antonio Mejias
  */
class ControllersCube extends Cube {
    /**
     * @constructs
     * @author Antonio Mejias
     */
    constructor(cano) {
        super(cano)
    }

    /**
     * @override
     * @method prepare
     * @description Ask if the cano.app.controllers object exist, if not exist
     * the method create the proton.app.controllers object
     * @author Antonio Mejias
     */
    prepare() {
        return new Promise((resolve) => {
            if (!this.cano.app.controllers) this.cano.app.controllers = {};
            resolve();
        })
    }

    /**
     * @override
     * @method up
     * @description This method run the cube controllers main logic, in this case, instance
     * all the controllers in the api folder and bind it to the cano app core
     * @author Antonio Mejias
     */
    up() {
        return new Promise((resolve) => {
            const requiredControllers = requireAll(this.controllerPath)
            map(requiredControllers, (Controller, fileName) => {
                const controller = new Controller();
                this.bindToApp('controllers', fileName, controller)
            })
            resolve()
        })
    }

    /**
     * @method controllerPath
     * @description This method is a getter that return the absolute path where the
     * controllers are located
     * @author Antonio Mejias
     */
    get controllerPath() {
        return path.join(this.cano.app.paths.api, '/controllers')
    }
}

module.exports = ControllersCube;
