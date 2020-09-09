var register = function(Handlebars) {
    var helpers = {
    inc: function(value, options) {
        return parseInt(value) + 1;
    },
    foo: function(var1, var2) {
        return 500;
    },
    eq: function(var1,var2){
        if(var1==var2)
        {
            return true;
        }else
        {
            return false;
        }
    }
};

if (Handlebars && typeof Handlebars.registerHelper === "function") {
    for (var prop in helpers) {
        Handlebars.registerHelper(prop, helpers[prop]);
    }
} else {
    return helpers;
}

};

module.exports.register = register;
module.exports.helpers = register(null);