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
  var includesValid = false;
  var passwordCharacter,generatedPassword;
  length = promptForLength();

  while (!includesValid) {
    includeLower = confirm("Would you like the password to contain lowercase letters?")
    includeUpper = confirm("Would you like the password to contain uppercase letters?")
    includeNumeric = confirm("Would you like the password to contain numbers?")
    includeSpecial = confirm("Would you like the password to contain special characters?")

    if (includeUpper === false && includeLower === false && includeNumeric === false && includeSpecial === false) {
      alert("Please select at least one character option to include in the password.");
    }
    else {
      includesValid = true;
    }
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

function promptForLength() {
  var passwordLength = -1;
  var done = false;

  while (!done) {
    passwordLength = prompt("How long should the password be? (8-128 characters)");
    passwordLength = parseInt(passwordLength);

    if (isNaN(passwordLength)) {
      alert("Invalid length. Please enter a value between 8 and 128.");
    }
    else if(passwordLength<8||passwordLength>128) {
      alert("Password length out of range. Please enter a value between 8 and 128.")
    }
    else {
      done = true;
    }
  } 
  return passwordLength;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
