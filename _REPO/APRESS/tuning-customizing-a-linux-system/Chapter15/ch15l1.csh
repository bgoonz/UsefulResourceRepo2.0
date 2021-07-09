#!/bin/csh

# set the JAVA_HOME to the default, unless it's already set
if ( ${?JAVA_HOME} == "0" ) then
    setenv JAVA_HOME /opt/java/jdk
endif

# add the JDK's bin directory to the PATH
set path = ( ${JAVA_HOME}/bin ${path} )

# set the CLASSPATH; initialize to just "." (current working directory)
setenv CLASSPATH .
foreach jar ( /opt/java/packages/* )
    if ( "${jar}" == "/opt/java/packages/*" ) then
        break;
    endif
    setenv CLASSPATH ${CLASSPATH}:${jar}
end

# also add any JARs in the user's own java packages directory
if ( -d ${HOME}/java/packages ) then
    foreach jar ( ${HOME}/java/packages/* )
        if ( "${jar}" == "${HOME}/java/packages/*" ) then
            break;
        endif

        setenv CLASSPATH ${CLASSPATH}:${jar}
    end
endif

# add JBuilder and ant to the PATH if they are installed
if ( -d /opt/java/jbuilder ) then
    set path = ( ${path} /opt/java/jbuilder/bin )
endif
if ( -d /opt/java/ant ) then
    set path = ( ${path} /opt/java/ant/bin )
endif
