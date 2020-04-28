// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

function generatePassword() {
  var length,includeLower,includeUpper,includeNumeric,includeSpecial;

  length = document.querySelector("#inputPasswordLength").value;
  includeLower = document.querySelector("#checkIncludeLower").checked;
  includeUpper = document.querySelector("#checkIncludeUpper").checked;
  includeNumeric = document.querySelector("#checkIncludeNumeric").checked;
  includeSpecial = document.querySelector("#checkIncludeSpecial").checked;

  if (includeLower === false && includeUpper === false && includeNumeric === false && includeSpecial === false) {
    document.querySelector("#error").textContent = "Must include at least one option for characters";
    return "";
  }
  else {
    document.querySelector("#error").textContent ="";
  }

  return generatePasswordInner(length,includeLower,includeUpper,includeNumeric,includeSpecial)

}

function randomInt(min,max) {
  var range = max+1 - min;
  return Math.floor(Math.random() * range) + min;
}

function sumIncludes(includeLower,includeUpper,includeNumeric,includeSpecial) {
  var sum = 0;
  if (includeLower === true) {
    sum++;
  }
  if (includeUpper === true) {
    sum++;
  }
  if (includeNumeric === true) {
    sum++;
  }
  if (includeSpecial === true) {
    sum++;
  }
  return sum;
}

function generatePasswordInner(passwordLength,includeLower,includeUpper,includeNumeric,includeSpecial) {
  var passwordIndex;
  var passwordString = "";
  var characterType;
  var functionIndices = 1;
  var functionMap = [];

  // map function indices
  if (includeLower === true) {
    functionMap[functionIndices++] = generateLower;
  }
  if (includeUpper === true) {
    functionMap[functionIndices++] = generateUpper;
  }
  if (includeNumeric === true) {
    functionMap[functionIndices++] = generateNumeric;
  }
  if (includeSpecial === true) {
    functionMap[functionIndices++] = generateSpecial;
  }

  for (passwordIndex = 0; passwordIndex < passwordLength; passwordIndex++) {
    characterType = randomInt(1,sumIncludes(includeLower,includeUpper,includeNumeric,includeSpecial));
    passwordString += functionMap[characterType]();
  }
  return passwordString;
}

function generateLower() {
  return String.fromCharCode(randomInt(97,122));
}

function generateUpper() {
  return String.fromCharCode(randomInt(65,90));
}

function generateNumeric() {
  return String.fromCharCode(randomInt(48,57));
}

function generateSpecial() {
  var character;
  var subSpecial = randomInt(1,4);
  switch(subSpecial) {
    case 1:
      character = String.fromCharCode(randomInt(32,47))
      break;
    case 2:
      character = String.fromCharCode(randomInt(58,64))
      break;
    case 3:
      character = String.fromCharCode(randomInt(91,96))
      break;
    case 4: 
      character = String.fromCharCode(randomInt(123,126))
      break;
  }
  return character;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
