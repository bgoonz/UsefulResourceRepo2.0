#!/bin/sh

# set the JAVA_HOME to the default, unless it's already set
if [[ "X"${JAVA_HOME} == "X" ]]; then
    JAVA_HOME=/opt/java/jdk
fi

# add the JDK's bin directory to the PATH
PATH=${JAVA_HOME}/bin:${PATH}

# set the CLASSPATH; initialize to just "." (current working directory)
CLASSPATH=.
for jar in /opt/java/packages/*; do
    if [[ "${jar}" == "/opt/java/packages/*" ]]; then
        break;
    fi
    CLASSPATH=${CLASSPATH}:${jar}
done

# also add any JARs in the user's own java packages directory
if [ -d ${HOME}/java/packages ]; then
    for jar in ${HOME}/java/packages/*; do
        if [[ "${jar}" == "${HOME}/java/packages/*" ]]; then
            break;
        fi
        CLASSPATH=${CLASSPATH}:${jar}
    done
fi

export PATH JAVA_HOME CLASSPATH