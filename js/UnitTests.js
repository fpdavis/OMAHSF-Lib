function RunUnitTests() {

	var divUnitTests = document.getElementById('divUnitTests');
	var bShowSuccessfulTests = true;
	var iPrecision = 5;
	var iNumberOfTestsRun = 0;
	var iNumberOfFailedTests = 0;

	let Results;
	let sTest;
	let ExpectedResults;

	oBenchmark = Benchmark("UnitTests");

	// Acceleration(DeltaVelocity, DeltaTime)
	sTest = "Acceleration(10, 5)";
	ExpectedResults = 2;
	Results = Acceleration(10, 5);
	DisplayTestResults(sTest, ExpectedResults, Results)

	//  FinalVelocity(InitialVelocity, Acceleration, Time)
	sTest = "FinalVelocity(15, 10, 5)";
	ExpectedResults = 65;
	Results = FinalVelocity(15, 10, 5)
	DisplayTestResults(sTest, ExpectedResults, Results)

	// AverageVelocity(DeltaPostion, DeltaTime)
	sTest = "AverageVelocity(100, 10)";
	ExpectedResults = 10;
	Results = AverageVelocity(100, 10)
	DisplayTestResults(sTest, ExpectedResults, Results)

	// FinalPosition(InitialPosition, InitalVelocity, Time, Acceleration)
	sTest = "FinalPosition(0, 10, 10, 0)";
	ExpectedResults = 100;
	Results = FinalPosition(0, 10, 10, 0)
	DisplayTestResults(sTest, ExpectedResults, Results)

	// Displacement(InitalVelocity, Time, Acceleration) 
	sTest = "Displacement(10, 10, 0)";
	ExpectedResults = 100;
	Results = Displacement(10, 10, 0)
	DisplayTestResults(sTest, ExpectedResults, Results)

	// Velocity(Acceleration, DeltaPosition, InitialVelocity) 
	sTest = "Velocity(0, 100, 10)";
	ExpectedResults = 10;
	Results = Velocity(0, 100, 10)
	DisplayTestResults(sTest, ExpectedResults, Results)

	// Velocity2(Acceleration, InitialPosition, InitialVelocity, Position) 
	sTest = "Velocity(10, 0, 10, 100)";
	ExpectedResults = 45.8257569495584;
	Results = Velocity(10, 100, 10)
	DisplayTestResults(sTest, ExpectedResults, Results)

	// RatioOfVToC(c, RelativeVelocity)
	sTest = "RatioOfVToC(c_MetersSecond, 134071263)";
	ExpectedResults = 0.200;
	Results = RatioOfVToC(c_MetersSecond, 134071263)
	DisplayTestResults(sTest, ExpectedResults, Results)

	// LorentzFactor(fpRatioOfVToC)
	sTest = "LorentzFactor(0.200)";
	ExpectedResults = 1.0206207261596576;
	Results = LorentzFactor(0.200)
	DisplayTestResults(sTest, ExpectedResults, Results)

	// LorentzFactor2(c, RelativeVelocity)
	sTest = "LorentzFactor2(c_MetersSecond, 134071263)";
	ExpectedResults = 1.0206207261596576;
	Results = LorentzFactor2(c_MetersSecond, 134071263)
	DisplayTestResults(sTest, ExpectedResults, Results)

	// LorentzFactorReciprocal(fpRatioOfVToC)
	sTest = "LorentzFactorReciprocal(0.200)";
	ExpectedResults = 0.97980;
	Results = LorentzFactorReciprocal(0.200)
	DisplayTestResults(sTest, ExpectedResults, Results)

	// RelativisticMass(LorentzFactor, RestMass)
	sTest = "RelativisticMass(100, 100)";
	ExpectedResults = 10000;
	Results = RelativisticMass(100, 100)
	DisplayTestResults(sTest, ExpectedResults, Results)

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
