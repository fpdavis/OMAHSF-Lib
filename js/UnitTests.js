function RunUnitTests() {

	var divUnitTests = document.getElementById('divUnitTests');
	var bShowSuccessfulTests = true;
	var iPrecision = 5;
	var iNumberOfTestsRun = 0;
	var iNumberOfFailedTests = 0;

	let Results;
	let sTest;
	let ExpectedResults;

	giVerbosity = goVerbosityEnum.Verbose;

	divUnitTests.innerHTML = '';

	oBenchmark = Benchmark("UnitTests");
	oOMAHSF = new OMAHSF();

	// GravitationalPotentialEnergy(Distance, GravitationalConstant, ObjectMass, WorldMass)
	// https://www.sparknotes.com/physics/gravitation/potential/problems/
	sTest = `GravitationalPotentialEnergy(${oOMAHSF.Const.Luna.Orbit.Mean.Value}, ${oOMAHSF.Const.GravitationalConstant.Value}, ${oOMAHSF.Const.Luna.Mass.Value}, ${oOMAHSF.Const.Earth.Mass.Value})`;
	ExpectedResults = -7.6218e28;
	Results = oOMAHSF.GravitationalPotentialEnergy(oOMAHSF.Const.Luna.Orbit.Mean.Value, oOMAHSF.Const.GravitationalConstant.Value, oOMAHSF.Const.Luna.Mass.Value, oOMAHSF.Const.Earth.Mass.Value);
	DisplayTestResults(sTest, ExpectedResults, Results);

	// GeosynchronousOrbit(GravitationalConstant, WorldMass, LengthOfDay)
	sTest = `GeosynchronousOrbit(GravitationalConstant, WorldMass, LengthOfDay)`;
	ExpectedResults = 35864;
	Results = oOMAHSF.GeosynchronousOrbit(oOMAHSF.Const.GravitationalConstant.Value, oOMAHSF.Const.Earth.Mass.Value, oOMAHSF.Const.Earth.LengthOfDay.Value);
	DisplayTestResults(sTest, ExpectedResults, (Results - oOMAHSF.Const.Earth.Radius.Equatorial.Value) / 1000);

	// MaximumVelocity(BreakingTension, Gravity, Length, Mass)
	// https://physicskublog.wordpress.com/tag/tension/
	sTest = `MaximumVelocity(BreakingTension, Gravity, Length, Mass)`;
	ExpectedResults = 8.1453;
	Results = oOMAHSF.MaximumVelocity(60, oOMAHSF.Const.Earth.Gravity.Standard.Value, .9, .8);
	DisplayTestResults(sTest, ExpectedResults, Results);

	// Acceleration_2(Force, Mass) 
	sTest = `Acceleration_2(Force, Mass)`;
	ExpectedResults = 0.50000;
	Results = oOMAHSF.Acceleration_2(500, 1000);
	DisplayTestResults(sTest, ExpectedResults, Results);

	// Tension(Acceleration, Gravity, Mass)
	sTest = `Tension(Acceleration, Gravity, Mass)`;
	ExpectedResults = -37.070;
	Results = oOMAHSF.Tension(-15, oOMAHSF.Const.Earth.Gravity.Standard.Value, 70);
	Results = oOMAHSF.NewtonsToKilograms(Results);
	DisplayTestResults(sTest, ExpectedResults, Results);

	// Newton's Second Law
	// Force(Acceleration, Mass)
	sTest = `Force(Acceleration, Mass)`;
	ExpectedResults = 200;
	Results = oOMAHSF.Force(10, 20);
	DisplayTestResults(sTest, ExpectedResults, Results);

	// CentripetalRadius(Acceleration, Velocity)
	sTest = `CentripetalRadius(5g, 1200 km/hour)`;
	ExpectedResults = 2.2660;
	Results = oOMAHSF.CentripetalRadius(5 * oOMAHSF.Const.Earth.Gravity.Standard.Value, 1200 * 1000 / 3600);
	DisplayTestResults(sTest, ExpectedResults, Results / 1000);

	// TimeForSingleRevolution(TargetGravity, Radius)
	sTest = `TimeForSingleRevolution(${oOMAHSF.Const.Earth.Gravity.Standard.Value}, 225)`;
	ExpectedResults = 30.096;
	Results = oOMAHSF.TimeForSingleRevolution(oOMAHSF.Const.Earth.Gravity.Standard.Value, 225);
	DisplayTestResults(sTest, ExpectedResults, Results);
	
	// CentripetalAcceleration(Radius, Velocity)
	sTest = `CentripetalAcceleration(100, 31.33)`;
	ExpectedResults = 9.8157;
	Results = oOMAHSF.CentripetalAcceleration(100, 31.33);
	DisplayTestResults(sTest, ExpectedResults, Results);

	sTest = `Const.Earth.Gravity.Standard.Value`;
	DisplayTestResults(sTest, 9.80665, oOMAHSF.Const.Earth.Gravity.Standard.Value);

	sTest = `Const.Earth.Mass.Value`;
	DisplayTestResults(sTest, 5.9724e24, oOMAHSF.Const.Earth.Mass.Value);

	sTest = `Const.Earth.Density.Value`;
	DisplayTestResults(sTest, 5514, oOMAHSF.Const.Earth.Density.Value);

	sTest = `Const.Earth.Radius.Mean.Value`;
	DisplayTestResults(sTest, 6371008.7714, oOMAHSF.Const.Earth.Radius.Mean.Value);

	// GravityAtSurfaceOfSphere(GravitationalConstant, MassOfSphere, Radius)
	sTest = `GravityAtSurfaceOfSphere(${oOMAHSF.Const.GravitationalConstant.Value}, ${oOMAHSF.Const.Earth.Mass.Value}, ${oOMAHSF.Const.Earth.Radius.Mean.Value})`;
	ExpectedResults = 9.8206;
	Results = oOMAHSF.GravityAtSurfaceOfSphere(oOMAHSF.Const.GravitationalConstant.Value, oOMAHSF.Const.Earth.Mass.Value, oOMAHSF.Const.Earth.Radius.Mean.Value);
	DisplayTestResults(sTest, ExpectedResults, Results);

	// GravityAtHeight(GravityAtRadius, Height, Radius)
	sTest = `GravityAtHeight(${oOMAHSF.Const.Earth.Gravity.Standard.Value}, 2000000, ${oOMAHSF.Const.Earth.Radius.Mean.Value})`;
	ExpectedResults = 5.680433599545086;
	Results = oOMAHSF.GravityAtHeight(oOMAHSF.Const.Earth.Gravity.Standard.Value, 2000000, 6371008.7714);
	DisplayTestResults(sTest, ExpectedResults, Results);

	// LorentzFactor2(c, RelativeVelocity)
	sTest = `LorentzFactor2(${oOMAHSF.Const.c.Value}, 134071263)`;
	ExpectedResults = 1.0206207261596576;
	Results = oOMAHSF.LorentzFactor2(oOMAHSF.Const.c.Value, 134071263);
	DisplayTestResults(sTest, ExpectedResults, Results);

	// Displacement(InitalVelocity, Time, Acceleration) 
	sTest = "Displacement(10, 10, 0)";
	ExpectedResults = 100;
	Results = oOMAHSF.Displacement(10, 10, 0);
	DisplayTestResults(sTest, ExpectedResults, Results);

	// Velocity(Acceleration, DeltaPosition, InitialVelocity) 
	sTest = "Velocity(0, 100, 10)";
	ExpectedResults = 10;
	Results = oOMAHSF.Velocity(0, 100, 10);
	DisplayTestResults(sTest, ExpectedResults, Results);

	// Velocity2(Acceleration, InitialPosition, InitialVelocity, Position) 
	sTest = "Velocity(10, 0, 10, 100)";
	ExpectedResults = 45.8257569495584;
	Results = oOMAHSF.Velocity(10, 100, 10);
	DisplayTestResults(sTest, ExpectedResults, Results);

	// RatioOfVToC(c, RelativeVelocity)
	sTest = `RatioOfVToC(${oOMAHSF.Const.c.Value}, 134071263)`;
	ExpectedResults = 0.200;
	Results = oOMAHSF.RatioOfVToC(oOMAHSF.Const.c.Value, 134071263);
	DisplayTestResults(sTest, ExpectedResults, Results);

	// LorentzFactor(fpRatioOfVToC)
	sTest = "LorentzFactor(0.200)";
	ExpectedResults = 1.0206207261596576;
	Results = oOMAHSF.LorentzFactor(0.200);
	DisplayTestResults(sTest, ExpectedResults, Results);

	// LorentzFactorReciprocal(fpRatioOfVToC)
	sTest = "LorentzFactorReciprocal(0.200)";
	ExpectedResults = 0.97980;
	Results = oOMAHSF.LorentzFactorReciprocal(0.200);
	DisplayTestResults(sTest, ExpectedResults, Results);

	// RelativisticMass(LorentzFactor, RestMass)
	sTest = "RelativisticMass(100, 100)";
	ExpectedResults = 10000;
	Results = oOMAHSF.RelativisticMass(100, 100);
	DisplayTestResults(sTest, ExpectedResults, Results);

	// Acceleration(DeltaVelocity, DeltaTime)
	sTest = "Acceleration(10, 5)";
	ExpectedResults = 2;
	Results = oOMAHSF.Acceleration(10, 5);
	DisplayTestResults(sTest, ExpectedResults, Results);

	//  FinalVelocity(InitialVelocity, Acceleration, Time)
	sTest = "FinalVelocity(15, 10, 5)";
	ExpectedResults = 65;
	Results = oOMAHSF.FinalVelocity(15, 10, 5);
	DisplayTestResults(sTest, ExpectedResults, Results);

	// FinalPosition(InitialPosition, InitalVelocity, Time, Acceleration)
	sTest = "FinalPosition(0, 10, 10, 0)";
	ExpectedResults = 100;
	Results = oOMAHSF.FinalPosition(0, 10, 10, 0);
	DisplayTestResults(sTest, ExpectedResults, Results);

	// AverageVelocity(DeltaPostion, DeltaTime)
	sTest = "AverageVelocity(100, 10)";
	ExpectedResults = 10;
	Results = oOMAHSF.AverageVelocity(100, 10);
	DisplayTestResults(sTest, ExpectedResults, Results);

	divUnitTests.innerHTML = "Tests Ran in " + oBenchmark.stop() + "<br/><br/>" + divUnitTests.innerHTML;
	
	DisplayFinalResults();

	function DisplayTestResults(sTest, ExpectedResults, Results) {

		iNumberOfTestsRun++;

		ExpectedResults = ExpectedResults.toPrecision(iPrecision) 
		Results = Results.toPrecision(iPrecision) 

		let bSuccess = ExpectedResults === Results ? true : false;
		let oVerbosity = bSuccess;

		if (!bSuccess) {
			iNumberOfFailedTests++;
			oVerbosity = goVerbosityEnum.Error;		
		}
		else if (!bShowSuccessfulTests) { return }

		let sMessage = `<div class="Success-${bSuccess}">`
			         + `<br/>Test(${iNumberOfTestsRun}): ` + sTest
			         + "<br/>Expected Results: " + ExpectedResults
			         + "<br/>Actual Results: " + Results
			         + "<br/>Success: " + bSuccess
			         + "<br/></div>";	

		divUnitTests.innerHTML += sMessage;

		sMessage = "\n            Test: " + sTest
			     + "\nExpected Results: " + ExpectedResults
			     + "\n  Actual Results: " + Results
			     + "\n         Success: " + bSuccess;

		MessageLog(sMessage, oVerbosity);		
	}	

	function DisplayFinalResults() {

		let sMessage = "<div><br/>Number of Tests Run: " + iNumberOfTestsRun
			         + "<br/>Number of Tests Failed: " + iNumberOfFailedTests			
			         + "<br/></div>";	

		MessageLogHTML(sMessage, oVerbosity = goVerbosityEnum.Information);
		divUnitTests.innerHTML = sMessage + divUnitTests.innerHTML;
    }
}
