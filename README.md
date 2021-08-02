# OMAHSF-Lib (alpha)

Orbital Mechanics and Human Space Flight Library Package for Javascript/NodeJs 

### About

This library is still in alpha and the structure is still evolving.

OMAHSF-Lib is designed to be used in online real-time space simulation systems such as (but not used by) the SpaceX simulator which offers the same interface controls used by NASA Astronauts to manually pilot the SpaceX Dragon capsule and Solar System Scope which simulates the movements of celestial bodies through time. It includes algorithms heavily used in calculating trajectories for projectile motion, kinematic equations, and free-fall equations.

Although not explicitly designed for, it can also be used with Node.js and incorporated into applications that run server side, via command-line, or even as an Android application.

Projectile motion refers to the motion of an object that is imparted with an initial velocity but is subsequently subjected to no forces besides that of gravity. The path taken by a projectile is referred to as its trajectory.  The motion of such an object under the influence of gravity is determined completely by the acceleration of gravity, its launch speed, and launch angle provided air friction is negligible. The horizontal and vertical motions may be separated and described by the general motion equations for constant acceleration. In contrast to projectile motion, a free-falling object is an object that is accelerating under the sole influence of gravity.

Caution should be used when choosing equations that ignore the role of air resistance that creates a drag force opposing motion in real-life atmospheric situations. This factor is included in some of the higher-level algorithms. Functions that incorporate atmospheric drag or other external drag forces such as electromagnetism will be clearly documented.

The kinematic equations are a set of equations that can be utilized to predict unknown information about an object's motion if other information is known. The equations can be utilized for any motion that can be described as being either a constant velocity motion (no acceleration) or a constant acceleration motion. They can never be used over any time period during which the acceleration is changing. 

A lot of thought has been put into OMAHSF-Lib to make it easy to use, fast to implement, and efficient. Function parameters are simplified with a descriptive naming convention. Such a library interface may be off putting for die hard physics majors but for those with just a few physics classes under their belt or who have not picked up a physics book in some time, this can make utilizing the library relatively painless and quick to learn. It also means that utilizing the more advanced algorithms in the library do not take an excessive amount of time to gather the proper data for implementation. It is fast to implement because it does not use complex programming, data, or control structures and a simple set of design patterns. These patterns include a rudimentary command pattern with a chain of responsibility and first-class and higher-order functions based on functional programming concepts, a declarative programming paradigm. These choices were made to rouse fewer bugs through easier debuging, testing, and formal verification.  In this regard, unit tests are written for every library function along with a front end to run these tests.

### Requirements

* JavaScript is the language of the web. OMAHSF-Lib is supported in all major browsers and is extensively tested in Firefox.
* Node.js is a JavaScript runtime built on Chrome's V8 engine. It allows JavaScript to be run outside of a browser and incorporated into server side programming. With Node.js 
OMAHSF-Lib can even be incorporated into command-line tools. Node.js can be run on Windows, Linux, Android or Mac.

### Usage

You will need to include Declarations.js and OMAHSF-Lib.js in your project:

`<script type="text/javascript" src="js/Declarations.js" defer="defer"></script>`
`<script type="text/javascript" src="js/OMAHSF-Lib.js" defer="defer"></script>`

Define a new class of OMAHSF() such as:

`oOMAHSF = new OMAHSF();`

You will then be able to reference constants (Const) and methods within the new class:

`let myAverageVelocity = oOMAHSF.AverageVelocity(100, 10);`

### Disclaimer

It is best practice to build in redundancy into any simulator that may be relied upon for real world usage. It is recommended that a minimum of three libraries such as this one be
used and results of method calls be compared and verified between libraries. Each library should be built independantly of the others selected. OMAHSF-Lib has been written from
the ground up, though formulas have been borrowed from many non-code sources such as text books, physics course, and online sources such as Wikipedia. Methods will note the source of the
formulas used.

### Changes (oldest to newest):

* Constructed starting framework, initial functions, unit tests, basic front end, project goals and readme.

* Moved functions into their own class.
* Refactored constants to make them easily expandable and heartical.
* Created a Const class within the main class so declarations are defined automatically and available in the main object.
* Added Usage and Disclaimer section

### Creative Commons License Attribution 3.0 

* N/A

### References

* https://sciencing.com/calculate-trajectories-5213048.html
* http://hyperphysics.phy-astr.gsu.edu/hbase/traj.html
* https://en.wikipedia.org/wiki/Orbital_mechanics
* https://iss-sim.spacex.com/
* https://www.physicsclassroom.com/class/1DKin/Lesson-6/Kinematic-Equations-and-Free-Fall
* https://www.physicsclassroom.com/class/1dkin/Lesson-6/Kinematic-Equations
* https://www.solarsystemscope.com/
* https://physics.info/acceleration/
* https://en.wikipedia.org/wiki/Lorentz_factor