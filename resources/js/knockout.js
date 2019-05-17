/*jslint devel: true */

/*eslint no-console: "off", no-undef: "off" */

//Model

function User(fName,lName,email,gender,bDay){
    this.FName = fName;
    this.LName = lName;
    this.Email = email;
    this.Gender = gender;
    this.Birthday = bDay;
}



//VIEWMODEL

function AppViewModel(){
    //data
    this.firstName = ko.observable("");
    this.lastName = ko.observable("");
    this.email = ko.observable("");
    this.gender = ko.observable("");
    this.bday = ko.observable("");
    var isSaved = false;
    //behaviours
    this.fullName = ko.computed(function(){
        return this.firstName() + " " + this.lastName();
    }, this);
    
    this.nameLength =function(){
        return this.firstName().length;
    };
    
    this.lastNameLength =function(){
        return this.lastName().length;
    };
    
    this.emailLength =function(){
        return this.email().length;
    };
     
    this.genderC =function(){
        return trueSelection(this.gender());
    };
    
    this.bdayLength = function(){
        return bdayValidation(this.bday());
    };
    
    this.statusFName = ko.computed(function(){
        return inputAlphabet(this.firstName()) == false ? "invalid" : "valid";
    }, this);
    
    this.statusLName = ko.computed(function(){
        return inputAlphabet(this.lastName()) == false ? "invalid" : "valid";
    }, this);
    
    this.statusEmail = ko.computed(function(){
        return emailValidation(this.email()) == false ? "invalid" : "valid";
    }, this);
    
    this.statusGender = ko.computed(function(){
        return trueSelection(this.gender()) == false ? "invalid" : "valid";
    }, this);
    
    this.statusBday = ko.computed(function(){
        return bdayValidation(this.bday()) == false ? "invalid" : "valid";
    }, this);
    
    
    this.submitionButton = function () {    
        if (this.statusFName() == "valid" && this.statusLName() == "valid" && this.statusEmail() == "valid" && this.statusGender() == "valid" && this.statusBday() == "valid"){
            var inputs = new User(this.firstName(),this.lastName(),this.email(),this.gender(),this.bday());
            console.log(inputs);
            localStorage.setItem("formInputs",JSON.stringify(inputs));
            isSaved = true;
            
        }else{
            console.log("false");
        }
    };
    
    this.btnSeeData = function() {
        return isSaved;
    };
    
}






//Validation functions
var inputAlphabet = function(inputtext) {
    var alphaExp = /^[a-zA-Z]+$/;
    if (inputtext.match(alphaExp)) {
        return true;
    } else {
        return false;
    }
};

var emailValidation = function(inputtext) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputtext))
    {
       return (true)
    }
       return (false)
};

var trueSelection = function (inputtext) {
    if (inputtext == "chose") {
        return false;
    } else {
        return true;
    }
};

var bdayValidation = function (inputtext) {
    if (Date.parse(inputtext) > 0) {
        return true;
    } else {
        return false;
    }
};


ko.applyBindings(new AppViewModel());