var oOMAHSF;
var oMethods;
var bShowSuccessfulTests;
var bStopOnError;
var aDeclarations = [];
var oHasfocus;

function Initialize() {

	giVerbosity = goVerbosityEnum.Verbose;
	console.info("Message logging set to " + goVerbosityEnum.Lookup[giVerbosity]);

	oOMAHSF = new OMAHSF();

	oMethods = oOMAHSF.getAllMethods();
	MessageLog(oMethods, oVerbosity = goVerbosityEnum.Information);

	let oSelectAlgorithm = document.getElementById("selectAlgorithm");
	for (oEachOne in oMethods) {
		oSelectAlgorithm.options[oSelectAlgorithm.options.length] = new Option(oMethods[oEachOne], oEachOne);
	}

	DisplayAlgorithmParamaters(document.getElementById("selectAlgorithm"));
	DisplayDeclarations();
}

function ShowHideDiv(sDiv) {
	var oDiv = document.getElementById(sDiv);
	oDiv.style.display = oDiv.style.display !== 'none' ? 'none' : 'block';
};

function DisplayDeclarations() {

	oDivConstants = document.getElementById("divConstants");

	PropertiesToArray(oOMAHSF.Const, ""); // the second argument is what the root path should be (for convenience)
	
	let sDeclarations = "<table>";
	for (let iIndex = 0; iIndex < aDeclarations.length - 1; iIndex += 2) {
		console.info(iIndex);
		let UnitsOfMeasurementElement = iIndex + 1;
		sDeclarations += `<tr onclick='PopulateInputField("${aDeclarations[iIndex][1]}", "${aDeclarations[UnitsOfMeasurementElement][1]}")'><td>` + aDeclarations[iIndex][0] + " = " + aDeclarations[iIndex][1] + " " + aDeclarations[UnitsOfMeasurementElement][1] + "</td></tr>";
	}	

	oDivConstants.innerHTML = sDeclarations + "</table>";
}

function PopulateInputField(sValue, sUnitsOfMeasurement) {
	
	if (oHasfocus !== null && (typeof oHasfocus) === "object" && oHasfocus.type === "text") {
		oHasfocus.value = sValue;

		document.getElementById(oHasfocus.id.replace("DynamicParameter_", "UnitsOfMeasurement_")).innerHTML = ` (${sUnitsOfMeasurement})`;
	}
}
function PropertiesToArray(oObject, Path) {
	
	for (const oNode in oObject) {
		const Value = oObject[oNode];
		
		switch (typeof Value) {
			case "string":          // these are the specified cases for which a key will be added,
			case "number":          
			case "array":
				if (oNode === "Value" || oNode === "UnitsOfMeasure") { // Only looking for these nodes
					aDeclarations.push([Path + "." + oNode, Value]);  // add the complete path to the array					
				}
				break;
			case "object":	
				PropertiesToArray(Value, Path ? Path + "." + oNode : oNode);
				break;
		}
	}
};

function DisplayAlgorithmParamaters(oSelectAlgorithm) {

	let oDivParameters = document.getElementById("divParameters");
	oDivParameters.innerHTML = "";

	oParameters = getParamNames(oOMAHSF[oSelectAlgorithm.options[oSelectAlgorithm.selectedIndex].text]);
	
	for (iLoop = 0; iLoop < oParameters.length; iLoop++) {
		let oHTMLElement = document.createElement("Label");
		oHTMLElement.innerHTML = `<br/>${oParameters[iLoop].match(/[A-Z]+(?![a-z])|[A-Z]?[a-z]+|\d+/g).join(' ')}: `;
		oHTMLElement.for = "DynamicParameter_" + iLoop;
		oHTMLElement.className = "Parameter"; // set the CSS class
		oDivParameters.appendChild(oHTMLElement); // put it into the DOM

		oHTMLElement = document.createElement("input");
		oHTMLElement.id = "DynamicParameter_" + iLoop;
		oHTMLElement.type = "text";
		oHTMLElement.className = "Parameter"; // set the CSS class
		oHTMLElement.setAttribute("onfocus", "oHasfocus=this;");
		oDivParameters.appendChild(oHTMLElement); // put it into the DOM

		oHTMLElement = document.createElement("Label");
		oHTMLElement.id = "UnitsOfMeasurement_" + iLoop;
		oHTMLElement.for = "DynamicParameter_" + iLoop;
		oHTMLElement.className = "UnitsOfMeasurement"; // set the CSS class
		oDivParameters.appendChild(oHTMLElement); // put it into the DOM
	}
}

function getParamNames(func) {
	let STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
	let ARGUMENT_NAMES = /([^\s,]+)/g;

	let fnStr = func.toString().replace(STRIP_COMMENTS, '');
	let result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
	if (result === null)
		result = [];
	return result;
}

function RunIndividualTest() {

	let oSelectAlgorithm = document.getElementById("selectAlgorithm");
	let sAlgorithm = oSelectAlgorithm.options[oSelectAlgorithm.selectedIndex].text
	let oParameters = getParamNames(oOMAHSF[sAlgorithm]);
	let oParameterValues = [];

	for (iLoop = 0; iLoop < oParameters.length; iLoop++) {
		oParameterValues.push(document.getElementById("DynamicParameter_" + iLoop).value);
	}

	let Results = oOMAHSF[sAlgorithm](...oParameterValues);

	let oDivIndividualResults = document.getElementById("divIndividualResults");
	oDivIndividualResults.innerHTML = `Results: ${Results}`;
	

}

function RunUnitTests() {

	let iPrecision = 5;
	let iNumberOfTestsRun = 0;
	let iNumberOfFailedTests = 0;
	let Results;
	let sTest;
	let ExpectedResults;
	let bSuccess;
	
	let divUnitTests = document.getElementById('divUnitTests');
	divUnitTests.innerHTML = '';

	bShowSuccessfulTests = document.getElementById("chkShowSuccessfulTests").checked;
	bStopOnError = document.getElementById("chkStopOnError").checked;

	let oBenchmark = Benchmark("UnitTests");

	BeginTests();

	divUnitTests.innerHTML = "Tests Ran in " + oBenchmark.stop() + "<br/><br/>" + divUnitTests.innerHTML;
	
	DisplayFinalResults(oMethods);

	function WasSuccessfull(ExpectedResults, Results) {

		ExpectedResults = ExpectedResults.toPrecision(iPrecision)
		Results = Results.toPrecision(iPrecision)

		return(ExpectedResults === Results ? true : false);

	}

	function DisplayTestResults(sTest, ExpectedResults, Results, bSuccess) {

		iNumberOfTestsRun++;

		let oVerbosity = goVerbosityEnum.Information;

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

		return bSuccess;
	}	

	function DisplayFinalResults(oMethods) {

		let sMessage = "<div><br/>Number of Tests Run: " + iNumberOfTestsRun
			+ "<br/>Number of Tests Failed: " + iNumberOfFailedTests
			+ "<br/></div>"
			+ "<div>Algorithms: " + oMethods.toString().replace(/,/g, ', ')
			+ "<br/></div>";

		MessageLogHTML(sMessage, oVerbosity = goVerbosityEnum.Information);
		divUnitTests.innerHTML = sMessage + divUnitTests.innerHTML;
    }

	function BeginTests() {

		// GravitationalPotentialEnergy(Distance, GravitationalConstant, ObjectMass, WorldMass)
		// https://www.sparknotes.com/physics/gravitation/potential/problems/
		oAlgorithm = "GravitationalPotentialEnergy"
		sTest = oAlgorithm + '(' + getParamNames(oOMAHSF[oAlgorithm]).toString().replace(/,/g, ', ') + ')<br/>';
		sTest += `Call: GravitationalPotentialEnergy(${oOMAHSF.Const.Luna.Orbit.Mean.Value}, ${oOMAHSF.Const.GravitationalConstant.Value}, ${oOMAHSF.Const.Luna.Mass.Value}, ${oOMAHSF.Const.Earth.Mass.Value})`;
		ExpectedResults = -7.6218e28;
		Results = oOMAHSF.GravitationalPotentialEnergy(oOMAHSF.Const.Luna.Orbit.Mean.Value, oOMAHSF.Const.GravitationalConstant.Value, oOMAHSF.Const.Luna.Mass.Value, oOMAHSF.Const.Earth.Mass.Value);
		bSuccess = WasSuccessfull(ExpectedResults, Results);
		DisplayTestResults(sTest, ExpectedResults, Results, bSuccess);
		if (!bSuccess && bStopOnError) { return; }

		// GeosynchronousOrbit(GravitationalConstant, WorldMass, LengthOfDay)
		oAlgorithm = "GeosynchronousOrbit"
		sTest = oAlgorithm + '(' + getParamNames(oOMAHSF[oAlgorithm]).toString().replace(/,/g, ', ') + ')<br/>';
		sTest += `Call: GeosynchronousOrbit(GravitationalConstant, WorldMass, LengthOfDay)`;
		ExpectedResults = 35864;
		Results = oOMAHSF.GeosynchronousOrbit(oOMAHSF.Const.GravitationalConstant.Value, oOMAHSF.Const.Earth.Mass.Value, oOMAHSF.Const.Earth.LengthOfDay.Value);
		Results = (Results - oOMAHSF.Const.Earth.Radius.Equatorial.Value) / 1000;
		bSuccess = WasSuccessfull(ExpectedResults, Results);
		DisplayTestResults(sTest, ExpectedResults, Results, bSuccess);
		if (!bSuccess && bStopOnError) { return; }

		// MaximumVelocity(BreakingTension, Gravity, Length, Mass)
		// https://physicskublog.wordpress.com/tag/tension/
		sTest = `MaximumVelocity(BreakingTension, Gravity, Length, Mass)`;
		ExpectedResults = 8.1453;
		Results = oOMAHSF.MaximumVelocity(60, oOMAHSF.Const.Earth.Gravity.Standard.Value, .9, .8);
		bSuccess = WasSuccessfull(ExpectedResults, Results);
		DisplayTestResults(sTest, ExpectedResults, Results, bSuccess);
		if (!bSuccess && bStopOnError) { return; }

		// Acceleration_2(Force, Mass) 
		sTest = `Acceleration_2(Force, Mass)`;
		ExpectedResults = 0.50000;
		Results = oOMAHSF.Acceleration_2(500, 1000);
		bSuccess = WasSuccessfull(ExpectedResults, Results);
		DisplayTestResults(sTest, ExpectedResults, Results, bSuccess);
		if (!bSuccess && bStopOnError) { return; }

		// Tension(Acceleration, Gravity, Mass)
		sTest = `Tension(Acceleration, Gravity, Mass)`;
		ExpectedResults = -37.070;
		Results = oOMAHSF.Tension(-15, oOMAHSF.Const.Earth.Gravity.Standard.Value, 70);
		Results = oOMAHSF.NewtonsToKilograms(Results);
		bSuccess = WasSuccessfull(ExpectedResults, Results);
		DisplayTestResults(sTest, ExpectedResults, Results, bSuccess);
		if (!bSuccess && bStopOnError) { return; }

		// Newton's Second Law
		// Force(Acceleration, Mass)
		sTest = `Force(Acceleration, Mass)`;
		ExpectedResults = 200;
		Results = oOMAHSF.Force(10, 20);
		bSuccess = WasSuccessfull(ExpectedResults, Results);
		DisplayTestResults(sTest, ExpectedResults, Results, bSuccess);
		if (!bSuccess && bStopOnError) { return; }

		// CentripetalRadius(Acceleration, Velocity)
		sTest = `CentripetalRadius(5g, 1200 km/hour)`;
		ExpectedResults = 2.2660;
		Results = oOMAHSF.CentripetalRadius(5 * oOMAHSF.Const.Earth.Gravity.Standard.Value, 1200 * 1000 / 3600);
		Results /= 1000;
		bSuccess = WasSuccessfull(ExpectedResults, Results);
		DisplayTestResults(sTest, ExpectedResults, Results, bSuccess);
		if (!bSuccess && bStopOnError) { return; }

		// TimeForSingleRevolution(TargetGravity, Radius)
		sTest = `TimeForSingleRevolution(${oOMAHSF.Const.Earth.Gravity.Standard.Value}, 225)`;
		ExpectedResults = 30.096;
		Results = oOMAHSF.TimeForSingleRevolution(oOMAHSF.Const.Earth.Gravity.Standard.Value, 225);
		bSuccess = WasSuccessfull(ExpectedResults, Results);
		DisplayTestResults(sTest, ExpectedResults, Results, bSuccess);
		if (!bSuccess && bStopOnError) { return; }

		// CentripetalAcceleration(Radius, Velocity)
		sTest = `CentripetalAcceleration(100, 31.33)`;
		ExpectedResults = 9.8157;
		Results = oOMAHSF.CentripetalAcceleration(100, 31.33);
		bSuccess = WasSuccessfull(ExpectedResults, Results);
		DisplayTestResults(sTest, ExpectedResults, Results, bSuccess);
		if (!bSuccess && bStopOnError) { return; }

		sTest = `Const.Earth.Gravity.Standard.Value`;
		ExpectedResults = 9.80665;
		Results = oOMAHSF.Const.Earth.Gravity.Standard.Value;
		bSuccess = WasSuccessfull(ExpectedResults, Results);
		DisplayTestResults(sTest, ExpectedResults, Results, bSuccess);
		if (!bSuccess && bStopOnError) { return; }

		sTest = `Const.Earth.Mass.Value`;
		ExpectedResults = 5.9724e24;
		Results = oOMAHSF.Const.Earth.Mass.Value;
		bSuccess = WasSuccessfull(ExpectedResults, Results);
		DisplayTestResults(sTest, ExpectedResults, Results, bSuccess);
		if (!bSuccess && bStopOnError) { return; }

		sTest = `Const.Earth.Density.Value`;
		ExpectedResults = 5514;
		Results = oOMAHSF.Const.Earth.Density.Value;
		bSuccess = WasSuccessfull(ExpectedResults, Results);
		DisplayTestResults(sTest, ExpectedResults, Results, bSuccess);
		if (!bSuccess && bStopOnError) { return; }

		sTest = `Const.Earth.Radius.Mean.Value`;
		ExpectedResults = 6371008.7714;
		Results = oOMAHSF.Const.Earth.Radius.Mean.Value;
		bSuccess = WasSuccessfull(ExpectedResults, Results);
		DisplayTestResults(sTest, ExpectedResults, Results, bSuccess);
		if (!bSuccess && bStopOnError) { return; }

		// GravityAtSurfaceOfSphere(GravitationalConstant, MassOfSphere, Radius)
		sTest = `GravityAtSurfaceOfSphere(${oOMAHSF.Const.GravitationalConstant.Value}, ${oOMAHSF.Const.Earth.Mass.Value}, ${oOMAHSF.Const.Earth.Radius.Mean.Value})`;
		ExpectedResults = 9.8206;
		Results = oOMAHSF.GravityAtSurfaceOfSphere(oOMAHSF.Const.GravitationalConstant.Value, oOMAHSF.Const.Earth.Mass.Value, oOMAHSF.Const.Earth.Radius.Mean.Value);
		bSuccess = WasSuccessfull(ExpectedResults, Results);
		DisplayTestResults(sTest, ExpectedResults, Results, bSuccess);
		if (!bSuccess && bStopOnError) { return; }

		// GravityAtHeight(GravityAtRadius, Height, Radius)
		sTest = `GravityAtHeight(${oOMAHSF.Const.Earth.Gravity.Standard.Value}, 2000000, ${oOMAHSF.Const.Earth.Radius.Mean.Value})`;
		ExpectedResults = 5.680433599545086;
		Results = oOMAHSF.GravityAtHeight(oOMAHSF.Const.Earth.Gravity.Standard.Value, 2000000, 6371008.7714);
		bSuccess = WasSuccessfull(ExpectedResults, Results);
		DisplayTestResults(sTest, ExpectedResults, Results, bSuccess);
		if (!bSuccess && bStopOnError) { return; }

		// LorentzFactor2(c, RelativeVelocity)
		sTest = `LorentzFactor2(${oOMAHSF.Const.c.Value}, 134071263)`;
		ExpectedResults = 1.0206207261596576;
		Results = oOMAHSF.LorentzFactor2(oOMAHSF.Const.c.Value, 134071263);
		bSuccess = WasSuccessfull(ExpectedResults, Results);
		DisplayTestResults(sTest, ExpectedResults, Results, bSuccess);
		if (!bSuccess && bStopOnError) { return; }

		// Displacement(InitalVelocity, Time, Acceleration) 
		sTest = "Displacement(10, 10, 0)";
		ExpectedResults = 100;
		Results = oOMAHSF.Displacement(10, 10, 0);
		bSuccess = WasSuccessfull(ExpectedResults, Results);
		DisplayTestResults(sTest, ExpectedResults, Results, bSuccess);
		if (!bSuccess && bStopOnError) { return; }

		// Velocity(Acceleration, DeltaPosition, InitialVelocity) 
		sTest = "Velocity(0, 100, 10)";
		ExpectedResults = 10;
		Results = oOMAHSF.Velocity(0, 100, 10);
		bSuccess = WasSuccessfull(ExpectedResults, Results);
		DisplayTestResults(sTest, ExpectedResults, Results, bSuccess);
		if (!bSuccess && bStopOnError) { return; }

		// Velocity2(Acceleration, InitialPosition, InitialVelocity, Position) 
		sTest = "Velocity2(10, 0, 10, 100)";
		ExpectedResults = 45.8257569495584;
		Results = oOMAHSF.Velocity(10, 100, 10);
		bSuccess = WasSuccessfull(ExpectedResults, Results);
		DisplayTestResults(sTest, ExpectedResults, Results, bSuccess);
		if (!bSuccess && bStopOnError) { return; }

		// RatioOfVToC(c, RelativeVelocity)
		sTest = `RatioOfVToC(${oOMAHSF.Const.c.Value}, 134071263)`;
		ExpectedResults = 0.200;
		Results = oOMAHSF.RatioOfVToC(oOMAHSF.Const.c.Value, 134071263);
		bSuccess = WasSuccessfull(ExpectedResults, Results);
		DisplayTestResults(sTest, ExpectedResults, Results, bSuccess);
		if (!bSuccess && bStopOnError) { return; }

		// LorentzFactor(fpRatioOfVToC)
		sTest = "LorentzFactor(0.200)";
		ExpectedResults = 1.0206207261596576;
		Results = oOMAHSF.LorentzFactor(0.200);
		bSuccess = WasSuccessfull(ExpectedResults, Results);
		DisplayTestResults(sTest, ExpectedResults, Results, bSuccess);
		if (!bSuccess && bStopOnError) { return; }

		// LorentzFactorReciprocal(fpRatioOfVToC)
		sTest = "LorentzFactorReciprocal(0.200)";
		ExpectedResults = 0.97980;
		Results = oOMAHSF.LorentzFactorReciprocal(0.200);
		bSuccess = WasSuccessfull(ExpectedResults, Results);
		DisplayTestResults(sTest, ExpectedResults, Results, bSuccess);
		if (!bSuccess && bStopOnError) { return; }

		// RelativisticMass(LorentzFactor, RestMass)
		sTest = "RelativisticMass(100, 100)";
		ExpectedResults = 10000;
		Results = oOMAHSF.RelativisticMass(100, 100);
		bSuccess = WasSuccessfull(ExpectedResults, Results);
		DisplayTestResults(sTest, ExpectedResults, Results, bSuccess);
		if (!bSuccess && bStopOnError) { return; }

		// Acceleration(DeltaVelocity, DeltaTime)
		sTest = "Acceleration(10, 5)";
		ExpectedResults = 2;
		Results = oOMAHSF.Acceleration(10, 5);
		bSuccess = WasSuccessfull(ExpectedResults, Results);
		DisplayTestResults(sTest, ExpectedResults, Results, bSuccess);
		if (!bSuccess && bStopOnError) { return; }

		//  FinalVelocity(InitialVelocity, Acceleration, Time)
		sTest = "FinalVelocity(15, 10, 5)";
		ExpectedResults = 65;
		Results = oOMAHSF.FinalVelocity(15, 10, 5);
		bSuccess = WasSuccessfull(ExpectedResults, Results);
		DisplayTestResults(sTest, ExpectedResults, Results, bSuccess);
		if (!bSuccess && bStopOnError) { return; }

		// FinalPosition(InitialPosition, InitalVelocity, Time, Acceleration)
		sTest = "FinalPosition(0, 10, 10, 0)";
		ExpectedResults = 100;
		Results = oOMAHSF.FinalPosition(0, 10, 10, 0);
		bSuccess = WasSuccessfull(ExpectedResults, Results);
		DisplayTestResults(sTest, ExpectedResults, Results, bSuccess);
		if (!bSuccess && bStopOnError) { return; }

		// AverageVelocity(DeltaPostion, DeltaTime)
		sTest = "AverageVelocity(100, 10)";
		ExpectedResults = 10;
		Results = oOMAHSF.AverageVelocity(100, 10);
		bSuccess = WasSuccessfull(ExpectedResults, Results);
		DisplayTestResults(sTest, ExpectedResults, Results, bSuccess);
		if (!bSuccess && bStopOnError) { return; }
	}
}
