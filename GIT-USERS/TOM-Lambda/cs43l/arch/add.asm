mov ax, 10
mov bx, 20
call add_bx_to_ax
mov bx, 123


add_bx_to_ax:
    add ax, bx
    ret

; call 1> stores the return address (PC + 2) 2> set the pc = the addr of the label
; RET 1> set the pc to the stored return addr
