var userSession = ( function(){
    var userName = '';
    var profile = '';

    var getProfile = function(){
        return profile;
    };

    var setProfile = function(profile){
        this.profile = profile;
    };

    var getUserName = function(){
        return userName;
    };
    var setUserName = function(name){
        userName = name;
    };

    return {
        getUserName: getUserName,
        setUserName: setUserName,
        getProfile: getProfile,
        setProfile: setProfile
    };
});

export  default userSession;