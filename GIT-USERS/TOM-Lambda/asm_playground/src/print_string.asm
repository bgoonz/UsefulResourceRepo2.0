[org 0x7c00]

mov bx, message1
call println
call print_new_line
call print_new_line
call print_new_line
call print_new_line
call print_new_line
call print_new_line
mov bx, message2
call println

jmp $ ; infinite loop

; print a string with new line
println:
    ; set BIOS Function tty
    mov ah, 0x0e
    print_a_char:
    ; move a char in to al
    mov al, [bx]
    ; loop the printing
    cmp al, 0
    je end_print
    ; call int 0x10
    int 0x10

    add bx, 1
    jmp print_a_char


    end_print:
        call print_new_line
        ret

; function to print a new line
print_new_line:
    mov al, 0x0a
    int 0x10
    mov al, 0x0d
    int 0x10
    ret


message1: db "This is message 1", 0
message2: db "This is message 2", 0

times 510 - ($-$$) db 0
dw 0xaa55 ; 512 byte mark (end of sector 1)