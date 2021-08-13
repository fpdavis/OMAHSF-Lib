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
            UnitsOfMeasure: 'm/s',
            MilesPerSecond: {
                Value: 186282.397049,
                UnitsOfMeasure: 'Miles Per Second'
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
            UnitsOfMeasure: 'm3⋅kg–1⋅s–2',        
            Parsecs_KilometersPerSecond_SolarMass: {
                Value: 0.00430091,
                UnitsOfMeasure: 'pc⋅M⊙–1⋅(km/s)2'
            },
            Dynes_Centimeters_Grams: {
                Value: 0.000000066743,
                UnitsOfMeasure: 'dyne cm2⋅g–2'
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
        Standard: {Value: 9.80665, UnitsOfMeasure: 'm/s²'},
        Equatorial: { Value: 9.78033, UnitsOfMeasure: 'm/s²' },
        Polar: { Value: 9.832, UnitsOfMeasure: 'm/s²' }
    },
    Radius: {
        Mean: {Value: 6371008.7714, UnitsOfMeasure: 'm'},
        Equatorial: { Value: 6378137, UnitsOfMeasure: 'm'},
        Polar: { Value: 6399593.6259, UnitsOfMeasure: 'm'},
        Maximum: { Value: 6384400, UnitsOfMeasure: 'm'},
        Minimum: { Value: 6352800, UnitsOfMeasure: 'm'},
    },
    Mass: {Value: 5.9724e24, UnitsOfMeasure: 'kg'},
    Density: { Value: 5514, UnitsOfMeasure: 'kg/m3' },
    LengthOfDay: { Value: 86400, UnitsOfMeasure: 's' }
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
        Standard: { Value: 1.6, UnitsOfMeasure: 'm/s²' }
    },
    Radius: {
        Equatorial: { Value: 3475000, UnitsOfMeasure: 'm' }
    },
    Mass: { Value: 0.0735e24, UnitsOfMeasure: 'kg' },
    Density: { Value: 3340, UnitsOfMeasure: 'kg/m3' },
    LengthOfDay: { Value: 2551320, UnitsOfMeasure: 's' },
    Orbit: {
         Apogee: { Value: 406000000, UnitsOfMeasure: 'm' },
           Mean: { Value: 384400000, UnitsOfMeasure: 'm' },
        Perigee: { Value: 363000000, UnitsOfMeasure: 'm' }        
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
        Standard: { Value: 3.72076, UnitsOfMeasure: 'm/s²' },
        Equatorial: { Value: 3.70703, UnitsOfMeasure: 'm/s²' }, // Ref10
        Polar: { Value: 3.73493, UnitsOfMeasure: 'm/s²' }, // Ref10
        Midlatitudes: { Value: 3.71683, UnitsOfMeasure: 'm/s²' } // Ref10
    },
    Radius: {
        Mean: { Value: 3389508, UnitsOfMeasure: 'm' }, // Ref11
        Equatorial: { Value: 3396200, UnitsOfMeasure: 'm' }, // Ref11
        Polar: { Value: 376200, UnitsOfMeasure: 'm' }, // Ref12
        Maximum: { Value: 3398627, UnitsOfMeasure: 'm' }, // Ref12
        Minimum: { Value: 3376200, UnitsOfMeasure: 'm' } // Ref12
    },
    LengthOfDay: { Value: 88920, UnitsOfMeasure: 's' } // Ref16
};
