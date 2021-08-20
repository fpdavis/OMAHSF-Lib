var oOMAHSF;
var oMethods;
var bShowSuccessfulTests;
var bStopOnError;
var aDeclarations = [];
var oHasfocus;
var iPrecision = 5;

function Initialize() {

	giVerbosity = goVerbosityEnum.Verbose;
	console.info("Message logging set to " + goVerbosityEnum.Lookup[giVerbosity]);

	oOMAHSF = new OMAHSF();
	LoadTestData();

	oMethods = oOMAHSF.getAllMethods();
	MessageLog(oMethods, oVerbosity = goVerbosityEnum.Information);

	let oSelectAlgorithm = document.getElementById("selectAlgorithm");
	for (oEachOne in oMethods) {
		oSelectAlgorithm.options[oSelectAlgorithm.options.length] = new Option(oMethods[oEachOne], oEachOne);
	}

	DisplayAlgorithmParamaters(document.getElementById("selectAlgorithm"));
	DisplayDeclarations();

	document.getElementById('txtPrecision').value = iPrecision;
}

function ShowHideConstants() {
	
	let sURL = window.location.pathname + (window.location.href.indexOf('#openPopup') === -1 ? "#openPopup" : "#close");
	window.location.replace(sURL);
};

function DisplayDeclarations() {

	oDivConstants = document.getElementById("divConstants");

	PropertiesToArray(oOMAHSF.Const, ""); // the second argument is what the root path should be (for convenience)
	
	let sDeclarations = "<table width='100%'>";
	for (let iIndex = 0; iIndex < aDeclarations.length - 1; iIndex += 2) {
		console.info(iIndex);
		let UnitsOfMeasurementElement = iIndex + 1;
		sDeclarations += `<tr onclick='PopulateInputField("${aDeclarations[iIndex][1]}", "${aDeclarations[UnitsOfMeasurementElement][1]}")'><td class='tdDeclaration'>` + aDeclarations[iIndex][0] + " = " + aDeclarations[iIndex][1] + " " + aDeclarations[UnitsOfMeasurementElement][1] + "</td></tr>";
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
				if (oNode === "Value" || oNode === "Units") { // Only looking for these nodes
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

	let iNumberOfTestsRun = 0;
	let iNumberOfFailedTests = 0;
	let Results;
	let sTest;
	let ExpectedResults;
	let bSuccess;

	iPrecision = document.getElementById('txtPrecision').value;

	let divUnitTests = document.getElementById('divUnitTests');
	divUnitTests.innerHTML = '';

	bShowSuccessfulTests = document.getElementById("chkShowSuccessfulTests").checked;
	bStopOnError = document.getElementById("chkStopOnError").checked;

	let oBenchmark = Benchmark("UnitTests");

	BeginTests();

	divUnitTests.innerHTML = "Tests Ran in " + oBenchmark.stop() + "<br/><br/>" + divUnitTests.innerHTML;
	
	DisplayFinalResults(oMethods);

	function WasSuccessfull(ExpectedResults, Results) {

		ExpectedResults = ExpectedResults.toPrecision(iPrecision);
		Results = Results.toPrecision(iPrecision);

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

		let sAlgorithm;
		let oParameterValues;
		let oParameterUnits;
		let ExpectedResults;

		for (let iLoop = 0; iLoop < TestData.length; iLoop++) {
			sAlgorithm = TestData[iLoop][0];
			oParameterValues = TestData[iLoop][1];
			ExpectedResults = TestData[iLoop][2];

			sTest = sAlgorithm + '(' + getParamNames(oOMAHSF[sAlgorithm]).toString().replace(/,/g, ', ') + ')<br/>';
			sTest += `Call: ${sAlgorithm}(` + oParameterValues.toString().replace(/,/g, ', ') + `)`;
			Results = oOMAHSF[sAlgorithm](...oParameterValues);
			bSuccess = WasSuccessfull(ExpectedResults, Results);
			DisplayTestResults(sTest, ExpectedResults, Results, bSuccess);
			if (!bSuccess && bStopOnError) { return; }
		}
	}
}
