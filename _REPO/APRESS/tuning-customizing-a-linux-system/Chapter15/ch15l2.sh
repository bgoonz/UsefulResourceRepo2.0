#!/bin/sh

# Install this as /usr/local/java

# set the JAVA_HOME variable if it's not already
if [ "X$JAVA_HOME" == "X" ]; then
    export JAVA_HOME=/opt/java/jdk
fi

# The JDK's ${JAVA_HOME}/jre/lib at a minimum is required by -Djava.ext.dir
EXTDIR=${JAVA_HOME}/jre/lib@

# Add /opt/java/packages if there is one
if [ -d /opt/java/packages ]; then
    EXTDIR=/opt/java/packages@
fi

# Add ~/java/packages if there is one
if [ -d ${HOME}/java/packages ]; then
    EXTDIR=${EXTDIR}${HOME}/java/packages
fi

# this causes the "@" to become a " ", and then " " to become a ":"
# this is done to eliminate any spurious ":" at the end of the value
EXTDIR=`echo ${EXTDIR} | sed 's/@/ /g'`
EXTDIR=`echo ${EXTDIR} | sed 's/ /:/g'`

# finally, execute the real bin/java
exec ${JAVA_HOME}/bin/java -Djava.ext.dirs=${EXTDIR} $*
