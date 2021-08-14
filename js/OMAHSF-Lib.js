
DynamicallyLoadScript('js/Declarations.js');

// https://stackoverflow.com/questions/950087/how-do-i-include-a-javascript-file-in-another-javascript-file
function DynamicallyLoadScript(url) {
    console.info(`Adding Script Request For: ${url}`);

    var script = document.createElement("script");  // create a script DOM node
    script.src = url;  // set its src to the provided URL

    document.head.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)

    console.info(`Script Request Added For: ${url}`);
}

class OMAHSF {
    constructor() {        
        this.Const = new OMAHSF_Declarations();
    }

    getAllMethods() {
        const Methods = [];

        let obj = Object.getPrototypeOf(this);
        Methods.push(...Object.getOwnPropertyNames(obj));

        return Methods.sort().filter((e, i, arr) => {
            if (e !== arr[i + 1] && typeof this[e] === 'function' && e !== 'constructor' && e !== 'getAllMethods') return true;
        });
}
}

OMAHSF.prototype.Acceleration = function (DeltaVelocity, DeltaTime)  {
    return DeltaVelocity / DeltaTime;
}

// First equation of motion
// Kinematic equation of uniformly accelerated motion
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

// Ref14
// An approximate value for gravity at a distance r from the center of the Earth
// can be obtained by assuming that the Earth's density is spherically symmetric.
// The gravity depends only on the mass inside the sphere of radius r.All the
// contributions from outside cancel out as a consequence of the inverse -
// square law of gravitation.Another consequence is that the gravity is the
// same as if all the mass were concentrated at the center. 
OMAHSF.prototype.GravityAtSurfaceOfSphere = function (GravitationalConstant, MassOfSphere, Radius) {
    return (GravitationalConstant * MassOfSphere) / (Radius * Radius);
}

OMAHSF.prototype.CentripetalAcceleration = function (Radius, Velocity) {
    return (Velocity * Velocity / Radius);
}

// Time for a single Revolution
OMAHSF.prototype.TimeForSingleRevolution = function (TargetGravity, Radius) {
    return (2 * Math.PI * Math.sqrt(Radius/TargetGravity));
}

OMAHSF.prototype.CentripetalRadius = function (Acceleration, Velocity) {
    return (Velocity * Velocity / Acceleration);
}

// Newton's Second Law
// Returns Newtons
OMAHSF.prototype.Force = function (Acceleration, Mass) {
    return (Mass * Acceleration);
}

OMAHSF.prototype.Acceleration_2 = function (Force, Mass) {
    return (Force / Mass);
}

OMAHSF.prototype.Tension = function (Acceleration, Gravity, Mass) {
    return (Mass * Acceleration + Mass * Gravity);
}

OMAHSF.prototype.Mass = function (Acceleration, Weight) {
    return (Weight / Acceleration);
}

OMAHSF.prototype.NewtonsToKilograms = function (ForceNewtons) {
    return (ForceNewtons / oOMAHSF.Const.Earth.Gravity.Standard.Value);
}

// Example: Ball whirling on the end of string subject to perpendicular gravity well
// Gravity - Gravitational Acceleration
// BreakingTension - Maximum tension in string before it breaks
// Length - String length
// Mass - Mass of the ball
// MaximumVelocity - Speed of the ball before string breaks
OMAHSF.prototype.MaximumVelocity = function (BreakingTension, Gravity, Length, Mass) {
    return (Math.sqrt((Length * (BreakingTension * BreakingTension - Mass * Mass * Gravity * Gravity)) / (Mass * BreakingTension)));
}

// Must keep units in mind.
// Results are from center of world
OMAHSF.prototype.GeosynchronousOrbit = function (GravitationalConstant, WorldMass, LengthOfDay) {
    return (Math.cbrt((GravitationalConstant * WorldMass * LengthOfDay * LengthOfDay) / (4 * Math.PI * Math.PI)));
}

// Returns Joules
OMAHSF.prototype.GravitationalPotentialEnergy = function (Distance, GravitationalConstant, ObjectMass, WorldMass) {
    return (-(GravitationalConstant * WorldMass * ObjectMass / Distance));
}




console.info(`OMAHSF-Lib.js loaded succesfully.`);