import subprocess
import logging
import shutil
import os
import stat
import errno
import platform
from sys import exit


class Backup:

    def __init__(self, src, dst, rsync_location=None, logfile=None, max_backups=5):
        """
        Wrapper object representing an rsync time-machine like backup using the rsync
        link-dest option. Keeps n number of differential backups.
        Inputs:
            src: source folder to be backed up.
            dst: destination of the backup.
            rsync_location: if running Windows, the location of the cygwin
                rsync.exe binary.
            logfile: location for logfile. If left blank, will print to log.txt
                in the same location as this script.
            max_backups: number of backups to keep. Defaults to 5.
        """

        # Get host OS type
        self.os_type = platform.system()

        #Source and target
        self.src = src
        self.dst = dst

        # Set the rsync location
        if self.os_type == "Windows":
            # Windows, must have location of cygwin rsync.exe binary
            if rsync_location is None:
                print "Running on Windows OS. Must provide location of rsync binary (cygwin)"
                logging.error(
                    "Running on Windows OS. Must provide location of rsync binary (cygwin)")
                exit()
            else:
                self.rsync_location = rsync_location
        else:
            # Running Linux, can just call from command line
            self.rsync_location = 'rsync'

        # Set logfile location, else use current directory
        if logfile is None:
            self.logfile = os.path.join(os.path.abspath(__file__), 'log.txt')
        else:
            self.logfile = logfile

        # Set max number of backups to keep
        try:
            int(max_backups)
            self.max_backups = max_backups
        except ValueError:
            print "Invalid value for maximum number of backups. Exiting."
            logging.error(
                "Invalid value for maximum number of backups. Exiting.")
            exit()

        # Setup logging
        logging.basicConfig(filename=self.logfile, level=logging.DEBUG,
                            format='%(asctime)s %(levelname)s: %(message)s')

    def _cygwin_format(self, dir):
        """Format a windows directory to format usable by cygwin."""
        split_dict = dir.split(':\\')
        drive = split_dict[0].lower()
        path = split_dict[1].replace('\\', '/')
        cygwin_path = '/cygdrive/' + drive + '/' + path
        return cygwin_path

    def _remove_readonly(self, func, path, exc):
        # Function shamelessly stolen from StackOverflow
        """Error function for shutil.rmtree. Will chmod 777 the offending file and then try again."""
        excvalue = exc[1]
        if func in (os.rmdir, os.remove) and excvalue.errno == errno.EACCES:
            os.chmod(path, stat.S_IRWXU | stat.S_IRWXG | stat.S_IRWXO)  # 0777
            func(path)
        else:
            raise

    def _move_old_backups(self):
        """Move old backups back by one. Must pass fully qualified path as dst."""
        print "Moving old backups...",
        logging.info("Moving old backups...",)
        for backup_num in range(self.max_backups - 1, -1, -1):
            old_filename = os.path.join(self.dst, "backup.%s" % backup_num)
            new_filename = os.path.join(
                self.dst, "backup.%s" % (backup_num + 1))
            # Make sure it exists--could be first time running
            if os.path.isdir(old_filename):
                logging.info("Moving backup %s to %s..." % (old_filename,
                                                            new_filename)),
                try:
                    shutil.move(old_filename, new_filename)
                    logging.info("Done.")
                except IOError, e:
                    print "Unable to move backup %s to %s: %s" % (old_filename,
                                                                  new_filename, e)
                    logging.error("Unable to move backup %s to %s: %s" % (old_filename,
                                                                          new_filename, e))
            else:
                continue
        print "Done."
        logging.info("Done.")

    def _delete_oldest_backup(self):
        """Delete the oldest backup"""
        oldest_backup = os.path.join(self.dst, "backup.%s" % self.max_backups)
        if os.path.isdir(oldest_backup):
            try:
                os.chmod(oldest_backup, stat.S_IRWXG |
                         stat.S_IRWXU | stat.S_IRWXO)
                #os.system('attrib -R %s' % os.path.join(dst, "backup.%s" % ((max_backups - 1))))
                #os.remove(os.path.join(dst, "backup.%s" % ((max_backups - 1))))
                shutil.rmtree(oldest_backup, ignore_errors=False,
                              onerror=self._remove_readonly)
                logging.info("Removed oldest backup %s" % oldest_backup)
            except OSError, e:
                print "Unable to delete oldest backup: %s" % e
                logging.error("Unable to delete oldest backup: %s" % e)
        else:
            print "Oldest backup %s does not exist. Skipping." % oldest_backup
            logging.warn(
                "Oldest backup %s does not exist. Skipping." % oldest_backup)

    def _cleanup(self):
        """Rename the just-completed backup to conform to naming convention"""
        # Rename the now completed backup
        # The name of the incomplete backup
        incomp_back_str = '%s/incomp-backup.0' % (self.dst)
        # The name of the complete backup
        comp_back_str = '%s/backup.0' % (self.dst)
        try:
            #shutil.move(incomp_back_str, comp_back_str)
            os.rename(incomp_back_str, comp_back_str)
        except OSError, e:
            print "Unable to move backup %s to %s: %s" % (incomp_back_str,
                                                          comp_back_str, e)
            logging.error("Unable to move backup %s to %s: %s" % (incomp_back_str,
                                                                  comp_back_str, e))

    def do_backup(self):
        """Rsync a single directory (src) to backup location (dst)"""
        # Do the backup
        if self.os_type == "Windows":
            link_dest_string = '--link-dest="%s/backup.0" "%s" "%s/incomp-backup.0"' % (
                self._cygwin_format(self.dst), self._cygwin_format(self.src),
                self._cygwin_format(self.dst))
        else:
            link_dest_string = '--link-dest="%s/backup.0" "%s" "%s/incomp-backup.0"' % (
                self.dst, self.src, self.dst)
        rsync = subprocess.Popen('%s -azP --delete %s' % (self.rsync_location,
                                                          link_dest_string), stdout=subprocess.PIPE, shell=True).communicate()[0]
        logging.info("rsync complete.")

        # Move the old backups
        self._move_old_backups()

        # Rename most recent backup
        self._cleanup()

        # Delete the oldest backup--do after everything else completed so as not
        # to destroy data!
        self._delete_oldest_backup()


if __name__ == "__main__":

    ##############################
    #   CONFIG
    ##############################
    # Location to use for logfile
    logfile = r'C:\Users\aravenel\code\testing\backup\log.txt'
    # Command to call rsync
    rsync_location = r'C:\cygwin\bin\rsync.exe'
    # Number of backups to keep
    max_backups = 5
    # Dictionary of backup locations--source folder as key, destination folder as value
    dirs = {
        r'C:\Users\aravenel\Pictures': {
            'dst': r'C:\Users\aravenel\code\testing\backup',
            'max_backups': 5,
        }
        # r'/cygdrive/c/Users/ravenel/Documents/EA Games': r'/cygdrive/c/Users/ravenel/Documents/test',
        # r'C:\Users\ravenel\Documents\EA Games': r'C:\Users\ravenel\Documents\test',
        # r'C:\Users\ravenel\Documents\EA Games': r'Y:\backups\test',
    }

    for src, options in dirs.items():
        print "Backing up %s to %s..." % (src, options['dst'])
        backup = Backup(src, options['dst'], rsync_location, logfile,
                        options['max_backups'])
        backup.do_backup()
        print "Done backing up."
