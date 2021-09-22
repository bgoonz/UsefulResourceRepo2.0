; sector 1
; descriptor 0xaa55
; 512 bytes (the size of a sector of a disk)
; c = None
; while c != 'q':
    ; read some char in to the c variable
    ; print(c)

read_char_then_print:
    ; Load AH with code for keyboard read 0x00
    mov ah, 0x00
    ; Call the BIOS for reading keyboard 0x16 ; blocking function
    int 0x16
    cmp al, 'q' ; if we press q then end the program
    je finished
    cmp al, 'a' ; if we press a print a capital G
    je presseda
    ; set tty mode 0x0e
    mov ah, 0x0e
    ; call Write Char BIOS interupt 0x10
    int 0x10
    jmp read_char_then_print

    presseda:
        mov ah, 0x0e
        mov al, 'G'
        int 0x10
        jmp read_char_then_print

    finished:

jmp $ ; infinite loop

times 510 - ($-$$) db 0
dw 0xaa55 ; 512 byte mark (end of sector 1)