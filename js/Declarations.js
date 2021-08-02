class OMAHSF_Declarations {
    constructor() {
        // Speed of light in a vacuum
        this.c = {
            MetersPerSecond: 299792458,
            MilesPerSecond: 186282.397049
        };
    }
}

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
    }
};
