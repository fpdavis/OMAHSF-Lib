class OMAHSF_Declarations {
    constructor() {
        // Speed of light in a vacuum
        this.c = {
            MetersPerSecond: 299792458,
            MilesPerSecond: 186282.397049
        };

        // Ref(13)
        this.GravitationalConstant = { 
            Parsecs_KilometersPerSecond_SolarMass: 0.00430091,
            Meters_Kilograms_Seconds: 0.0000000000667430,
            Dynes_Centimeters_Grams: 0.000000066743
        };
    }
}

//OMAHSF_Declarations.prototype.PlanetTemplate = {
//    Gravity: {
//        Units: 'Meters Per Second Squared',
//        Standard: ,
//        Equatorial: ,
//        Polar: 
//    },
//    Radius: {
//        Units: 'Meters',
//        Mean: ,
//        Equatorial: ,
//        Polar: ,
//        Maximum: ,
//        Minimum: 
//    }
//};

OMAHSF_Declarations.prototype.Earth = {
    Gravity: {
        Units: 'Meters Per Second Squared',
        Standard: 9.80665,
        Equatorial: 9.78033,
        Polar: 9.832
    },
    Radius: {
        Units: 'Meters',
        Mean: 6371008.7714,
        Equatorial: 6378137,
        Polar: 6399593.6259,
        Maximum: 6384400,
        Minimum: 6352800
    },
    Mass: 5.9724e24, // (kg)
    Density: 5514 // (kg/m3)
};

OMAHSF_Declarations.prototype.Mars = {
    Gravity: {
        Units: 'Meters Per Second Squared',
        Standard: 3.72076,
        Equatorial: 3.70703, // Ref10
        Polar: 3.73493, // Ref10
        Midlatitudes: 3.71683 // Ref10
    },
    Radius: {
        Units: 'Meters',
        Mean: 3389508, // Ref11
        Equatorial: 3396200, // Ref11
        Polar: 3376200, // Ref12
        Maximum: 3398627, // Ref12
        Minimum: 3376200 // Ref12
    }
};
