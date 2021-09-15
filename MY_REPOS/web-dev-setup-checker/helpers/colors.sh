NO_FORMAT="\033[0m"
C_GREEN="\033[1;92m"
C_CYAN="\033[1;96m"
C_RED="\033[1;91m"
F_BOLD="\033[1m"
C_WHITE="\033[1:97m"
C_YELLOW="\033[1;33m"

hr() {
  s=$(printf "%-80s" "")
  f_bold "${s// /―}"
}

title() {
  c_cyan "${@}"
}

c_cyan() {
  printf "${C_CYAN}${@}${NO_FORMAT}\n"
}

c_red() {
  printf "${C_RED}${@}${NO_FORMAT}\n"
  return
}

c_yellow() {
  printf "${C_YELLOW}${@}${NO_FORMAT}\n"
  return
}

c_green() {
  printf "${C_GREEN}${@}${NO_FORMAT}\n"
  return
}

f_bold() {
  printf "${F_BOLD}${C_WHITE}${@}${NO_FORMAT}\n"
  return
}
