autocmd BufNewFile,BufRead *.tsx set filetype=typescript.tsx

call plug#begin(expand('~/.config/nvim/plugged'))

"" colorscheme
" a bazillion colorschemes
Plug 'flazz/vim-colorschemes'
"" shows indent lines
Plug 'Yggdroot/indentLine'
"" comment out lines with gcc or with gc<motion>
Plug 'tpope/vim-commentary'
"" netrw (:Ex) on steroids, alternative to nerdtree
Plug 'tpope/vim-vinegar'
"" fzf integration, fuzzy search files, buffers, etc
Plug 'junegunn/fzf', { 'dir': '~/.fzf', 'do': './install --all' }
Plug 'junegunn/fzf.vim'
"" Prettier (formatting js/ts code)
Plug 'prettier/vim-prettier', {
  \ 'do': 'yarn install',
  \ 'branch': 'release/0.x'
  \ }

" typescript/javascript support
"" better JS syntax highlighting than the built in
" Plug 'pangloss/vim-javascript'
"" TS syntax
Plug 'leafgarland/typescript-vim'
"" JS and JSX syntax
Plug 'maxmellon/vim-jsx-pretty'
" syntax highlight css in template strings (ie styled-components)
Plug 'styled-components/vim-styled-components', { 'branch': 'main' }
" intellisense for typescript, js, html, etc
Plug 'neoclide/coc.nvim', {'branch': 'release'}


"" ashish
Plug 'mhinz/vim-startify'
Plug 'vim-airline/vim-airline'
Plug 'vim-airline/vim-airline-themes'
Plug 'phanviet/vim-monokai-pro'
Plug 'tpope/vim-fugitive'
let todoist = { 'key': 'b3782a3e4c8e2ec5e03d00a5f678a0dd683d6e00'}
Plug 'romgrk/todoist.vim', { 'do': ':TodoistInstall' }
" " switch between .h <--> .cpp
" Plug 'vim-scripts/a.vim'
" " format C code (and many others if wanted)
" Plug 'sbdchd/neoformat'

call plug#end()

"" ---------------------------------------
"" GENERAL SETUP
"" ---------------------------------------

"" there is a ton of colorschemes to choose from
"" https://github.com/flazz/vim-colorschemes/tree/master/colors
colorscheme monokai_pro 

if has("gui_running")
    set guioptions-=m  "remove menu bar
    set guioptions-=T  "remove toolbar
    set guioptions-=r  "remove right-hand scroll bar
    set guioptions-=L  "remove left-hand scroll bar
endif

set signcolumn=yes                  " always show the "gutter" on the left

let mapleader =','
set t_Co=256
set background=dark

set nocompatible                    " don't try to stay vi compatible
set showmatch                       " show matching brackets
set hidden                          " buffers becomes hidden when it is abandoned
set mouse=a                         " enable full mouse support
set ignorecase                      " ignore case when searching
set smartcase                       " but do consider case if search contains a capital letter
set incsearch                       " highlight search results as typing them out
set cursorline                      " highlight the current line
set number                          " show row numbers

" indenting
set autoindent                      " when press return, the new line will be indented to the same as previous line
set smartindent                     " attempt to indent based on the file type/code
set expandtab                       " turn tabs into spaces
set tabstop=2                       " set tab width to be 2 spaces
set shiftwidth=2                    " number of spaces for each step of auto indent
set backspace=indent,eol,start      " allow backspacing over autoindent

" backups
set nobackup                        " don't backup
set noswapfile                      " disable swap files

" statusline
set laststatus=2                    " always show the statusline
set statusline=%f                   " statusline has path to current file
set statusline+=%=                  " switch to right side for remaining items
set statusline+=\ [%l/%L]           " current line number / total lines
set statusline+=[%c]                " current column

" change color of statusline when entering and exiting insert mode
autocmd InsertEnter * highlight StatusLine ctermfg=red
autocmd InsertLeave * highlight StatusLine ctermfg=grey

" sane bracket highlighting/underlining
highlight MatchParen cterm=underline ctermbg=none ctermfg=none
" set background to transparent
highlight Normal ctermfg=grey ctermbg=none

" finding files with vanilla vim
set path+=** " ** means "from current directory recursively down
set wildmenu " pretty sure wildmenu is default in neovim anyway

" enable globstar in vim's forked shells, so patters like **/*.js work
set shell+=\ -O\ globstar

"" ------------------------------
"" FZF.VIM
"" ------------------------------
let $FZF_DEFAULT_COMMAND = 'ag -g ""' " use ag to feed files into fzf, and respect .gitignore
nnoremap <C-p> :Files<CR>
nnoremap <C-o> :Buffers<CR>
nnoremap <C-f> :Rg 
"" -----------------------------
"" INDENTLINE
"" -----------------------------
let g:indentLine_fileTypeExclude=['json']

"" -----------------------------
"" VIM-PRETIER
"" -----------------------------
let g:prettier#autoformat = 0
autocmd BufWritePre *.js,*.jsx,*.css,*.ts,*.tsx PrettierAsync

"" -----------------------------
"" COC
"" -----------------------------
nmap <space>e :CocCommand explorer<CR>
let g:coc_global_extensions = ['coc-tsserver']
" use ctrl-space to show intellisense in edit mode
inoremap <silent><expr> <c-space> coc#refresh()

" go to various types of definitions
nmap <silent> gd <Plug>(coc-definition)
nmap <silent> gy <Plug>(coc-type-definition)
nmap <silent> gi <Plug>(coc-implementation)
nmap <silent> gr <Plug>(coc-references)

" rename symbol
nmap <leader>rn <Plug>(coc-rename)

" Use K to show documentation in preview window
nnoremap <silent> K :call <SID>show_documentation()<CR>

function! s:show_documentation()
  if (index(['vim','help'], &filetype) >= 0)
    execute 'h '.expand('<cword>')
  else
    call CocAction('doHover')
  endif
endfunction

"" -----------------------------
"" neoformat
"" -----------------------------
set mouse=a
source $VIMRUNTIME/mswin.vim
augroup fmt
    autocmd!
    autocmd BufWritePre *.c,*.h undojoin | Neoformat
augroup END

"" -----------------------------
"" nvim-typescript
"" -----------------------------
let g:nvim_typescript#signature_complete = 1 " show function signatures in echo area
let g:nvim_typescript#type_info_on_hold = 1  " show type info in echo area for current symbol under cursor

"" -----------------------------
"" tsuquyomi
"" -----------------------------
" let g:tsuquyomi_javascript_support = 1


"" Ashish

" navigate chunks of current buffer
nmap [g <Plug>(coc-git-prevchunk)
nmap ]g <Plug>(coc-git-nextchunk)
" show chunk diff at current position
nmap gs <Plug>(coc-git-chunkinfo)
" show commit contains current position
nmap gc <Plug>(coc-git-commit)
" create text object for git chunks
omap ig <Plug>(coc-git-chunk-inner)
xmap ig <Plug>(coc-git-chunk-inner)
omap ag <Plug>(coc-git-chunk-outer)
xmap ag <Plug>(coc-git-chunk-outer)

" Use alt + hjkl to resize windows
nnoremap <M-j>    :resize -2<CR>
nnoremap <M-k>    :resize +2<CR>
nnoremap <M-h>    :vertical resize -2<CR>
nnoremap <M-l>    :vertical resize +2<CR>

" enable tabline
let g:airline#extensions#tabline#enabled = 1
let g:airline#extensions#tabline#left_sep = ''
let g:airline#extensions#tabline#left_alt_sep = ''
let g:airline#extensions#tabline#right_sep = ''
let g:airline#extensions#tabline#right_alt_sep = ''

" enable powerline fonts
let g:airline_powerline_fonts = 1
let g:airline_left_sep = ''
let g:airline_right_sep = ''

set showtabline=2

" Switch to your current theme
let g:lightline = {
      \ 'colorscheme': 'monokai_pro',
      \ }

" We don't need to see things like -- INSERT -- anymore
set noshowmode

nnoremap <space>/ :Commentary<CR>
vnoremap <space>/ :Commentary<CR>
map <leader>n <Esc><Esc>0qq
map <leader>m q:'<,'>-1normal!@q<CR><Down>

let g:startify_session_dir = '~/.config/nvim/session'
let g:startify_lists = [
          \ { 'type': 'files',     'header': ['   Files']            },
          \ { 'type': 'dir',       'header': ['   Current Directory '. getcwd()] },
          \ { 'type': 'sessions',  'header': ['   Sessions']       },
          \ { 'type': 'bookmarks', 'header': ['   Bookmarks']      },
          \ ]
let g:startify_bookmarks = [
            \ { 'i': '~\AppData\Local\nvim\init.vim' },
            \ { 'z': '~\.zshrc' },
            \ '~\Perforce',
            \ '~\Code',
            \ ]
let g:startify_session_autoload = 1
let g:startify_session_persistence = 1
let g:startify_fortune_use_unicode = 1
let g:startify_custom_header = [
  \ '     ___           __     _        __       ____          __         __  ',
  \ '    /   |   _____ / /_   (_)_____ / /_     / __ \ ____ _ / /_ ___   / /  ',
  \ '   / /| |  / ___// __ \ / // ___// __ \   / /_/ // __ `// __// _ \ / /   ',
  \ '  / ___ | (__  )/ / / // /(__  )/ / / /  / ____// /_/ // /_ /  __// /    ',
  \ ' /_/  |_|/____//_/ /_//_//____//_/ /_/  /_/     \__,_/ \__/ \___//_/     ',
  \ '                                                                         ',
  \]
