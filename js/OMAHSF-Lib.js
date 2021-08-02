window.onload = function () {

    console.info("Message logging set to " + goVerbosityEnum.Lookup[giVerbosity]);
}

class OMAHSF {
    constructor() {
        this.Const = new OMAHSF_Declarations();
    }
}

OMAHSF.prototype.Acceleration = function (DeltaVelocity, DeltaTime)  {
    return DeltaVelocity / DeltaTime;
}

// First equation of motion
OMAHSF.prototype.FinalVelocity = function (InitialVelocity, Acceleration, Time) {
    return InitialVelocity + Acceleration * Time;
}

OMAHSF.prototype.AverageVelocity = function (DeltaPostion, DeltaTime) {
    return DeltaPostion / DeltaTime;
}

// Second equation of motion.
OMAHSF.prototype.FinalPosition = function (InitialPosition, InitalVelocity, Time, Acceleration) {

    return InitialPosition + InitalVelocity * Time + .5 * Acceleration * Time * Time;
}

OMAHSF.prototype.Displacement = function (InitalVelocity, Time, Acceleration) {

    return InitalVelocity * Time + .5 * Acceleration * Time * Time;
}

// Third equation of motion.
OMAHSF.prototype.Velocity = function (Acceleration, DeltaPosition, InitialVelocity) {

    return Math.sqrt(InitialVelocity * InitialVelocity + 2 * Acceleration * DeltaPosition);
}

OMAHSF.prototype.Velocity2 = function (Acceleration, InitialPosition, InitialVelocity, Position) {

    return Math.sqrt(InitialVelocity * InitialVelocity + 2 * Acceleration * (Position - InitialPosition));
}

OMAHSF.prototype.LorentzFactor = function (fpRatioOfVToC) {

    return 1 / Math.sqrt(1 - fpRatioOfVToC * fpRatioOfVToC);    
}

OMAHSF.prototype.RatioOfVToC = function (c, RelativeVelocity) {

    return (RelativeVelocity * RelativeVelocity) / (c * c);    
}

OMAHSF.prototype.LorentzFactor2 = function (c, RelativeVelocity) {

    return this.LorentzFactor(this.RatioOfVToC(c, RelativeVelocity));
}

OMAHSF.prototype.LorentzFactorReciprocal = function (fpRatioOfVToC) {
    return Math.sqrt(1 - fpRatioOfVToC * fpRatioOfVToC);
}

OMAHSF.prototype.RelativisticMass = function (LorentzFactor, RestMass) {
    return LorentzFactor * RestMass;
}

// This assumes a perfect sphere
OMAHSF.prototype.GravityAtHeight = function (GravityAtRadius, Height, Radius) {
    return GravityAtRadius * Math.pow((Radius / (Radius + Height)), 2);    
}