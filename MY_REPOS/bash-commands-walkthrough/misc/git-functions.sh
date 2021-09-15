JUST_DEFAULTIFY_FUNCTIONS+=(git_defaultify)
JUST_HELP_FILES+=("${BASH_SOURCE[0]}")

#****just/just_git_functions*
# DESCRIPTION
#   git plugin for just

#***

#****f* just_git_functions/submodule-helper-list
# NAME
#   submodule-helper-list - "git submodule--helper list" bash port
# DESCRIPTION
#   Reproduces what git submodule--helper list does. Not all versions of git
#   are modern enough to have this feature. Currently, the first three columns
#   of information and --prefix are not reproduced because they are not needed.
# INPUTS
#   [$1...] - Glob expressions to be matched, just like git-submodule--helper
# OUTPUT
#   submodule_names - array of submodules names (matched if filters supplied)
#   submodule_paths - corresponding array of submodule paths

#***
function submodule-helper-list()
{
  # Get submodule data
  local submodule_data="$(git config -l -f .gitmodules | sed -nE 's|^submodule.(.*).path=(.*)|\1'$'\t''\2|p')"
  local IFS=$'\n'
  # Parse submodule data
  submodule_names=($(awk '{print $1}' <<< "${submodule_data}" ))
  submodule_paths=($(awk '{print $2}' <<< "${submodule_data}" ))

  # If there are any argument, filter out unmatched submodules
  if (( $# )); then
    local i
    local j
    local git_root_dir="$(git rev-parse --show-toplevel)"
    # Store array size, since the length changes in the loop
    local submodules=${#submodule_names[@]}
    local pattern

    # Loop through submodules
    for ((i=0; i<$submodules; i++)); do
      # loop through all arguments
      for j in "${@}"; do
        # Check to see if the pattern matches. The two slashes on the LHS are
        # to match the RHS /*/. /*/ allows additional pattern matching only for
        # full subdirectories names, and nothing else, since that is how
        # git-submodule--helper already works.
        if [[ ${submodule_paths[$i]}// == ${j}/*/ ]]; then
          continue 2
        fi
      done
      # Remove them if the continue 2 doesn't cause a skip
      unset submodule_names[$i]
      unset submodule_paths[$i]
    done

    if (( ${#submodule_names[@]} )); then # If not empty
      # Reset the arrays, so that they are contiguous
      submodule_names=("${submodule_names[@]}")
      submodule_paths=("${submodule_paths[@]}")
    fi
  fi
}

#****if* safe_git_submodule_update/_checkout_git_submodule
# NAME
#   _checkout_git_submodule - Helper function for safe_git_submodule_update
# INPUTS
#   $1 - Submodule name
#   $2 - Submodule path (relative)
#   $3 - Message to print out if submodule update failed
# OUTPUT
#   key - set variable key on failure
#***
function _checkout_git_submodule()
{
  popd > /dev/null

  if git -c submodule.${1}.update='!git merge --ff-only' submodule update "${2}"; then
    if [ -f "${2}/.gitmodules" ]; then
      pushd "${2}" &>/dev/null
      show_summary_message=0 safe_git_submodule_update
      popd &>/dev/null
    fi
  else
    read -n1 -r -p "${3} Any key to continue." key
    echo
  fi
}

#****f* just_git_functions/safe_git_submodule_update
# NAME
#   safe_git_submodule_update - Update git submodules in a smart way
# DESCRIPTION
#   git submodules are already confusing enough to work with. When a project
#   gets big and complicated, and add to that the potential of losing changes
#   that have already been committed, the default behavior of submodules is
#   enough to have anyone committed!
#
#   A git submodule update should update a submodule if and only if it is a
#   ff-only merge, and the submodule is clean (enough). Also, non-conflicting
#   unstaged changes are also ok too.
# BUGS
#   If the committer of the main repository changes submodules in a non-fast
#   forward way, this would confuse safe_git_submodule_update because that isn't
#   very smart.
#   Update: It will at least tell you which repositories are behind now.
# INPUTS
#   [$1..] - Specify submodule paths to update. None defaults to all
# PARAMETERS
#   $show_summary_message - For internal use. Disables error summary messages

#***
function safe_git_submodule_update()
{
  local i
  local show_summary_message=${show_summary_message-1}

  pushd "$(pwd)" > /dev/null
    local submodule_names
    local submodule_paths
    # Call "close enough" bash equivalent to git submodule--helper list/name
    submodule-helper-list ${@+"${@}"}
    for ((i=0; i<${#submodule_paths[@]}; i++)); do
      name="${submodule_names[$i]}"
      sm_path="${submodule_paths[$i]}"

      if ! git config submodule."$name".url; then
        if [ "$(git ls-tree HEAD:"$(dirname "${sm_path}")" "$(basename "${sm_path}")" | awk '{print $2}')" == "commit" ]; then
          echo "Uninitialized submodule $name...Initializing"
          git submodule init $sm_path
        else
          # There are cases where novices remove a submodule and forget to
          # remove it from the .gitmodules files. In this case, it will show up
          # in submodule-helper-list but shouldn't be checked out. Either it
          # will have no entry from ls-tree (empty), or it will not be a commit
          # (eg tree).
          echo "Skipping phantom submodule $name"
          continue
        fi
      fi
      if test -z "$(git config submodule."$name".url)" ||
      {
         ! test -d "$sm_path"/.git &&
         ! test -f "$sm_path"/.git
      }
      then
        if ! [ "$(git config -f .gitmodules submodule.${name}.update)" == "none" ]; then
          echo "Submodule $name is not checked out! Initializing and updating..."
          git submodule update --init "${sm_path}"
        fi
        continue
      fi
      pushd "${sm_path}" > /dev/null
        if ! git diff --no-ext-diff --quiet; then
          echo "Uncommited tracked files in ${sm_path}"
          _checkout_git_submodule ${name} "${sm_path}" \
            "You need to add or discard (checkout) changes and resolve any conflicts in the submodule: ${name}"
          continue
        fi
        if ! git diff --no-ext-diff --cached --quiet; then
          echo "Staged tracked files in ${sm_path}"
          read -n1 -r -p "You need to commit/reset files and resolve any conflicts in the submodule: ${name}" key
          popd > /dev/null
          continue
        fi
        if git ls-files --others --exclude-standard --directory --no-empty-directory --error-unmatch -- ':/*' >/dev/null 2>/dev/null; then
          echo "Untracked files in ${sm_path}"
          _checkout_git_submodule ${name} "${sm_path}" \
            "You need to resolve any conflicts in the submodule: ${name}."
          continue
        fi
        _checkout_git_submodule ${name} "${sm_path}" \
          "You need to resolve any conflicts in the submodule: ${name}."
    done
  popd > /dev/null

  if [ "${show_summary_message-0}" == "1" ]; then
    local IFS=$'\n'
    for i in $(git submodule status --recursive | \grep ^+ || :); do
      i="${i% *}"
      i="${i#* }"
      echo
      echo "******************************************************************"
      echo "Repository $i does not appear to be on the expected SHA. If you have changes that"
      echo "you want to track in the parent module run:"
      echo "  'git add $i' followed by 'git commit', or if you want to reset the"
      echo "submodule to the expected SHA run:"
      echo "  'git submodule update $i'"
      echo "However, ensure that any commits you may have made are tracked."
    done

    if [ "${key+set}" == "set" ]; then
      echo
      echo "*************************** WARNING ******************************"
      echo "Tried to safely update submodules, however something went wrong."
      echo "After resolving the problems, you can try updating the main repo"
      echo "again. If this is not working for you, you can fall back to"
      echo "  'git submodule update --init --recursive'"
      echo "However, ensure that any commits you may have made to submodules are tracked."
    fi
  fi
}

#****f* just_git_functions/git_defaultify
# NAME
#   git_defaultify - Git plugin for just

#***
function git_defaultify()
{
  arg=$1
  shift 1
  case $arg in
    git_submodule-update) # Safe git submodule update which is careful to not \
                          # remove commits by accident. Only updates submodules \
                          # by going forward in history.
      echo "Syncing submodules"
      git submodule sync --recursive --quiet
      safe_git_submodule_update ${@+"${@}"}
      extra_args+=$#
      ;;
    git_make-submodules-relative) # Reset the paths in git submodules to be \
                                  # relative paths rather than absolute paths. \
                                  # This is important for having portable \
                                  # repositories, which is important for \
                                  # mounting into a docker. Will reset git \
                                  # modules to the $(pwd) when you run this, \
                                  # so you should be in the main repo's base \
                                  # directory. Requires: realpath with \
                                  # --relative-to, python or perl.
      if realpath --relative-to=/ /tmp &>/dev/null; then
        code='realpath --relative-to=. ${submodule_path}'
      elif command -v python &>/dev/null; then
        code='python -c "import os.path;print(os.path.relpath('"'"'${submodule_path}'"'"', '"'"'.'"'"'))"'
      elif command -v perl &>/dev/null; then
        code='perl -e "use File::Spec; print File::Spec->abs2rel ('"'"'${submodule_path}'"'"', '"'"'.'"'"');"'
      else
        echo "You must have realpath with --relative-to, python or perl for this to work on your OS"
        exit 1
      fi

      git submodule foreach --recursive bash -c '
      if [ -f .git ]; then
        submodule_path=$(cut -d" " -f2- .git)
        echo "gitdir: $('"${code}"')" > .git
      fi'
      ;;
    *)
      return 1
      ;;
  esac
  return 0
}
