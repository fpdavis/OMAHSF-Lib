window.onload = function () {

    console.info("Message logging set to " + goVerbosityEnum.Lookup[giVerbosity]);
}

function Acceleration(DeltaVelocity, DeltaTime) {
    return DeltaVelocity / DeltaTime;
}

// First equation of motion
function FinalVelocity(InitialVelocity, Acceleration, Time) {
    return InitialVelocity + Acceleration * Time;
}

function AverageVelocity(DeltaPostion, DeltaTime) {
    return DeltaPostion / DeltaTime;
}

// Second equation of motion.
function FinalPosition(InitialPosition, InitalVelocity, Time, Acceleration) {

    return InitialPosition + InitalVelocity * Time + .5 * Acceleration * Time * Time;
}

function Displacement(InitalVelocity, Time, Acceleration) {

    return InitalVelocity * Time + .5 * Acceleration * Time * Time;
}

// Third equation of motion.
function Velocity(Acceleration, DeltaPosition, InitialVelocity) {

    return Math.sqrt(InitialVelocity * InitialVelocity + 2 * Acceleration * DeltaPosition);
}

function Velocity2(Acceleration, InitialPosition, InitialVelocity, Position) {

    return Math.sqrt(InitialVelocity * InitialVelocity + 2 * Acceleration * (Position - InitialPosition));
}

function LorentzFactor(fpRatioOfVToC) {

    return 1 / Math.sqrt(1 - fpRatioOfVToC * fpRatioOfVToC);    
}

function RatioOfVToC(c, RelativeVelocity) {

    return (RelativeVelocity * RelativeVelocity) / (c * c);    
}

function LorentzFactor2(c, RelativeVelocity) {

    return LorentzFactor(RatioOfVToC(c, RelativeVelocity));
}

function LorentzFactorReciprocal(fpRatioOfVToC) {
    return Math.sqrt(1 - fpRatioOfVToC * fpRatioOfVToC);
}

function RelativisticMass(LorentzFactor, RestMass) {
    return LorentzFactor * RestMass;
}