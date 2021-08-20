/**
 * 
 * @author Phil Davis <pdavis@pobox.com>
 * 
 * @class
 * @classdesc 
  *
 * */

class OMAHSF_Declarations {
    constructor() {
        /** 
         *  @summary c
         *  @description Speed of light in a vacuum
         *  @constant
         *  @type {number}
         *  @default
         *  @example oOMAHSF.Const.c.Value
         * */
        this.c = {
            Value: 299792458,
            Units: 'm/s',
            MilesPerSecond: {
                Value: 186282.397049,
                Units: 'Miles Per Second'
            }
                
        };

        /**
         *  @summary Gravitational Constant
         *  @description In Newton's law, the Gravitational Constant is the proportionality constant connecting the gravitational force between two bodies with the product of their masses and the inverse square of their distance. In the Einstein field equations, it quantifies the relation between the geometry of spacetime and the energy-momentum tensor
         *  @see https://en.wikipedia.org/wiki/Gravitational_constant
         *  @constant
         *  @type {number}
         *  @default
         *  @example oOMAHSF.Const.GravitationalConstant.Value
         *
         * */
        this.GravitationalConstant = {
            Value: 0.0000000000667430,
            Units: 'm3⋅kg–1⋅s–2',        
            Parsecs_KilometersPerSecond_SolarMass: {
                Value: 0.00430091,
                Units: 'pc⋅M⊙–1⋅(km/s)2'
            },
            Dynes_Centimeters_Grams: {
                Value: 0.000000066743,
                Units: 'dyne cm2⋅g–2'
            }
        };
    }
}

/**
 *  @summary Earth
 *  @description Measurements for the planet Earth
 *  @constant
 *  @type {number}
 *  @default
 *  @example oOMAHSF.Const.Earth.Gravity.Standard.Value
 *
 * */
OMAHSF_Declarations.prototype.Earth = {
    Gravity: {
        Standard: {Value: 9.80665, Units: 'm/s²'},
        Equatorial: { Value: 9.78033, Units: 'm/s²' },
        Polar: { Value: 9.832, Units: 'm/s²' }
    },
    Radius: {
        Mean: {Value: 6371008.7714, Units: 'm'},
        Equatorial: { Value: 6378137, Units: 'm'},
        Polar: { Value: 6399593.6259, Units: 'm'},
        Maximum: { Value: 6384400, Units: 'm'},
        Minimum: { Value: 6352800, Units: 'm'},
    },
    Mass: {Value: 5.9724e24, Units: 'kg'},
    Density: { Value: 5514, Units: 'kg/m3' },
    LengthOfDay: { Value: 86400, Units: 's' }
};

/**
 *  @summary Luna
 *  @description Measurements for Earth's Moon
 *  @constant
 *  @type {number}
 *  @default
 *  @example oOMAHSF.Const.Moon.Gravity.Standard.Value
 *
 * */
OMAHSF_Declarations.prototype.Luna = {
    Gravity: {
        Standard: { Value: 1.6, Units: 'm/s²' }
    },
    Radius: {
        Equatorial: { Value: 3475000, Units: 'm' }
    },
    Mass: { Value: 0.0735e24, Units: 'kg' },
    Density: { Value: 3340, Units: 'kg/m3' },
    LengthOfDay: { Value: 2551320, Units: 's' },
    Orbit: {
         Apogee: { Value: 406000000, Units: 'm' },
           Mean: { Value: 384400000, Units: 'm' },
        Perigee: { Value: 363000000, Units: 'm' }        
    },
    
    
};

/**
 *  @summary Mars
 *  @description Measurements for the planet Mars
 *  @see Ref10, Ref11, Ref12
 *  @constant
 *  @type {number}
 *  @default
 *  @example oOMAHSF.Const.Mars.Gravity.Standard.Value
 *
 * */
OMAHSF_Declarations.prototype.Mars = {
    Gravity: {
        Standard: { Value: 3.72076, Units: 'm/s²' },
        Equatorial: { Value: 3.70703, Units: 'm/s²' }, // Ref10
        Polar: { Value: 3.73493, Units: 'm/s²' }, // Ref10
        Midlatitudes: { Value: 3.71683, Units: 'm/s²' } // Ref10
    },
    Radius: {
        Mean: { Value: 3389508, Units: 'm' }, // Ref11
        Equatorial: { Value: 3396200, Units: 'm' }, // Ref11
        Polar: { Value: 376200, Units: 'm' }, // Ref12
        Maximum: { Value: 3398627, Units: 'm' }, // Ref12
        Minimum: { Value: 3376200, Units: 'm' } // Ref12
    },
    LengthOfDay: { Value: 88920, Units: 's' } // Ref16
};

console.info(`Declarations.js loaded succesfully.`);