var UserSession = (function() {
    var userName = "";
  
    var getUserName = function() {
      return userName;    // Or pull this from cookie/localStorage
    };
  
    var setUserName = function(name) {
      userName = name;     
      // Also set this in cookie/localStorage
    };
  
    return {
      getUserName: getUserName,
      setUserName: setUserName
    }
  
  })();
  
  export default UserSession;