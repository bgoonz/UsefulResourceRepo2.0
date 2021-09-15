#Truncate Filenames, keeping them unique
basenames()
{
  local d="${2}"
  for ((x=0; x<"${1}"; x++)); do
    d="${d%/*}"
  done
  echo "${2#"${d}"/}"
}
