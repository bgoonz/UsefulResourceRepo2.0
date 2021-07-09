for i in $HOME/local/*; do
  [ -d $i/bin ] && PATH="${i}/bin:${PATH}"
  [ -d $i/sbin ] && PATH="${i}/sbin:${PATH}"
  [ -d $i/include ] && CPATH="${i}/include:${CPATH}"
  [ -d $i/lib ] && LD_LIBRARY_PATH="${i}/lib:${LD_LIBRARY_PATH}"
  [ -d $i/lib ] && LD_RUN_PATH="${i}/lib:${LD_RUN_PATH}"
# uncomment the following if you use macintosh
#  [ -d $i/lib ] && DYLD_LIBRARY_PATH="${i}/lib:${DYLD_LIBRARY_PATH}"
  [ -d $i/lib/pkgconfig ] && PKG_CONFIG_PATH="${i}/lib/pkgconfig:${PKG_CONFIG_PATH}"
  [ -d $i/share/man ] && MANPATH="${i}/share/man:${MANPATH}"
done


# This allows you to install programs into $HOME/local/someprogram
# for example, when I install node locally I install it like this:
#
#    ./configure --prefix=$HOME/local/node-v0.8.4
#    make
#    make install
#
# To uninstall a program, just rm -rf $HOME/local/someprogram
#