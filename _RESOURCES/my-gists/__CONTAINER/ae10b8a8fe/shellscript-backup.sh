#!/bin/sh
#
# A simple Arch Linux backup script.
#
# Example config that targets external mount, keeping backups for a week and
# mirror the backups to local and external disks:
#
#     $ cat /etc/backuprc
#     backup_target=/mnt/data01/myhost
#     backup_days_kept=7
#     mirror_source=/mnt/data01
#     mirror_target1=/mnt/data02
#     mirror_target2=user@remote:/mnt/data03
#
# Example cron configuration for three daily backups:
#
#     $ crontab -e
#     30 0,6,18 * * * /usr/local/bin/backup.sh > /dev/null 2>&1
#
# Example of how to restore a full system:
#
#  0. Don't panic
#  1. Install, boot and update base system
#  2. Set locale: vi /etc/locale.gen; locale-gen; localectl set-locale LANG=X
#  3. Reinstall packages: pacman -S $(cat pkg-X.txt)
#  4. Shutdown system and mount disk(s) locally
#  5. Restore files: tar -xzf fs-X.tar.gz -C /mnt/X
#  6. Check file permissions (home, webapps etc.)
#  7. Boot system
#  8. Finish MySQL install: mysql_install_db [...]; mysql_secure_installation
#  9. Restore database: mysql < db-X.sql
#
# Many ideas in this script comes from:
# https://wiki.archlinux.org/index.php/System_backup_and_reinstall
#
# This script is licensed under GNU General Public License v3:
# http://www.gnu.org/licenses/gpl.txt

# Default runtime config.
backup_source=~/.backup-list
backup_target=~/backups
backup_suffix=$(date +%s)
backup_days_kept=3
mirror_source=
mirror_target1=
mirror_target2=

# Include runtime config.
if [ -f ~/.backuprc ]; then
  source ~/.backuprc
elif [ -f /usr/local/etc/backuprc ]; then
  source /usr/local/etc/backuprc
elif [ -f /etc/backuprc ]; then
  source /etc/backuprc
fi

# Create a default backup source list.
if [ ! -f $backup_source ]; then
  printf "/etc/\n/home/\n/root/\n/srv/\n/usr/local/\n/usr/share/webapps/\n/var/log/\n" > $backup_source
fi
if [ ! -f $backup_source ]; then
  printf "Backup source list could not be created. Aborting."
  exit
fi

# Create the backup target directory.
if [ ! -d $backup_target ]; then
  mkdir -p $backup_target
  chmod 711 $backup_target
fi

# Backup package list, files and databases.
umask 277;
pacman -Qqe | grep -v "$(pacman -Qqm)" | gzip > $backup_target/pkg-$backup_suffix.txt.gz
tar --files-from=$backup_source -czpvf $backup_target/fs-$backup_suffix.tar.gz
if command -v mysqldump >/dev/null 2>&1; then
  mysqldump --all-databases | gzip > $backup_target/db-$backup_suffix.sql.gz
fi

# Remove old backups.
find $backup_target -mtime +$backup_days_kept -exec rm {} \;

# Mirror the backup.
if [ ! -z "$mirror_target1" ]; then
  rsync -azv --del $mirror_source $mirror_target1
fi
if [ ! -z "$mirror_target2" ]; then
  rsync -azv --del $mirror_source $mirror_target2
fi